import * as React from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../api';
import { Team as TeamType } from '../dummy-data';

interface TeamProps {
	id: string;
	children: (team: TeamType) => JSX.Element;
}

interface TeamState {
	team: TeamType | null;
}

/**
 * Render prop to fetch team data and pass it
 *
 * @class      Team
 */
export default class Team extends React.Component<TeamProps, TeamState> {
	static propTypes = {
		id: PropTypes.string.isRequired,
		children: PropTypes.func.isRequired,
	};

	state = {
		team: null as TeamType | null,
	};

	componentDidMount(): void {
		this.fetchTeam(this.props.id);
	}

	componentDidUpdate(prevProps: TeamProps): void {
		if (this.props.id !== prevProps.id) {
			this.fetchTeam(this.props.id);
		}
	}

	fetchTeam = (id: string): void => {
		this.setState((): TeamState => ({ team: null }));
		getTeam(id).then((team) => this.setState(() => ({ team })));
	};

	render(): React.ReactNode {
		const { team } = this.state;

		return team === null ? null : this.props.children(team);
	}
}
