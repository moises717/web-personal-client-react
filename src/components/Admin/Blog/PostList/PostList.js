import React from "react";
import { Helmet } from "react-helmet";

import { List, Button, Modal, notification } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/Auth";
import { deletePostApi } from "../../../../api/post";

import "./PostList.scss";

const { confirm } = Modal;

export default function PostList(props) {
	const { posts, setReload, editPost } = props;

	const deletePost = (post) => {
		const token = getAccessTokenApi();

		confirm({
			title: "Eliminado post",
			content: `Estas seguro de eliminar ${post.title}`,
			okText: "Eliminar",
			okType: "danger",
			cancelText: "Cancelar",
			onOk() {
				deletePostApi(token, post._id)
					.then((res) => {
						const tn = res.code === 200 ? "success" : "warning";

						notification[tn]({
							message: res.message,
						});
						setReload(true);
					})
					.catch(() => {
						notification["error"]({
							message: "Error del servidor",
						});
					});
			},
		});
	};

	return (
		<>
			<Helmet>
				<title>Blog || Moises barillas</title>
			</Helmet>
			<div className="posts-list">
				<List
					dataSource={posts.docs}
					renderItem={(post) => (
						<Post post={post} deletePost={deletePost} editPost={editPost} />
					)}
				/>
			</div>
		</>
	);
}

function Post(props) {
	const { post, deletePost, editPost } = props;

	return (
		<List.Item
			actions={[
				<Link to={`/blog/${post.url}`} target="__black">
					<Button type="primary" target="_blank">
						<EyeOutlined />
					</Button>
				</Link>,
				<Button type="primary" onClick={() => editPost(post)}>
					<EditOutlined />
				</Button>,
				<Button type="danger" onClick={() => deletePost(post)}>
					<DeleteOutlined />
				</Button>,
			]}>
			<List.Item.Meta title={post.title} />
		</List.Item>
	);
}
