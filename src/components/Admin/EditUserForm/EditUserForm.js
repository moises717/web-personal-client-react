import React, { useState, useEffect, useCallback } from "react";
import {
	Avatar,
	Form,
	Input,
	Select,
	Button,
	Row,
	Col,
	notification,
} from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../assets/png/monkey-avatar.png";

import {
	getAvatarApi,
	uploadAvatarApi,
	updateUserApi,
} from "../../../api/user";

import { getAccessTokenApi } from "../../../api/Auth";

import "./EditUserForm.scss";
const EditUserForm = (props) => {
	const { user, setIsVisibleModal, setReloadUsers } = props;
	const [avatar, setAvatar] = useState(null);
	const [userData, setuserData] = useState({
		name: user.name,
		lastname: user.lastname,
		email: user.email,
		role: user.role,
		avatar: user.avatar,
	});

	useEffect(() => {
		if (user.avatar) {
			getAvatarApi(user.avatar).then((res) => {
				setAvatar(res);
			});
		} else {
			setAvatar(null);
		}
	}, [user.avatar]);

	useEffect(() => {
		setuserData({
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			role: user.role,
			avatar: user.avatar,
		});
	}, [user]);

	useEffect(() => {
		if (avatar) {
			setuserData({ ...userData, avatar: avatar.file });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [avatar]);

	const updateUser = (e) => {
		e.preventDefault();
		const token = getAccessTokenApi();
		let userUpdate = userData;

		if (userUpdate.password || userUpdate.repeatPassword) {
			if (userUpdate.password !== userData.repeatPassword) {
				notification["error"]({
					message: "Las contraseñas tienen que ser iguales!",
				});
				return;
			} else {
				delete userUpdate.repeatPassword;
			}
		}

		if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
			notification["error"]({
				message: "Nombre, apellido e email son obligatorios",
			});
		}

		if (typeof userData.avatar === "object") {
			uploadAvatarApi(token, userUpdate.avatar, user._id).then((res) => {
				userUpdate.avatar = res.avatarName;
				updateUserApi(token, userUpdate, user._id).then((res) => {
					notification["success"]({
						message: res.message,
					});
					setIsVisibleModal(false);
					setReloadUsers(true);
				});
			});
		} else {
			updateUserApi(token, userUpdate, user._id).then((result) => {
				notification["success"]({
					message: result.message,
				});
				setIsVisibleModal(false);
				setReloadUsers(true);
				setuserData({
					password: "",
					repeatPassword: "",
				});
			});
		}
	};

	return (
		<div className="edit-user-form">
			<UploadAvatar avatar={avatar} setAvatar={setAvatar} />
			<EditForm
				userData={userData}
				setUserdata={setuserData}
				updateUser={updateUser}
			/>
		</div>
	);
};

function UploadAvatar(props) {
	const { avatar, setAvatar } = props;

	const [avatarUrl, setAvatarUrl] = useState(null);

	useEffect(() => {
		if (avatar) {
			if (avatar.preview) {
				setAvatarUrl(avatar.preview);
			} else {
				setAvatarUrl(null);
			}
		}
	}, [avatar]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			setAvatar({ file, preview: URL.createObjectURL(file) });
		},
		[setAvatar]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: "image/jpeg, image/png",
		noKeyboard: true,
		onDrop,
	});

	return (
		<div className="upload-avatar" {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Avatar size={150} src={NoAvatar} />
			) : (
				<Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
			)}
		</div>
	);
}

function EditForm(props) {
	const { userData, setUserdata, updateUser } = props;
	const { Option } = Select;
	return (
		<Form className="form-edit" onSubmitCapture={updateUser}>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Nombre"
							value={userData.name}
							onChange={(e) =>
								setUserdata({ ...userData, name: e.target.value })
							}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Apellidos"
							value={userData.lastname}
							onChange={(e) =>
								setUserdata({ ...userData, lastname: e.target.value })
							}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<MailOutlined />}
							placeholder="Correo Electronico"
							value={userData.email}
							onChange={(e) =>
								setUserdata({ ...userData, email: e.target.value })
							}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Select
							placeholder="Selecciona un rol"
							onChange={(e) => setUserdata({ ...userData, role: e })}
							defaultValue={userData.role}>
							<Option value="admin">Administrador</Option>
							<Option value="editor">Editor</Option>
							<Option value="reviewer">Revisor</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							type="password"
							prefix={<LockOutlined />}
							placeholder="Contraseña"
							onChange={(e) =>
								setUserdata({ ...userData, password: e.target.value })
							}
							value={userData.password}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							type="password"
							prefix={<LockOutlined />}
							placeholder="Repetir Contraseña"
							onChange={(e) =>
								setUserdata({ ...userData, repeatPassword: e.target.value })
							}
							value={userData.repeatPassword}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button htmlType="submit" type="primary" className="btn-submit">
					Actualizar Usuario
				</Button>
			</Form.Item>
		</Form>
	);
}

export default EditUserForm;
