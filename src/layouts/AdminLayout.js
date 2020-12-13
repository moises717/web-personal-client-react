import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";

import MenuTop from "../components/Admin/MenuTop/MenuTop";
import MenuSider from "../components/Admin/MenuSider/MenuSider";
import AdminSignin from "../pages/Admin/Signin/Signin";

import "./AdminLayout.scss";

const AdminLayout = (props) => {
	const [Collapsed, setCollapsed] = useState(false);
	const { Header, Content, Footer } = Layout;
	const { routes } = props;
	const { user, isLoading } = useAuth();

	if (!user && !isLoading) {
		return (
			<>
				<Route path="/admin/login" component={AdminSignin} />
				<Redirect to="/admin/login" />
			</>
		);
	}

	if (user && !isLoading) {
		return (
			<Layout>
				<MenuSider menuCollapsed={Collapsed} />
				<Layout
					className="layout-admin"
					style={{ marginLeft: Collapsed ? "80px" : "200px" }}>
					<Header className="layout-admin__header">
						<MenuTop
							menuCollapsed={Collapsed}
							setMenuCollapsed={setCollapsed}
						/>
					</Header>
					<Content className="layout-admin__content">
						<LoadRoutes routes={routes} />
					</Content>
					<Footer className="layout-admin__footer">Moises Barillas</Footer>
				</Layout>
			</Layout>
		);
	}

	return null;
};

function LoadRoutes({ routes }) {
	return (
		<Switch>
			{routes.map((route, index) => (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.component}
				/>
			))}
		</Switch>
	);
}

export default AdminLayout;
