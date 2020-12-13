/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Modal as modalAntd, notification, List } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import {
	getCourseDataUdemyApi,
	deleteCourseApi,
	updateCourseApi,
} from "../../../../api/course";
import { getAccessTokenApi } from "../../../../api/Auth";
import AddEditCourseForm from "../AddEditCourseForm";
import Modal from "../../../Modal";
import "./CoursesList.scss";

const { confirm } = modalAntd;

export default function CoursesList(props) {
	const { courses, setReload } = props;
	const [listCourses, setListCourses] = useState([]);
	const [isVM, setIsVM] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);

	useEffect(() => {
		const ListCoursesArray = [];

		courses.forEach((course) => {
			ListCoursesArray.push({
				content: (
					<Course
						course={course}
						deleteCourse={deleteCourse}
						addCourseModal={addCourseModal}
						editCourseModal={editCourseModal}
					/>
				),
			});
		});

		setListCourses(ListCoursesArray);
	}, [courses]);

	const onSort = (sortedList, dropEvent) => {
		const token = getAccessTokenApi();

		sortedList.forEach((items) => {
			const { _id } = items.content.props.course;
			const order = items.rank;
			updateCourseApi(token, _id, { order });
		});
	};

	const deleteCourse = (course) => {
		const token = getAccessTokenApi();

		confirm({
			title: "Eliminar curso",
			content: `Estas seguro que quieres eliminar ${course.title}`,
			okText: "Eliminar",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				deleteCourseApi(token, course._id)
					.then((res) => {
						const typeNotification = res.code === 200 ? "success" : "warning";
						notification[typeNotification]({
							message: res.message,
						});
						setReload(true);
					})
					.catch(() => {
						notification["error"]({
							message: "Error del servidor intentelo mas tarde",
						});
					});
			},
		});
	};

	const addCourseModal = () => {
		setIsVM(true);
		setModalTitle("Creando nuevo curso");
		setModalContent(
			<AddEditCourseForm setIsVM={setIsVM} setReload={setReload} />
		);
	};
	const editCourseModal = (course) => {
		setIsVM(true);
		setModalTitle("Actulizando curso");
		setModalContent(
			<AddEditCourseForm
				setIsVM={setIsVM}
				setReload={setReload}
				course={course}
			/>
		);
	};

	return (
		<div className="courses-list">
			<div className="courses-list__header">
				<Button type="primary" onClick={addCourseModal}>
					Nuevo curso
				</Button>
			</div>

			<div className="courses-list__items">
				{listCourses.length === 0 && (
					<h2 style={{ textAlign: "center", margin: 0 }}>
						No tienes cursos creados
					</h2>
				)}
				<DragSortableList
					items={listCourses}
					onSort={onSort}
					type="vertical"></DragSortableList>
			</div>

			<Modal title={modalTitle} isVisible={isVM} setIsVisible={setIsVM}>
				{modalContent}
			</Modal>
		</div>
	);
}

function Course(props) {
	const { course, deleteCourse, editCourseModal } = props;
	const [courseData, setCourseData] = useState(null);

	useEffect(() => {
		getCourseDataUdemyApi(course.idCourses).then((res) => {
			if (res.code !== 200) {
				notification["error"]({
					message: `El curso con el id ${course.idCourses} no se ha encontrado`,
				});
			}

			setCourseData(res.data);
		});
	}, [course]);

	if (!courseData) {
		return null;
	}

	return (
		<List.Item
			actions={[
				<Button type="primary" onClick={() => editCourseModal(course)}>
					<EditOutlined />
				</Button>,
				<Button type="danger" onClick={() => deleteCourse(course)}>
					<DeleteOutlined />
				</Button>,
			]}>
			<img
				src={courseData.image_480x270}
				alt={courseData.title}
				style={{ width: "100px", marginRight: "20px" }}
			/>
			<List.Item.Meta
				title={`${courseData.title} | ID : ${course.idCourses}`}
				description={courseData.headline}></List.Item.Meta>
		</List.Item>
	);
}
