import React from "react";
import { Button } from "antd";
import {
	MenuFoldOutlined,
	PoweroffOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "../../../assets/png/logo-white.png";
import { logout } from "../../../api/Auth";
import "./MenuTop.scss";
import { Link } from "react-router-dom";

const MenuTop = (props) => {
	const { menuCollapsed, setMenuCollapsed } = props;
	const logoutUser = () => {
		logout();
		window.location.href = "/admin";
	};
	return (
		<div className="menu-top">
			<div className="menu-top__left">
				<Link to="/admin">
					<img
						src={Logo}
						className="menu-top__left-logo"
						alt="Moises Barillas"
					/>
				</Link>
				<Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
					{menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</div>
			<div className="menu-top__right">
				<Button type="link">
					<PoweroffOutlined onClick={logoutUser} />
				</Button>
			</div>
		</div>
	);
};

export default MenuTop;
