import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type importSample = any;

interface DynamicImportProps {
	load: () => Promise<importSample>;
	children: (component: React.FC<RouteComponentProps>) => React.ReactNode;
}

interface DynamicImportState {
	component: React.FC<RouteComponentProps> | null;
}

/**
 * Render prop to allow for dynamic imports in code splitting uses.
 *
 * @class      DynamicImport (name)
 */
export default class DynamicImport extends React.Component<
	DynamicImportProps,
	DynamicImportState
> {
	state = {
		component: null as React.FC<RouteComponentProps> | null,
	};

	constructor(props: DynamicImportProps) {
		super(props);
		this.props.load().then((mod: importSample) =>
			this.setState(
				(): DynamicImportState => ({
					component: mod.default,
				})
			)
		);
	}

	render(): React.ReactNode {
		const { component } = this.state;
		return component !== null ? this.props.children(component) : null;
	}
}
