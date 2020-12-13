import React, { useState, useEffect } from "react";
import {
	Switch,
	List,
	Avatar,
	Button,
	notification,
	Modal as modalDel,
} from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	StopOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/png/no-avatar.png";
import Modal from "../../../../components/Modal/Modal";
import EditUserForm from "../../../../components/Admin/EditUserForm/EditUserForm";
import {
	getAvatarApi,
	activateUserApi,
	deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/Auth";
import "./ListUsers.scss";
import AddUserForm from "../addUserForm/AddUserForm";

const { confirm } = modalDel;

const ListUsers = (props) => {
	const { usersActives, usersInactives, setReloadUsers } = props;
	const [viewUsersActive, setViewUsersActive] = useState(true);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);

	const addUserModal = () => {
		setIsVisibleModal(true);
		setModalTitle("Crear nuevo usuario");
		setModalContent(
			<AddUserForm
				setIsVisibleModal={setIsVisibleModal}
				setReloadUsers={setReloadUsers}
			/>
		);
	};

	return (
		<div className="List-users">
			<div className="List-users__header">
				<div className="List-users__header-switch">
					<Switch
						defaultChecked
						onChange={() => setViewUsersActive(!viewUsersActive)}
					/>
					<span>
						{viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
					</span>
				</div>
				<Button type="primary" onClick={addUserModal}>
					Nuevo usuario
				</Button>
			</div>

			{viewUsersActive ? (
				<UsersActives
					usersActives={usersActives}
					setIsVisibleModal={setIsVisibleModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
					setReloadUsers={setReloadUsers}
				/>
			) : (
				<UsersInactives
					setReloadUsers={setReloadUsers}
					usersInactives={usersInactives}
				/>
			)}
			<Modal
				title={modalTitle}
				isVisible={isVisibleModal}
				setIsVisible={setIsVisibleModal}>
				{modalContent}
			</Modal>
		</div>
	);
};

function UsersActives(props) {
	const {
		usersActives,
		setIsVisibleModal,
		setModalTitle,
		setModalContent,
		setReloadUsers,
	} = props;

	const editUser = (user) => {
		setIsVisibleModal(true);
		setModalTitle(
			`Editar ${user.name ? user.name : "..."} ${
				user.lastname ? user.name : "..."
			}`
		);
		setModalContent(
			<EditUserForm
				setReloadUsers={setReloadUsers}
				setIsVisibleModal={setIsVisibleModal}
				user={user}
			/>
		);
	};

	return (
		<List
			className="users-active"
			itemLayout="horizontal"
			dataSource={usersActives}
			renderItem={(user) => (
				<UserActive
					setReloadUsers={setReloadUsers}
					user={user}
					editUser={editUser}
				/>
			)}
		/>
	);
}

function UserActive(props) {
	const { user, editUser, setReloadUsers } = props;
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		if (user.avatar) {
			getAvatarApi(user.avatar).then((res) => {
				setAvatar(res);
			});
		} else {
			setAvatar(null);
		}
	}, [user]);

	const desactivateUser = () => {
		const accessToken = getAccessTokenApi();

		activateUserApi(accessToken, user._id, false)
			.then((res) => {
				notification["success"]({
					message: res,
				});
				setReloadUsers(true);
			})
			.catch((err) => {
				notification["error"]({
					message: err,
				});
			});
	};

	const showDeleteUser = () => {
		const accesToken = getAccessTokenApi();

		confirm({
			title: "Eliminando usuario",
			content: `Estas seguro que quieres eliminar a ${user.email}`,
			okText: "Eliminar",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				deleteUserApi(accesToken, user._id)
					.then((res) => {
						notification["success"]({
							message: res,
						});
						setReloadUsers(true);
					})
					.catch((err) => {
						notification["error"]({
							message: err,
						});
					});
			},
		});
	};

	return (
		<List.Item
			actions={[
				<Button type="primary" onClick={() => editUser(user)}>
					<EditOutlined />
				</Button>,
				<Button type="danger" onClick={desactivateUser}>
					<StopOutlined />
				</Button>,
				<Button type="danger" onClick={showDeleteUser}>
					<DeleteOutlined />
				</Button>,
			]}>
			<List.Item.Meta
				avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
				title={`
            ${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}
            `}
				description={user.email}
			/>
		</List.Item>
	);
}

function UsersInactives(props) {
	const { usersInactives, setReloadUsers } = props;

	return (
		<List
			className="users-active"
			itemLayout="horizontal"
			dataSource={usersInactives}
			renderItem={(user) => (
				<UserInactive setReloadUsers={setReloadUsers} user={user} />
			)}
		/>
	);
}

function UserInactive(props) {
	const { user, setReloadUsers } = props;
	const [avatar, setAvatar] = useState(null);

	const activateUser = () => {
		const accessToken = getAccessTokenApi();

		activateUserApi(accessToken, user._id, true)
			.then((res) => {
				notification["success"]({
					message: res,
				});
				setReloadUsers(true);
			})
			.catch((err) => {
				notification["error"]({
					message: err,
				});
			});
	};

	const showDeleteUser = () => {
		const accesToken = getAccessTokenApi();

		confirm({
			title: "Eliminando usuario",
			content: `Estas seguro que quieres eliminar a ${user.email}`,
			okText: "Eliminar",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				deleteUserApi(accesToken, user._id)
					.then((res) => {
						notification["success"]({
							message: res,
						});
						setReloadUsers(true);
					})
					.catch((err) => {
						notification["error"]({
							message: err,
						});
					});
			},
		});
	};

	useEffect(() => {
		if (user.avatar) {
			getAvatarApi(user.avatar).then((res) => {
				setAvatar(res);
			});
		} else {
			setAvatar(null);
		}
	}, [user]);

	return (
		<List.Item
			actions={[
				<Button type="primary" onClick={activateUser}>
					<CheckOutlined />
				</Button>,
				<Button type="danger" onClick={showDeleteUser}>
					<DeleteOutlined />
				</Button>,
			]}>
			<List.Item.Meta
				avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
				title={`
${user.name ? user.name : "..."}
${user.lastname ? user.lastname : "..."}
`}
				description={user.email}
			/>
		</List.Item>
	);
}

export default ListUsers;
