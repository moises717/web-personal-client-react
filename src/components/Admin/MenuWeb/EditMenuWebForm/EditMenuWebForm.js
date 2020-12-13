import React, { useState, useEffect } from "react";

import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";

import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/Auth";

import "./EditMenuWebForm.scss";

const EditMenuWebForm = (props) => {
	const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
	const [menuWebData, setMenuWebData] = useState(menu);

	useEffect(() => {
		setMenuWebData(menu);
	}, [menu]);

	const editMenu = (e) => {
		e.preventDefault();

		if (!menuWebData.title || !menuWebData.url) {
			notification["error"]({
				message: "Todos los campos son Obligatorios!",
			});
		} else {
			const token = getAccessTokenApi();

			updateMenuApi(token, menuWebData._id, menuWebData)
				.then((res) => {
					notification["success"]({
						message: res,
					});

					setIsVisibleModal(false);
					setReloadMenuWeb(true);
				})
				.catch(() => {
					notification["error"]({
						message: "Error del servidor, Intentelo mas trade",
					});
				});
		}
	};

	return (
		<div className="edit-menu-web-form">
			<EditForm
				menuWebData={menuWebData}
				setMenuWebData={setMenuWebData}
				editMenu={editMenu}
			/>
		</div>
	);
};

function EditForm(props) {
	const { menuWebData, setMenuWebData, editMenu } = props;

	return (
		<Form className="form-edit" onSubmitCapture={editMenu}>
			<Form.Item>
				<Input
					prefix={<FontSizeOutlined />}
					placeholder="Titulo"
					value={menuWebData.title}
					onChange={(e) =>
						setMenuWebData({ ...menuWebData, title: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<LinkOutlined />}
					placeholder="Url"
					value={menuWebData.url}
					onChange={(e) =>
						setMenuWebData({ ...menuWebData, url: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Guardar
				</Button>
			</Form.Item>
		</Form>
	);
}

export default EditMenuWebForm;
