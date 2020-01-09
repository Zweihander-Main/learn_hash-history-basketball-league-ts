import * as React from 'react';
import PropTypes from 'prop-types';

interface LoadingProps {
	text: string;
}

interface LoadingState {
	text: string;
}

/**
 * Creates reusable loading indicator component
 *
 * @class      Loading (name)
 */
export default class Loading extends React.Component<
	LoadingProps,
	LoadingState
> {
	static propTypes = {
		text: PropTypes.string.isRequired,
	};

	static defaultProps = {
		text: 'Loading',
	};

	interval: NodeJS.Timeout | null = null;

	state = {
		text: this.props.text,
	};

	componentDidMount(): void {
		const stopper = this.props.text + '...';
		this.interval = setInterval(() => {
			this.state.text === stopper
				? this.setState(() => ({ text: this.props.text }))
				: this.setState(({ text }) => ({ text: text + '.' }));
		}, 300);
	}

	componentWillUnmount(): void {
		if (this.interval !== null) window.clearInterval(this.interval);
	}

	render(): JSX.Element {
		return (
			<div className="container">
				<p className="text-center">{this.state.text}</p>
			</div>
		);
	}
}
