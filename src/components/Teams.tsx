import * as React from 'react';
import { RouteComponentProps, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import { Team as TeamType } from '../dummy-data';
import TeamLogo from './TeamLogo';
import Team from './Team';
import Loading from './Loading';

interface TeamsState {
	teamNames: Array<string>;
	loading: boolean;
}

/**
 * Lists team and displays information about selected team
 *
 * @class      Teams (name)
 */
export default class Teams extends React.Component<
	RouteComponentProps,
	TeamsState
> {
	state = {
		teamNames: [],
		loading: true,
	};

	componentDidMount(): void {
		getTeamNames().then((teamNames: Array<string>): void => {
			this.setState(() => ({
				loading: false,
				teamNames,
			}));
		});
	}

	render(): JSX.Element {
		const { loading, teamNames } = this.state;
		const { location, match } = this.props;

		return (
			<div className="container two-column">
				<Sidebar
					loading={loading}
					title="Teams"
					list={teamNames}
					{...this.props}
				/>

				{loading === false && location.pathname === '/teams' ? (
					<div className="sidebar-instruction">Select a Team</div>
				) : null}

				<Route
					path={`${match.url}/:teamId`}
					render={({ match }): JSX.Element => (
						<div className="panel">
							<Team id={match.params.teamId}>
								{(team: TeamType): JSX.Element =>
									team === null ? (
										<Loading />
									) : (
										<div style={{ width: '100%' }}>
											<TeamLogo
												id={team.id}
												className="center"
											/>
											<h1 className="medium-header">
												{team.name}
											</h1>
											<ul className="info-list row">
												<li>
													Established
													<div>
														{team.established}
													</div>
												</li>
												<li>
													Manager
													<div>{team.manager}</div>
												</li>
												<li>
													Coach<div>{team.coach}</div>
												</li>
											</ul>
											<Link
												className="center btn-main"
												to={`/${match.params.teamId}`}
											>
												{team.name} Team Page
											</Link>
										</div>
									)
								}
							</Team>
						</div>
					)}
				/>
			</div>
		);
	}
}
