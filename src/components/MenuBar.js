import React, { useState, useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link, useHistory, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth";
export default function MenuBar() {
	const { user, logout } = useContext(AuthContext);
	const {
		location: { pathname },
	} = useHistory();
	const path = pathname === "/" ? "home" : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div>
			<Menu pointing secondary size="massive" color="teal">
				<Menu.Item
					name={user ? user.username : "home"}
					active
					as={Link}
					to="/"
				/>
				{user ? (
					<Menu.Menu position="right">
						<Menu.Item name="Logout" onClick={logout} />
					</Menu.Menu>
				) : (
					<Menu.Menu position="right">
						<Menu.Item
							name="login"
							active={activeItem === "login"}
							onClick={handleItemClick}
							as={Link}
							to="/login"
						/>
						<Menu.Item
							name="register"
							active={activeItem === "register"}
							onClick={handleItemClick}
							as={Link}
							to="/register"
						/>
					</Menu.Menu>
				)}
			</Menu>
		</div>
	);
}
