import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import Modal from "../../../components/Modal";
import Query from "query-string";
import { getPostApi } from "../../../api/post";
import PostList from "../../../components/Admin/Blog/PostList";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";

import "./Blog.scss";

function Blog(props) {
	const { location, history } = props;
	const [posts, setPosts] = useState(null);
	const [reload, setReload] = useState(false);

	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState(null);

	const { page = 1 } = Query.parse(location.search);

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
		setReload(false);
	}, [page, reload]);

	const addPost = () => {
		setIsVisibleModal(true);
		setModalTitle("Creando nuevo post");
		setModalContent(
			<AddEditPostForm
				setIsVisibleModal={setIsVisibleModal}
				setReload={setReload}
				post={null}
			/>
		);
	};

	const editPost = (post) => {
		setIsVisibleModal(true);
		setModalTitle("Editar Post");
		setModalContent(
			<AddEditPostForm
				setIsVisibleModal={setIsVisibleModal}
				setReload={setReload}
				post={post}
			/>
		);
	};

	if (!posts) {
		return null;
	}

	return (
		<div className="blog">
			<div className="blog__add-post">
				<Button type="primary" onClick={addPost}>
					Nuevo post
				</Button>
			</div>
			<PostList posts={posts} setReload={setReload} editPost={editPost} />
			<Pagination posts={posts} location={location} history={history} />

			<Modal
				title={modalTitle}
				isVisible={isVisibleModal}
				setIsVisible={setIsVisibleModal}
				width="75%">
				{modalContent}
			</Modal>
		</div>
	);
}

export default withRouter(Blog);
