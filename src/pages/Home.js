import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/web/MainBanner/MainBanner";
import HomeCourses from "../components/web/HomeCourses/HomeCourses";
import HomeMyCourses from "../components/web/HomeMyCourses/HomeMyCourses";
import ReviewCourses from "../components/web/ReviewCourses";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Moises barillas</title>
				<meta
					name="description"
					content="Home || web sobre programacion"
					data-react-helmet="true"
				/>
			</Helmet>
			<MainBanner />
			<HomeCourses />
			<HomeMyCourses />
			<ReviewCourses />
		</>
	);
};

export default Home;
