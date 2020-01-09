import * as React from 'react';
import { Route, RouteComponentProps, match } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamsArticles } from '../api';
import Article from './Article';
import Loading from './Loading';
import { TeamsArticle, Article as ArticleType } from '../dummy-data';

interface ArticlesParams {
	teamId: string;
}

interface ArticlesProps {
	match: match<ArticlesParams>;
}

interface ArticlesState {
	teamsArticles: Array<string>;
	loading: boolean;
}

/**
 * Renders list of articles and individual article contents
 *
 * @class      Articles
 */
export default class Articles extends React.Component<
	RouteComponentProps & ArticlesProps,
	ArticlesState
> {
	state = {
		teamsArticles: [] as Array<string>,
		loading: true,
	};

	componentDidMount(): void {
		getTeamsArticles(this.props.match.params.teamId).then(
			(teamsArticles: Array<TeamsArticle>) => {
				this.setState(
					(): ArticlesState => ({
						loading: false,
						teamsArticles: teamsArticles.map(
							(article: TeamsArticle) => article.title
						),
					})
				);
			}
		);
	}

	render(): JSX.Element {
		const { loading, teamsArticles } = this.state;
		const { params, url } = this.props.match;
		const { teamId } = params;

		return loading === true ? (
			<Loading />
		) : (
			<div className="container two-column">
				<Sidebar
					loading={loading}
					title="Articles"
					list={teamsArticles}
					{...this.props}
				/>

				<Route
					path={`${url}/:articleId`}
					render={({ match }): JSX.Element => (
						<Article
							articleId={match.params.articleId}
							teamId={teamId}
						>
							{(article: ArticleType): JSX.Element =>
								!article ? (
									<Loading />
								) : (
									<div className="panel">
										<article
											className="article"
											key={article.id}
										>
											<h1 className="header">
												{article.title}
											</h1>
											<p>{article.body}</p>
										</article>
									</div>
								)
							}
						</Article>
					)}
				/>
			</div>
		);
	}
}
