import React from "react";
import { Row, Card, Col } from "antd";
import {
	CheckOutlined,
	ClockCircleFilled,
	DollarOutlined,
	KeyOutlined,
	MessageOutlined,
	UserOutlined,
} from "@ant-design/icons";

import "./HomeMyCourses.scss";

export default function HomeMyCourses() {
	return (
		<Row className="home-my-courses">
			<Col lg={24} className="home-my-courses__title">
				<h2>Como funcionan mis cursos</h2>
				<h3>
					Cada curso cuenta con contenido bajo la web de Udemy, activa las 24
					horas al dia los 365 dias del año
				</h3>
			</Col>

			<Col lg={4}></Col>
			<Col lg={16}>
				<Row className="row-cards">
					<Col md={8}>
						<CardInfo
							icon={<ClockCircleFilled />}
							title="Cursos y clases"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
					<Col md={8}>
						<CardInfo
							icon={<KeyOutlined />}
							title="acceso las 24 horas"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
					<Col md={8}>
						<CardInfo
							icon={<MessageOutlined />}
							title="aprendizaje colaborativo"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
					<Col md={8}>
						<CardInfo
							icon={<UserOutlined />}
							title="Mejora tu perfil"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
					<Col md={8}>
						<CardInfo
							icon={<DollarOutlined />}
							title="Precios Bajos"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
					<Col md={8}>
						<CardInfo
							icon={<CheckOutlined />}
							title="Certificados de finalizacion"
							subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi"
						/>
					</Col>
				</Row>
			</Col>
			<Col lg={4}></Col>
		</Row>
	);
}

function CardInfo(props) {
	const { icon, title, subtitle } = props;

	const { Meta } = Card;

	return (
		<Card className="home-my-courses__card">
			{icon}
			<Meta title={title} description={subtitle}></Meta>
		</Card>
	);
}
