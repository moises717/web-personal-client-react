import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuApi } from "../../../api/menu";
import "./MenuTop.scss";
import Logo from "../../../assets/png/logo-white.png";
import SocialLinks from "../SocialLinks/SocialLinks";

const MenuTop = () => {
	const [menuData, setMenuData] = useState([]);

	useEffect(() => {
		getMenuApi().then((res) => {
			const arrayMenu = [];
			res.menus.forEach((item) => {
				item.active && arrayMenu.push(item);
			});
			setMenuData(arrayMenu);
		});
	}, []);

	return (
		<Menu className="menu-top-web" mode="horizontal">
			<Menu.Item className="menu-top__logo">
				<Link to={"/"}>
					<img src={Logo} alt="MOISES BARILLAS" />
				</Link>
			</Menu.Item>

			{menuData.map((item) => {
				const external = item.url.indexOf("http") > -1 ? true : false;

				if (external) {
					return (
						<Menu.Item key={item._id} className="menu-top-web__item">
							<a href={item.url} target="_blank" rel="noopener noreferrer">
								{item.title}
							</a>
						</Menu.Item>
					);
				}

				return (
					<Menu.Item key={item._id} className="menu-web-top__item">
						<Link to={item.url}>{item.title}</Link>
					</Menu.Item>
				);
			})}

			{/*<Menu.Item className="menu-top-web__item">
				<Link to={"/"}>Home</Link>
			</Menu.Item>
			<Menu.Item className="menu-top-web__item">
				<Link to={"contact"}>Contact</Link>
			</Menu.Item>*/}

			<SocialLinks />
		</Menu>
	);
};

export default MenuTop;
