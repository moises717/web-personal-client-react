import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
	emailValidation,
	minLengthValidation,
} from "../../../utils/formValidations";

import "./RegisterForm.scss";
import { signUpApi } from "../../../api/user";

const RegisterForm = () => {
	const [input, setInput] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		privacyPolicy: false,
	});

	const [formValid, setFormValid] = useState({
		email: false,
		password: false,
		repeatPassword: false,
		privacyPolicy: false,
	});

	const changeForm = (e) => {
		if (e.target.name === "privacyPolicy") {
			setInput({
				...input,
				[e.target.name]: e.target.checked,
			});
		} else {
			setInput({
				...input,
				[e.target.name]: e.target.value,
			});
		}
	};

	const inputValidation = (e) => {
		const { type, name } = e.target;

		if (type === "email") {
			setFormValid({
				...formValid,
				[name]: emailValidation(e.target),
			});
		}

		if (type === "password") {
			setFormValid({
				...formValid,
				[name]: minLengthValidation(e.target, 6),
			});
		}
		if (type === "checkbox") {
			setFormValid({
				...formValid,
				[name]: e.target.checked,
			});
		}
	};

	const Register = async (e) => {
		e.preventDefault();

		const emailValue = input.email;
		const passwordValue = input.password;
		const repeatPasswordValue = input.repeatPassword;
		const privacyPolicyValue = input.privacyPolicy;

		if (
			!emailValue ||
			!passwordValue ||
			!repeatPasswordValue ||
			!privacyPolicyValue
		) {
			notification["error"]({
				message: "Todos los cambios son obligatorio!",
			});
		} else {
			if (passwordValue !== repeatPasswordValue) {
				notification["error"]({
					message: "Las contraseñas tienen que ser iguales!",
				});
			} else {
				const result = await signUpApi(input);
				if (!result.ok) {
					notification["error"]({
						message: result.message,
					});
				} else {
					notification["success"]({
						message: result.message,
					});
					resetForm();
				}
			}
		}
	};

	const resetForm = () => {
		const inputs = document.getElementsByTagName("input");

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].classList.remove("success");
			inputs[i].classList.remove("error");
		}
		setInput({
			email: "",
			password: "",
			repeatPassword: "",
			privacyPolicy: false,
		});
		setFormValid({
			email: false,
			password: false,
			repeatPassword: false,
			privacyPolicy: false,
		});
	};

	return (
		<Form
			className="register-form"
			onSubmitCapture={Register}
			onChange={changeForm}>
			<Form.Item>
				<Input
					prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
					type="email"
					name="email"
					placeholder="Correo electronico"
					className="register-form__input"
					value={input.email}
					onChange={inputValidation}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
					type="password"
					name="password"
					placeholder="Contraseña"
					className="register-form__input"
					value={input.password}
					onChange={inputValidation}
				/>
			</Form.Item>

			<Form.Item>
				<Input
					prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
					type="password"
					name="repeatPassword"
					placeholder="Repita contraseña"
					className="register-form__input"
					value={input.repeatPassword}
					onChange={inputValidation}
				/>
			</Form.Item>
			<Form.Item>
				<Checkbox
					name="privacyPolicy"
					checked={input.privacyPolicy}
					onChange={inputValidation}>
					He leido y acepto las politicas de privacidad
				</Checkbox>
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit" className="register-form__button">
					Crear cuenta
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegisterForm;
