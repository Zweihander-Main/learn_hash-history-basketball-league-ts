import * as React from 'react';
import { Redirect, Link, RouteComponentProps, match } from 'react-router-dom';
import { getTeamNames, getTeamsArticles } from '../api';
import { TeamsArticle, Team as TeamType } from '../dummy-data';
import TeamLogo from './TeamLogo';
import Team from './Team';
import Loading from './Loading';
import slug from 'slug';

interface TeamPageParams {
	teamId: string;
}

interface TeamPageProps {
	match: match<TeamPageParams>;
}

interface TeamPageState {
	loading: boolean;
	teamNames: Array<string>;
	articles: Array<TeamsArticle>;
}

/**
 * Fetches team data and creates information page with data
 *
 * @class      TeamPage
 */
export default class TeamPage extends React.Component<
	RouteComponentProps & TeamPageProps,
	TeamPageState
> {
	state = {
		loading: true,
		teamNames: [] as Array<string>,
		articles: [],
	};

	componentDidMount(): void {
		Promise.all([
			getTeamNames(),
			getTeamsArticles(this.props.match.params.teamId),
		]).then(
			([teamNames, articles]: [Array<string>, Array<TeamsArticle>]) => {
				this.setState(() => ({
					teamNames,
					articles,
					loading: false,
				}));
			}
		);
	}
	render(): JSX.Element {
		const { loading, teamNames, articles } = this.state;
		const { match } = this.props;

		const { teamId } = match.params;

		if (loading === false && teamNames.includes(teamId) === false) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<Team id={teamId}>
					{(team: TeamType): JSX.Element =>
						team === null ? (
							<Loading />
						) : (
							<div className="panel">
								<TeamLogo id={teamId} />
								<h1 className="medium-header">{team.name}</h1>
								<h4 style={{ margin: 5 }}>
									<Link
										style={{ cursor: 'pointer' }}
										to={{
											pathname: '/players',
											search: `?teamId=${teamId}`,
										}}
									>
										View Roster
									</Link>
								</h4>
								<h4>Championships</h4>
								<ul className="championships">
									{team.championships.map(
										(ship: number): JSX.Element => (
											<li key={ship}>{ship}</li>
										)
									)}
								</ul>
								<ul
									className="info-list row"
									style={{ width: '100%' }}
								>
									<li>
										Established<div>{team.established}</div>
									</li>
									<li>
										Manager<div>{team.manager}</div>
									</li>
									<li>
										Coach<div>{team.coach}</div>
									</li>
									<li>
										Record
										<div>
											{team.wins}-{team.losses}
										</div>
									</li>
								</ul>
								<h2 className="header">Articles</h2>
								<ul className="articles">
									{articles.map(
										(
											article: TeamsArticle
										): JSX.Element => (
											<li key={article.id}>
												<Link
													to={`${
														match.url
													}/articles/${slug(
														article.title
													)}`}
												>
													<h4 className="article-title">
														{article.title}
													</h4>
													<div className="article-date">
														{article.date.toLocaleDateString()}
													</div>
												</Link>
											</li>
										)
									)}
								</ul>
							</div>
						)
					}
				</Team>
			</div>
		);
	}
}
