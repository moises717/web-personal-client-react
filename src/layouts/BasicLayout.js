import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";
import MenuTop from "../components/web/MenuTop/MenuTop";
import Footer from "../components/web/Footer";

import "./BasicLayout.scss";

const BasicLayout = (props) => {
	const { routes } = props;

	return (
		<>
			<Row>
				<Col lg={4}></Col>
				<Col lg={16}>
					<MenuTop />
				</Col>
				<Col lg={4}></Col>
			</Row>
			<LoadRoutes routes={routes} />
			<Footer />
		</>
	);
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

export default BasicLayout;
