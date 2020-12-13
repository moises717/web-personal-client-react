import React from "react";
import { Redirect } from "react-router-dom";
import { Layout, Tabs } from "antd";
import Logo from "../../../assets/png/logo-white.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import { getAccessTokenApi } from "../../../api/Auth";

import "./Signin.scss";

export default function Signin() {
	const { Content } = Layout;
	const { TabPane } = Tabs;

	if (getAccessTokenApi()) {
		return <Redirect to="/admin" />;
	}

	return (
		<Layout className="sign-in">
			<Content className="sign-in__content">
				<h1 className="sign-in__content-logo">
					<img src={Logo} alt="Moises barillas" />
				</h1>
				<div className="sign-in__content-tabs">
					<Tabs type="card">
						<TabPane tab={<span>Entrar</span>} key="1">
							<LoginForm />
						</TabPane>
						<TabPane tab={<span>Nuevo usuario</span>} key="2">
							<RegisterForm />
						</TabPane>
					</Tabs>
				</div>
			</Content>
		</Layout>
	);
}
