import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
import slug from 'slug';
import Loading from './Loading';

interface CustomLinkProps {
	to: LocationDescriptorObject;
	children: React.ReactNode;
}

/**
 * Renders link with bold style if selected
 *
 * @class      CustomLink
 * @return     {JSX.Element}
 */
const CustomLink: React.FC<CustomLinkProps> = ({
	to,
	children,
}: CustomLinkProps): JSX.Element => {
	return (
		<Route path={to.pathname}>
			{({ match }): JSX.Element => (
				<li
					style={{
						listStyleType: 'none',
						fontWeight: match ? 'bold' : 'normal',
					}}
				>
					<Link to={to}>{children}</Link>
				</li>
			)}
		</Route>
	);
};

interface SidebarProps {
	title: string;
	list: Array<string>;
	loading: boolean;
}

/**
 * Creates sidebar with selectable links
 *
 * @class      Sidebar
 * @return     {JSX.Element}
 */
const Sidebar: React.FC<RouteComponentProps & SidebarProps> = ({
	title,
	list,
	loading,
	location,
	match,
}: RouteComponentProps & SidebarProps): JSX.Element => {
	return loading === true ? (
		<Loading />
	) : (
		<div>
			<h3 className="header">{title}</h3>
			<ul className="sidebar-list">
				{list.map(
					(item): JSX.Element => (
						<CustomLink
							key={item}
							to={{
								pathname: `${match.url}/${slug(item)}`,
								search: location.search,
							}}
						>
							{item.toUpperCase()}
						</CustomLink>
					)
				)}
			</ul>
		</div>
	);
};

Sidebar.propTypes = {
	title: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Sidebar;
