import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { DollarOutlined, GifOutlined, KeyOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/Auth";
import { addCourseApi, updateCourseApi } from "../../../../api/course";

import "./AddEditCoursesForm.scss";

export default function AddEditCoursesForm(props) {
	const { setIsVM, setReload, course } = props;
	const [courseData, setCourseData] = useState({});

	useEffect(() => {
		course ? setCourseData(course) : setCourseData({});
	}, [course]);

	const addCourse = (e) => {
		e.preventDefault();

		if (!courseData.idCourses) {
			notification["error"]({
				message: "El id del curso es obligatorio",
			});
		} else {
			const token = getAccessTokenApi();
			addCourseApi(token, courseData)
				.then((res) => {
					const typeNotification = res.code === 200 ? "success" : "warning";

					notification[typeNotification]({
						message: res.message,
					});

					setIsVM(false);
					setReload(true);
					setCourseData({});
				})
				.catch(() => {
					notification["error"]({
						message: "Error del servidor, intentelo mas tarde",
					});
				});
		}
	};

	const updateCourse = (e) => {
		e.preventDefault();
		const token = getAccessTokenApi();
		updateCourseApi(token, course._id, courseData)
			.then((res) => {
				const tn = res.code === 200 ? "success" : "warning";

				notification[tn]({
					message: res.message,
				});

				setIsVM(false);
				setReload(true);
				setCourseData({});
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor, intentelo mas tarde",
				});
			});
	};
	return (
		<div className="add-edit-course-form">
			<AddEditForm
				course={course}
				addCourse={addCourse}
				updateCourse={updateCourse}
				setCourseData={setCourseData}
				courseData={courseData}
			/>
		</div>
	);
}

function AddEditForm(props) {
	const { course, addCourse, updateCourse, setCourseData, courseData } = props;

	return (
		<Form
			className="form-add-edit"
			onSubmitCapture={course ? updateCourse : addCourse}>
			<Form.Item>
				<Input
					prefix={<KeyOutlined />}
					placeholder="ID del curso"
					value={courseData.idCourses}
					onChange={(e) =>
						setCourseData({ ...courseData, idCourses: e.target.value })
					}
					disabled={course ? true : false}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<KeyOutlined />}
					placeholder="URL del curso"
					value={courseData.link}
					onChange={(e) =>
						setCourseData({ ...courseData, link: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<GifOutlined />}
					placeholder="Cupon de descuento"
					value={courseData.coupon}
					onChange={(e) =>
						setCourseData({ ...courseData, coupon: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Input
					prefix={<DollarOutlined />}
					placeholder="Precio del curso"
					value={courseData.price}
					onChange={(e) =>
						setCourseData({ ...courseData, price: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit" type="primary">
					{course ? "Actualizar Curso" : "Crear curso"}
				</Button>
			</Form.Item>
		</Form>
	);
}
