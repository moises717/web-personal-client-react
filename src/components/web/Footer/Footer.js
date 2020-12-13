import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import Navigation from "./Navigation";
import NewsLetter from "../NewsLetter";

import "./Footer.scss";

export default function Footer() {
	const { Footer } = Layout;

	return (
		<Footer className="footer">
			<Row>
				<Col md={4}></Col>
				<Col md={16}>
					<Row>
						<Col md={8}>
							<MyInfo />
						</Col>
						<Col md={8}>
							<Navigation />
						</Col>
						<Col md={8}>
							<NewsLetter />
						</Col>
					</Row>
					<Row className="footer__copyright">
						<Col md={12}> © TODOS LOS DERECHOS RESERVADOS</Col>
						<Col md={12}> Moises barillas</Col>
					</Row>
				</Col>
				<Col md={4}></Col>
			</Row>
		</Footer>
	);
}
