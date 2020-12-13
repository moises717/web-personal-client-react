import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Spin, notification } from "antd";
import moment from "moment";
import { getPostSApi } from "../../../../api/post";
import "moment/locale/es";

import "./PostInfo.scss";

export default function PostInfo(props) {
	const { url } = props;

	const [postInfo, setPostInfo] = useState(null);

	useEffect(() => {
		getPostSApi(url)
			.then((res) => {
				if (res.code !== 200) {
					notification["warning"]({
						message: res.message,
					});
				} else {
					setPostInfo(res.post);
				}
			})
			.catch(() => {
				notification["error"]({
					message: "Error del servidor.",
				});
			});
	}, [url]);

	if (!postInfo) {
		return (
			<Spin tip="Cargando.." style={{ width: "100%", padding: "200px 0" }} />
		);
	}

	return (
		<>
			<Helmet>
				<title> {postInfo.title} | Moises barillas</title>
			</Helmet>
			<div className="post-info">
				<h1 className="post-info__title">{postInfo.title}</h1>
				<div className="post-info__creation-date">
					{moment(postInfo.date).local("es").format("LL")}
				</div>

				<div
					className="post-info__description"
					dangerouslySetInnerHTML={{ __html: postInfo.description }}
				/>
			</div>
		</>
	);
}
