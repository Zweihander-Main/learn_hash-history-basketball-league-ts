import * as React from 'react';
import TeamLogo from './TeamLogo';
import { Link } from 'react-router-dom';
import { getTeamNames } from '../api';

interface HomeState {
	teamNames: Array<string>;
}

/**
 * Renders team logos and links
 *
 * @class      Home
 */
export default class Home extends React.Component<{}, HomeState> {
	state = {
		teamNames: [],
	};

	componentDidMount(): void {
		getTeamNames().then((teamNames) =>
			this.setState(() => ({
				teamNames,
			}))
		);
	}

	render(): JSX.Element {
		const { teamNames } = this.state;

		return (
			<div className="container">
				<h1 className="large-header">Hash History Basketball League</h1>
				<h3 className="header text-center">Select a team</h3>
				<div className="home-grid">
					{teamNames.map(
						(id: string): JSX.Element => (
							<Link key={id} to={`/${id}`}>
								<TeamLogo id={id} width="125px" />
							</Link>
						)
					)}
				</div>
			</div>
		);
	}
}
