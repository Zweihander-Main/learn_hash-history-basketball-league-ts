import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Player } from '../dummy-data';
import { getPlayers } from '../api';
import { parse } from 'query-string';
import slug from 'slug';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface PlayersState {
	players: Array<Player>;
	loading: boolean;
}

/**
 * Creates list of players, filters that list, and displays selected player info
 *
 * @class      Players (name)
 */
export default class Players extends React.Component<
	RouteComponentProps,
	PlayersState
> {
	state = {
		players: [] as Array<Player>,
		loading: true,
	};

	componentDidMount(): void {
		const { location } = this.props;

		location.search
			? this.fetchPlayers(parse(location.search).teamId as string)
			: this.fetchPlayers();
	}

	fetchPlayers = (teamId: string | void): void => {
		getPlayers(teamId).then((players: Array<Player>) =>
			this.setState(() => ({
				loading: false,
				players,
			}))
		);
	};

	render(): JSX.Element {
		const { loading, players } = this.state;
		const { match, location } = this.props;

		return (
			<div className="container two-column">
				<Sidebar
					loading={loading}
					title="Players"
					list={players.map((player: Player): string => player.name)}
					{...this.props}
				/>

				{loading === false && location.pathname === '/players' ? (
					<div className="sidebar-instruction">Select a Player</div>
				) : null}

				<Route
					path={`${match.url}/:playerId`}
					render={({ match }): React.ReactNode => {
						if (loading === true) return null;

						const foundPlayer = players.find(
							(player: Player) =>
								slug(player.name) === match.params.playerId
						);

						if (!foundPlayer) {
							return null;
						}

						const {
							name,
							position,
							teamId,
							number,
							avatar,
							apg,
							ppg,
							rpg,
							spg,
						} = foundPlayer;

						return (
							<TransitionGroup className="panel">
								<CSSTransition
									key={location.key}
									classNames="fade"
									timeout={250}
								>
									<div className="panel">
										<img
											className="avatar"
											src={`${avatar}`}
											alt={`${name}'s avatar`}
										/>
										<h1 className="medium-header">
											{name}
										</h1>
										<h3 className="header">#{number}</h3>
										<div className="row">
											<ul
												className="info-list"
												style={{ marginRight: 80 }}
											>
												<li>
													Team
													<div>
														<Link
															style={{
																color:
																	'#68809a',
															}}
															to={`/${teamId}`}
														>
															{teamId[0].toUpperCase() +
																teamId.slice(1)}
														</Link>
													</div>
												</li>
												<li>
													Position
													<div>{position}</div>
												</li>
												<li>
													PPG<div>{ppg}</div>
												</li>
											</ul>
											<ul className="info-list">
												<li>
													APG<div>{apg}</div>
												</li>
												<li>
													SPG<div>{spg}</div>
												</li>
												<li>
													RPG<div>{rpg}</div>
												</li>
											</ul>
										</div>
									</div>
								</CSSTransition>
							</TransitionGroup>
						);
					}}
				/>
			</div>
		);
	}
}
