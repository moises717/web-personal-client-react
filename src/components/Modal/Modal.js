import React from "react";
import { Modal as ModalAnt } from "antd";

const Modal = (props) => {
	const { children, title, isVisible, setIsVisible, ...other } = props;

	return (
		<ModalAnt
			title={title}
			centered
			visible={isVisible}
			onCancel={() => setIsVisible(false)}
			{...other}>
			{children}
		</ModalAnt>
	);
};

export default Modal;
