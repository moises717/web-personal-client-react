import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";

import reactJsHook from "../../../assets/jpg/react-js-hooks.jpg";
import javascript from "../../../assets/jpg/javascript-es6.jpg";
import prestashop from "../../../assets/jpg/prestashop-1-7.jpg";
import reactnative from "../../../assets/jpg/react-native.jpg";
import wordpress from "../../../assets/jpg/wordpress.jpg";
import cssgrid from "../../../assets/jpg/css-grid.jpg";

import "./HomeCourses.scss";

export default function HomeCourses() {
	return (
		<Row className="home-courses">
			<Col lg={24} className="home-courses__title">
				<h2>Aprende y mejora tus habilidades</h2>
			</Col>
			<Col lg={4}></Col>
			<Col lg={16}>
				<Row className="row-courses">
					<Col lg={6}>
						{
							<CardCourses
								image={reactJsHook}
								title="React js hooks"
								subtitle="intermedio - react/javascript"
								link="https://udemy.com"
							/>
						}
					</Col>
					<Col lg={6}>
						{
							<CardCourses
								image={reactnative}
								title="React native Expo"
								subtitle="intermedio - react/javascript"
								link="https://udemy.com"
							/>
						}
					</Col>
					<Col lg={6}>
						{
							<CardCourses
								image={javascript}
								title="Javascript Es6"
								subtitle="basic - react/javascript"
								link="https://udemy.com"
							/>
						}
					</Col>
					<Col lg={6}>
						{
							<CardCourses
								image={wordpress}
								title="wordpress"
								subtitle="basic - react/javascript"
								link="https://udemy.com"
							/>
						}
					</Col>
				</Row>
				<Row className="row-courses">
					<Col lg={6}>
						{
							<CardCourses
								image={prestashop}
								title="prestashop"
								subtitle="basic - prestashop"
								link="https://udemy.com"
							/>
						}
					</Col>
					<Col md={6}></Col>
					<Col md={6}></Col>
					<Col md={6}>
						{
							<CardCourses
								image={cssgrid}
								title="css grid"
								subtitle="basic - css-grid"
								link="https://udemy.com"
							/>
						}
					</Col>
				</Row>
			</Col>
			<Col lg={4}></Col>
			<Col lg={24} className="home-courses__more">
				<Link to="/courses">
					<Button>VER MAS</Button>
				</Link>
			</Col>
		</Row>
	);
}

function CardCourses(props) {
	const { image, title, subtitle, link } = props;
	const { Meta } = Card;

	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			<Card
				className="home-courses__card"
				cover={<img src={image} alt={title} />}
				actions={[<Button>INGRESAR</Button>]}>
				<Meta title={title} description={subtitle}></Meta>
			</Card>
		</a>
	);
}
