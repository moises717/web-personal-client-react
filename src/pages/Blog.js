import React from "react";
import { Row, Col } from "antd";
import { useParams, withRouter } from "react-router-dom";
import PostListWeb from "../components/web/Blog/PostListWeb";
import PostInfo from "../components/web/Blog/PostInfo";

export default function Blog(props) {
	const { location, history } = props;
	const { url } = useParams();

	return (
		<Row>
			<Col md={4}></Col>
			<Col md={16}>
				{url ? (
					<PostInfo url={url} />
				) : (
					<PostListWeb location={location} history={history} />
				)}
			</Col>
			<Col md={4}></Col>
		</Row>
	);
}
