import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders navigation links
 *
 * @class      NavBar
 * @return     {JSX.Element}
 */
const NavBar: React.FC = (): JSX.Element => {
	return (
		<div className="container navbar">
			<Link to="">Home</Link>
			<nav className="nav-links">
				<Link to="/players">Players</Link>
				<Link to="/teams">Teams</Link>
			</nav>
		</div>
	);
};

export default NavBar;
