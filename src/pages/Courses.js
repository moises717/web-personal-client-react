import React, { useEffect, useState } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getCoursesApi } from "../api/course";
import Helmet from "react-helmet";

import PresentationCourses from "../components/web/Courses/PresentationCourses";
import CoursesList from "../components/web/Courses/CoursesList";

export default function Courses() {
	const [courses, setCourses] = useState(null);

	useEffect(() => {
		getCoursesApi()
			.then((res) => {
				if (res?.code !== 200) {
					notification["warning"]({
						message: res.message,
					});
				} else {
					setCourses(res.courses);
				}
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor, intentelo mas tarde",
				});
			});
	}, []);
	return (
		<>
			<Helmet>
				<title>Cursos || Moises barillas</title>
				<meta
					name="description"
					content="Cursos || web sobre programacion"
					data-react-helmet="true"
				/>
			</Helmet>
			<Row>
				<Col md={4} />

				<Col md={16}>
					<PresentationCourses />

					{!courses ? (
						<Spin
							tip="Cargando cursos"
							style={{
								textAlign: "center",
								width: "100%",
								padding: "20px",
							}}></Spin>
					) : (
						<CoursesList courses={courses} />
					)}
				</Col>
				<Col md={4} />
			</Row>
		</>
	);
}
