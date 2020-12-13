/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Row, Col } from "antd";
import {
	AppstoreOutlined,
	BookOutlined,
	CodeOutlined,
	DatabaseOutlined,
	HddOutlined,
	RightOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation() {
	return (
		<Row className="navigation-footer">
			<Col md={12}>
				<RenderListLeft />
			</Col>
			<Col md={12}>
				<RenderListRight />
			</Col>
		</Row>
	);
}

function RenderListLeft() {
	return (
		<ul>
			<li>
				<a href="#">
					<BookOutlined /> Cursos online
				</a>
			</li>
			<li>
				<Link to="/contact">
					<CodeOutlined /> Desarrolo web
				</Link>
			</li>
			<li>
				<a href="#">
					<DatabaseOutlined /> Base de datos
				</a>
			</li>
			<li>
				<a href="#">
					<BookOutlined /> Politicas de privacidad
				</a>
			</li>
		</ul>
	);
}

function RenderListRight() {
	return (
		<ul>
			<li>
				<a href="#">
					<HddOutlined /> Sistemas / Servidores
				</a>
			</li>
			<li>
				<Link to="/contact">
					<AppstoreOutlined /> CMS
				</Link>
			</li>
			<li>
				<a href="#">
					<UserOutlined /> Portafolio
				</a>
			</li>
			<li>
				<a href="#">
					<RightOutlined /> Politicas de cookies
				</a>
			</li>
		</ul>
	);
}
