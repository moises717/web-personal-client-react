import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Modal from "../../../Modal/Modal";

import DragSortableList from "react-drag-sortable";
import {
	updateMenuApi,
	activateMenuApi,
	deleteMenuApi,
} from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/Auth";
import AddMenuWebForm from "../AddMenuWebForm/AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm/EditMenuWebForm";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

const MenuWebList = (props) => {
	const { menu, setReloadMenu } = props;
	const [listItem, setListItem] = useState([]);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);

	useEffect(() => {
		const ListItemArray = [];

		menu.forEach((item) => {
			ListItemArray.push({
				content: (
					<MenuItem
						activateMenu={activateMenu}
						item={item}
						editMenuWebFormModal={editMenuWebFormModal}
						deleteMenu={deleteMenu}
					/>
				),
			});
		});
		setListItem(ListItemArray);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menu]);

	const activateMenu = (menu, status) => {
		const token = getAccessTokenApi();

		activateMenuApi(token, menu._id, status).then((res) => {
			notification["success"]({
				message: res,
			});
		});
	};

	const onSort = (sortedList, dropEvent) => {
		const token = getAccessTokenApi();

		sortedList.forEach((item) => {
			const { _id } = item.content.props.item;

			const order = item.rank;

			updateMenuApi(token, _id, { order });
		});
	};

	const addMenuWebModal = () => {
		setIsVisibleModal(true);
		setModalTitle("Crear nuevo menu");
		setModalContent(
			<AddMenuWebForm
				setIsVisibleModal={setIsVisibleModal}
				setReloadMenu={setReloadMenu}
				menu={menu}
			/>
		);
	};

	const deleteMenu = (menu) => {
		const token = getAccessTokenApi();

		confirm({
			title: "Eliminando menu",
			content: `Estas seguro que quieres eliminar el menu: ${menu.title}`,
			okText: "Eliminar ",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				deleteMenuApi(token, menu._id)
					.then((res) => {
						notification["success"]({
							message: res,
						});

						setReloadMenu(true);
					})
					.catch((err) => {
						notification["error"]({
							message: "Error del servidor, intentelo mas tarde!",
						});
					});
			},
		});
	};

	const editMenuWebFormModal = (menu) => {
		console.log("holis");
		setIsVisibleModal(true);
		setModalTitle(`Editando Menu: ${menu.title}`);
		setModalContent(
			<EditMenuWebForm
				setIsVisibleModal={setIsVisibleModal}
				setReloadMenuWeb={setReloadMenu}
				menu={menu}
			/>
		);
	};

	return (
		<div className="menu-web-list">
			<div className="menu-web-list__header">
				<Button type="primary" onClick={addMenuWebModal}>
					CREAR
				</Button>
			</div>

			<div className="menu-web-list__items">
				<DragSortableList items={listItem} onSort={onSort} type="vertical" />
			</div>

			<Modal
				title={modalTitle}
				isVisible={isVisibleModal}
				setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</div>
	);
};

function MenuItem(props) {
	const { item, activateMenu, editMenuWebFormModal, deleteMenu } = props;

	return (
		<List.Item
			actions={[
				<Switch
					defaultChecked={item.active}
					onChange={(e) => activateMenu(item, e)}
				/>,
				<Button type="primary" onClick={() => editMenuWebFormModal(item)}>
					{<EditOutlined />}
				</Button>,
				<Button type="darger" onClick={() => deleteMenu(item)}>
					{<DeleteOutlined />}
				</Button>,
			]}>
			<List.Item.Meta title={item.title} description={item.url} />
		</List.Item>
	);
}

export default MenuWebList;
