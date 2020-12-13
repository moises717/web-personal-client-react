import React, { useState, useEffect } from "react";
import { getMenuApi } from "../../../api/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList/MenuWebList";
const MenuWeb = () => {
	const [menu, setMenu] = useState([]);

	const [reloadMenu, setReloadMenu] = useState(false);

	useEffect(() => {
		getMenuApi().then((res) => {
			setMenu(res.menus);
		});
		setReloadMenu(false);
	}, [reloadMenu]);

	return (
		<div className="menu-web">
			<MenuWebList menu={menu} setReloadMenu={setReloadMenu} />
		</div>
	);
};

export default MenuWeb;
