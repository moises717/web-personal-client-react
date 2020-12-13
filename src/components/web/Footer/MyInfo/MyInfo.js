import React from "react";
import Logo from "../../../../assets/png/logo-white.png";
import SocialLinks from "../../SocialLinks/";

import "./MyInfo.scss";

export default function MyInfo() {
	return (
		<div className="my-info">
			<img src={Logo} alt="Moises barillas" />
			<h4>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quam
			</h4>
			<SocialLinks />
		</div>
	);
}
