import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeNewsLetter } from "../../../api/NewsLetter";

import "./NewsLetter.scss";

export default function NewsLetter() {
	const [email, setEmail] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();

		// eslint-disable-next-line no-useless-escape
		const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		const resultValidation = emailValid.test(email);

		if (resultValidation) {
			suscribeNewsLetter(email)
				.then((res) => {
					if (res.code !== 200) {
						notification["warning"]({
							message: res.message,
						});
					} else {
						notification["success"]({
							message: res.message,
						});

						setEmail("");
					}
				})
				.catch((err) => {
					notification["error"]({
						message: err.message,
					});
				});
		} else {
			notification["error"]({
				message: "El email es invalido!",
			});
		}
	};

	return (
		<div className="newsletter">
			<h3>Newsletter</h3>
			<Form onSubmitCapture={onSubmit}>
				<Form.Item>
					<Input
						prefix={<UserOutlined />}
						style={{ color: "rgba(0,0,0,0.25)" }}
						placeholder="Correo electronico"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button">
						¡Me suscribo!
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
