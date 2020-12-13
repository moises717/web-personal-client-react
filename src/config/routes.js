//Layout
import AdminLayout from "../layouts/AdminLayout";
import BasicLayout from "../layouts/BasicLayout";

//page admin
import AdminHome from "../pages/Admin";
import AdminSignin from "../pages/Admin/Signin";
import AdminUser from "../pages/Admin/Users/Users";
import adminMenuWeb from "../pages/Admin/MenuWeb/MenuWeb";
import adminCourses from "../pages/Admin/Courses";
import AdminBlog from "../pages/Admin/Blog";

//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Blog from "../pages/Blog";

//Others
import Error404 from "../pages/Error404";

const routes = [
	{
		path: "/admin",
		component: AdminLayout,
		exact: false,
		routes: [
			{
				path: "/admin",
				component: AdminHome,
				exact: true,
			},
			{
				path: "/admin/login",
				component: AdminSignin,
				exact: true,
			},
			{
				path: "/admin/users",
				component: AdminUser,
				exact: true,
			},
			{
				path: "/admin/menu",
				component: adminMenuWeb,
				exact: true,
			},
			{
				path: "/admin/courses",
				component: adminCourses,
				exact: true,
			},
			{
				path: "/admin/blog",
				component: AdminBlog,
				exact: true,
			},
			{
				component: Error404,
			},
		],
	},
	{
		path: "/",
		component: BasicLayout,
		exact: false,
		routes: [
			{
				path: "/",
				component: Home,
				exact: true,
			},
			{
				path: "/contact",
				component: Contact,
				exact: true,
			},
			{
				path: "/courses",
				component: Courses,
				exact: true,
			},
			{
				path: "/blog",
				component: Blog,
				exact: true,
			},
			{
				path: "/blog/:url",
				component: Blog,
				exact: true,
			},

			{
				component: Error404,
			},
		],
	},
];

export default routes;
