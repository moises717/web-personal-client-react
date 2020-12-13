import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/Auth";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./AddUserForm.scss";

const AddUserForm = (props) => {
	const { setIsVisibleModal, setReloadUsers } = props;
	const [userData, setUserData] = useState({});

	const addUser = (e) => {
		e.preventDefault();
		console.log(userData);
		if (
			!userData.name ||
			!userData.lastname ||
			!userData.role ||
			!userData.email ||
			!userData.password ||
			!userData.repeatPassword
		) {
			notification["error"]({
				message: "Todos los campos son obligatorios",
			});
		} else if (userData.password !== userData.repeatPassword) {
			notification["error"]({
				message: "Las contraseñas tienen que ser iguales",
			});
		} else {
			const Token = getAccessTokenApi();

			signUpAdminApi(Token, userData)
				.then((res) => {
					notification["success"]({
						message: res,
					});
					setIsVisibleModal(false);
					setReloadUsers(true);
					setUserData({});
				})
				.catch((err) => {
					notification["error"]({
						message: err,
					});
				});
		}
	};

	return (
		<div className="add-user-form">
			<AddForm
				userData={userData}
				setUserData={setUserData}
				addUser={addUser}
			/>
		</div>
	);
};

function AddForm(props) {
	const { userData, setUserData, addUser } = props;

	const { Option } = Select;

	return (
		<Form className="form-add" onSubmitCapture={addUser}>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Nombre"
							value={userData.name}
							onChange={(e) =>
								setUserData({ ...userData, name: e.target.value })
							}></Input>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<UserOutlined />}
							placeholder="Apellidos"
							value={userData.lastname}
							onChange={(e) =>
								setUserData({ ...userData, lastname: e.target.value })
							}></Input>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<MailOutlined />}
							placeholder="Correo electronico"
							value={userData.email}
							onChange={(e) =>
								setUserData({ ...userData, email: e.target.value })
							}></Input>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Select
							placeholder="Selecciona un rol"
							onChange={(e) => setUserData({ ...userData, role: e })}
							value={userData.role}>
							<Option value="admin">Administrador</Option>
							<Option value="editor">Editor</Option>
							<Option value="reviwer">Revisor</Option>
						</Select>{" "}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<LockOutlined />}
							placeholder="Contraseña"
							value={userData.password}
							onChange={(e) =>
								setUserData({ ...userData, password: e.target.value })
							}
							type="password"></Input>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item>
						<Input
							prefix={<LockOutlined />}
							placeholder="Repetir contraseña"
							value={userData.repeatPassword}
							onChange={(e) =>
								setUserData({ ...userData, repeatPassword: e.target.value })
							}
							type="password"></Input>
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="btn-submit">
					Crear usuario
				</Button>
			</Form.Item>
		</Form>
	);
}

export default AddUserForm;
