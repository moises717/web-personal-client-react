import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/jpg/avat-2.jpg";
import "./ReviewCourses.scss";

export default function ReviewCourses() {
	return (
		<Row className="review-courses">
			<Row>
				<Col lg={4} />
				<Col lg={16} className="review-courses__title">
					<h2>Forma parte de los +35 mil estudiantes</h2>
				</Col>
				<Col lg={4} />
			</Row>
			<Row>
				<Col lg={4} />
				<Col lg={16}>
					<Row className="row-cards">
						<Col md={8}>
							<CardReview
								nombre="Moises barillas"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
						<Col md={8}>
							<CardReview
								nombre="Moises Rocha"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
						<Col md={8}>
							<CardReview
								nombre="Moises Perez"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
					</Row>
					<Row className="row-cards">
						<Col md={8}>
							<CardReview
								nombre="Jesus barillas"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
						<Col md={8}>
							<CardReview
								nombre="Jesus barillas"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
						<Col md={8}>
							<CardReview
								nombre="jesus rocha"
								subtitle="Alumno de udemy"
								review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio culpa aliquid, reiciendis perferendis vitae quos veritatis commodi praesentium eos necessitatibus voluptate aperiam repellat cum eaque pariatur in, maiores quis suscipit."
								avatar={AvatarPersona}
							/>
						</Col>
					</Row>
				</Col>
				<Col lg={4} />
			</Row>
		</Row>
	);
}

function CardReview(props) {
	const { nombre, subtitle, avatar, review } = props;

	const { Meta } = Card;

	return (
		<Card className="review-courses__card">
			<p>{review}</p>
			<Meta
				avatar={<Avatar src={avatar} />}
				title={nombre}
				description={subtitle}
			/>
		</Card>
	);
}
