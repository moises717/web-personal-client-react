import React from "react";
import { ReactComponent as Youtube } from "../../../assets/svg/youtube.svg";
import { ReactComponent as Twiter } from "../../../assets/svg/twitter.svg";
import { ReactComponent as Linkedin } from "../../../assets/svg/linkedin.svg";
import { ReactComponent as Facebook } from "../../../assets/svg/facebook.svg";

import "./SocialLinks.scss";

const SocialLinks = () => {
	return (
		<div className="social-links">
			<a
				href="https://youtube.com"
				className="youtube"
				target="_blank"
				rel="noopener noreferrer">
				<Youtube />
			</a>
			<a
				href="https://twitter.com"
				className="twiter"
				target="_blank"
				rel="noopener noreferrer">
				<Twiter />
			</a>
			<a
				href="https://facebook.com"
				className="facebook"
				target="_blank"
				rel="noopener noreferrer">
				<Facebook />
			</a>
			<a
				href="https://linkedin.com"
				className="linkedin"
				target="_blank"
				rel="noopener noreferrer">
				<Linkedin />
			</a>
		</div>
	);
};

export default SocialLinks;
