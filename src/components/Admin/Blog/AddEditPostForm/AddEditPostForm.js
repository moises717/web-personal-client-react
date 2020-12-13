/* eslint-disable no-multi-str */
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/Auth";
import { addPostApi, updatePostApi } from "../../../../api/post";
import moment from "moment";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
	const { setIsVisibleModal, setReload, post } = props;
	const [postData, setPostData] = useState({});
	useEffect(() => {
		if (post) {
			setPostData(post);
		} else {
			setPostData({});
		}
	}, [post]);

	const processPost = (e) => {
		e.preventDefault();
		const { title, url, description, date } = postData;
		if (!title || !url || !description || !date) {
			notification["error"]({
				message: "Todos los campos son obligatorios.",
			});
		} else {
			if (!post) {
				addPost();
			} else {
				updatePost();
			}
		}
	};

	const addPost = () => {
		const token = getAccessTokenApi();

		addPostApi(token, postData)
			.then((res) => {
				const tn = res.code === 200 ? "success" : "warning";
				notification[tn]({
					message: res.message,
				});
				setIsVisibleModal(false);
				setReload(true);
				setPostData({});
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor",
				});
			});
	};

	const updatePost = () => {
		const token = getAccessTokenApi();

		updatePostApi(token, postData._id, postData)
			.then((res) => {
				const tn = res.code === 200 ? "success" : "warning";
				notification[tn]({
					message: res.message,
				});
				setIsVisibleModal(false);
				setReload(true);
				setPostData({});
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor.",
				});
			});
	};

	return (
		<div className="add-edit-post-form">
			<AddEditForm
				postData={postData}
				setPostData={setPostData}
				post={post}
				processPost={processPost}
			/>
		</div>
	);
}

function AddEditForm(props) {
	const { postData, setPostData, post, processPost } = props;

	return (
		<Form
			className="add-edit-post-form"
			layout="inline"
			onSubmitCapture={processPost}>
			<Row gutter={24}>
				<Col span={8}>
					<Input
						prefix={<FontSizeOutlined />}
						placeholder="Titulo"
						value={postData.title}
						onChange={(e) =>
							setPostData({ ...postData, title: e.target.value })
						}
					/>
				</Col>
				<Col span={8}>
					<Input
						prefix={<LinkOutlined />}
						placeholder="Url"
						value={postData.url}
						onChange={(e) =>
							setPostData({
								...postData,
								url: transformTextUrl(e.target.value),
							})
						}
					/>
				</Col>
				<Col span={8}>
					<DatePicker
						style={{ width: "100%" }}
						format="DD/MM/YY HH:mm:ss"
						placeholder="Fecha de publicacion"
						value={postData.date && moment(postData.date)}
						onChange={(e, value) =>
							setPostData({
								...postData,
								date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
							})
						}
					/>
				</Col>
			</Row>

			<Editor
				value={postData.description ? postData.description : ""}
				init={{
					height: 400,
					menubar: true,
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste code help wordcount",
					],
					toolbar:
						"undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
				}}
				onBlur={(e) =>
					setPostData({ ...postData, description: e.target.getContent() })
				}
			/>

			<Button type="primary" htmlType="submit" className="btn-submit">
				{post ? "Actualizar post" : "Crear post"}
			</Button>
		</Form>
	);
}

function transformTextUrl(text) {
	const url = text.replace(" ", "-");

	return url.toLowerCase();
}
