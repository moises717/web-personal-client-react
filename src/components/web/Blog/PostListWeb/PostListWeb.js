import React, { useState, useEffect } from "react";
import { Spin, List, notification, Row, Col } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import QueryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostApi } from "../../../../api/post";
import "moment/locale/es";

import "./PostListWeb.scss";

export default function PostListWeb(props) {
	const { location, history } = props;
	const [posts, setPosts] = useState(null);
	const { page = 1 } = QueryString.parse(location.search);

	useEffect(() => {
		getPostApi(2, page)
			.then((res) => {
				if (res?.code !== 200) {
					notification["warning"]({
						message: res.message,
					});
				} else {
					setPosts(res.posts);
				}
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor",
				});
			});
	}, [page]);

	if (!posts) {
		return (
			<Spin tip="Cargando.." style={{ width: "100%", padding: "200px 0" }} />
		);
	}

	return (
		<div className="post-list-web">
			<h1>Blog</h1>
			<List
				dataSource={posts.docs}
				renderItem={(post) => <Post post={post} />}></List>
			<Pagination posts={posts} location={location} history={history} />
		</div>
	);
}

function Post(props) {
	const { post } = props;

	const date = moment(post.date).format("DD");
	const month = moment(post.date).format("MMMM");

	return (
		<div className="post">
			<Row gutter={24}>
				<Col md={4} lg={4}>
					<div className="post__date">
						<span>{date}</span>
						<span>{month}</span>
					</div>
				</Col>
				<Col md={16} lg={16}>
					<Link to={"blog/" + post.url}>
						<List.Item.Meta title={post.title} />
					</Link>
				</Col>
				<Col md={4}></Col>
			</Row>
			<br />
		</div>
	);
}
