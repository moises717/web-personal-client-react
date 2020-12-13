import React, { useState, useEffect } from "react";
import { getUserActiveApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/Auth";
import ListUsers from "../../../components/Admin/Users/ListUsers/ListUsers";
import "./Users.scss";

const User = () => {
	const [usersActive, setUsersActive] = useState([]);
	const [reloadUsers, setReloadUsers] = useState(false);
	const token = getAccessTokenApi();
	const [usersInactive, setUsersInactive] = useState([]);

	useEffect(() => {
		getUserActiveApi(token, true).then((res) => {
			setUsersActive(res.users);
		});
		getUserActiveApi(token, false).then((res) => {
			setUsersInactive(res.users);
		});
		setReloadUsers(false);
	}, [token, reloadUsers]);

	return (
		<div className="users">
			<ListUsers
				setReloadUsers={setReloadUsers}
				usersActives={usersActive}
				usersInactives={usersInactive}
			/>
		</div>
	);
};

export default User;
