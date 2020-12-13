import React, { useState } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/Auth";
import "./AddMenuWebForm.scss";

const AddMenuWebForm = (props) => {
	const { setIsVisibleModal, setReloadMenu } = props;

	const [menuWebData, setMenuWebData] = useState({});

	const addMenu = (e) => {
		e.preventDefault();
		let finalData = {
			title: menuWebData.title,
			url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
		};

		if (!finalData.title || !finalData.url || !menuWebData.url) {
			notification["error"]({
				message: "Todos los datos son requeridos!",
			});
		} else {
			const token = getAccessTokenApi();
			finalData.active = false;

			finalData.order = 1000;

			addMenuApi(token, finalData)
				.then((res) => {
					notification["success"]({
						message: res,
					});

					setIsVisibleModal(false);
					setReloadMenu(true);
					setMenuWebData({});
					finalData = {};
				})
				.catch((err) => {
					notification["error"]({
						message: "Error del servidor",
					});
				});
		}
	};

	return (
		<div className="add-menu-web-form">
			<AddForm
				menuWebData={menuWebData}
				setMenuWebData={setMenuWebData}
				addMenu={addMenu}
			/>
		</div>
	);
};

function AddForm(props) {
	const { menuWebData, setMenuWebData, addMenu } = props;
	const { Option } = Select;

	const selectBefore = (
		<Select
			defaultValue="http://"
			style={{ width: "90px" }}
			onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}>
			<Option value="http://">http://</Option>
			<Option value="https://">https://</Option>
		</Select>
	);

	return (
		<Form className="form-add" onSubmitCapture={addMenu}>
			<Form.Item>
				<Input
					prefix={<FontSizeOutlined />}
					placeholder="Titulo del menu"
					value={menuWebData.title}
					onChange={(e) =>
						setMenuWebData({ ...menuWebData, title: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					addonBefore={selectBefore}
					placeholder="URL"
					value={menuWebData.url}
					onChange={(e) =>
						setMenuWebData({ ...menuWebData, url: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Crear menu
				</Button>
			</Form.Item>
		</Form>
	);
}

export default AddMenuWebForm;
