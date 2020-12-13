import React, { useState, useEffect } from "react";
import { getCoursesApi } from "../../api/course";
import CoursesList from "../../components/Admin/Courses/CoursesList";

export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		getCoursesApi().then((res) => {
			setCourses(res.courses);
		});

		setReload(false);
	}, [reload]);

	return (
		<div className="courses">
			<CoursesList courses={courses} setReload={setReload} />
		</div>
	);
}
