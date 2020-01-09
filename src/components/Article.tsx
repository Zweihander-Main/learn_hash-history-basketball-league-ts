import * as React from 'react';
import PropTypes from 'prop-types';
import { getArticle } from '../api';
import { Article as ArticleType } from '../dummy-data';

interface ArticleProps {
	teamId: string;
	articleId: string;
	children: (article: ArticleType) => React.ReactNode;
}

interface ArticleState {
	article: ArticleType | null;
}

/**
 * Render prop to fetch article and pass it as state to children
 *
 * @class      Article
 */
export default class Article extends React.Component<ArticleProps> {
	static propTypes = {
		teamId: PropTypes.string.isRequired,
		articleId: PropTypes.string.isRequired,
		children: PropTypes.func.isRequired,
	};

	state = {
		article: null as ArticleType | null,
	};

	componentDidMount(): void {
		const { teamId, articleId } = this.props;
		this.getArticle(teamId, articleId);
	}

	componentDidUpdate(prevProps: ArticleProps): void {
		if (this.props.articleId !== prevProps.articleId) {
			this.getArticle(this.props.teamId, this.props.articleId);
		}
	}

	getArticle = (teamId: string, articleId: string): void => {
		this.setState(() => ({
			article: null,
		}));

		getArticle(teamId, articleId).then((article: ArticleType): void =>
			this.setState(() => ({ article }))
		);
	};

	render(): React.ReactNode {
		return this.state.article !== null
			? this.props.children(this.state.article)
			: null;
	}
}
