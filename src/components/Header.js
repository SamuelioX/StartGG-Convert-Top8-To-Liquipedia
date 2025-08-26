import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<h1>Convert StartGG to Liquiapedia</h1>
			<hr />
			<div className="links">
				<NavLink to="/" className="link" activeClassName="active" exact>
					Home
				</NavLink>
				<NavLink to="/convert" className="link" activeClassName="active">
					Convert
				</NavLink>
				<NavLink to="/fetch" className="link" activeClassName="active">
					Fetch
				</NavLink>
			</div>
		</header>
	);
};

export default Header;
