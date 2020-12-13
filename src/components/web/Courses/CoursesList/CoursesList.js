/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getCourseDataUdemyApi } from "../../../../api/course";

import "./CoursesList.scss";

export default function CoursesList(props) {
	const { courses } = props;

	return (
		<div className="courses-list">
			<Row>
				{courses.map((course) => (
					<Col md={8} key={course._id} className="courses-list__course">
						<Course course={course} />
					</Col>
				))}
			</Row>
		</div>
	);
}

function Course(props) {
	const { course } = props;

	const [courseInfo, setCourseInfo] = useState({});

	const [urlCourse, setUlrCourse] = useState("");

	const { Meta } = Card;

	useEffect(() => {
		getCourseDataUdemyApi(course.idCourses)
			.then((res) => {
				if (res?.code !== 200) {
					notification["warning"]({
						message: res.message,
					});
				} else {
					setCourseInfo(res.data);
					mountUrl(res.data.url);
				}
			})
			.catch(() => {
				notification["error"]({ message: "Error del servidor" });
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [course]);

	const mountUrl = (url) => {
		if (!course.link) {
			const baseurl = `https//www.udemy.com/${url}`;

			const finalUrl =
				baseurl + (course.coupon ? `?couponCode=${course.coupon}` : "");
			setUlrCourse(finalUrl);
		} else {
			setUlrCourse(course.link);
		}
	};

	return (
		<a href={urlCourse} target="_blank" rel="noopener noreferrer">
			<Card
				cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} />}>
				<Meta title={courseInfo.title} description={courseInfo.headline} />
				<Button>Entrar al curso</Button>
				<div className="courses-list__course-footer">
					<span>{course.price ? `${course.price}` : courseInfo.price}</span>
					<div className="">
						<Rate disabled defaultValue={5} />
					</div>
				</div>
			</Card>
		</a>
	);
}
