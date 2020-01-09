import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	RouteComponentProps,
} from 'react-router-dom';
import Navbar from './Navbar';
import Loading from './Loading';
import DynamicImport from './DynamicImport';

const Home = (props: RouteComponentProps): JSX.Element => (
	<DynamicImport
		load={(): Promise<typeof import('./Home')> => import('./Home')}
	>
		{(Component): React.ReactNode =>
			Component === null ? <Loading /> : <Component {...props} />
		}
	</DynamicImport>
);

const Players = (props: RouteComponentProps): JSX.Element => (
	<DynamicImport
		load={(): Promise<typeof import('./Players')> => import('./Players')}
	>
		{(Component): React.ReactNode =>
			Component === null ? <Loading /> : <Component {...props} />
		}
	</DynamicImport>
);

const Teams = (props: RouteComponentProps): JSX.Element => (
	<DynamicImport
		load={(): Promise<typeof import('./Teams')> => import('./Teams')}
	>
		{(Component): React.ReactNode =>
			Component === null ? <Loading /> : <Component {...props} />
		}
	</DynamicImport>
);

const TeamPage = (props: RouteComponentProps): JSX.Element => (
	<DynamicImport
		load={(): Promise<typeof import('./TeamPage')> => import('./TeamPage')}
	>
		{(Component): React.ReactNode =>
			Component === null ? <Loading /> : <Component {...props} />
		}
	</DynamicImport>
);

const Articles = (props: RouteComponentProps): JSX.Element => (
	<DynamicImport
		load={(): Promise<typeof import('./Articles')> => import('./Articles')}
	>
		{(Component): React.ReactNode =>
			Component === null ? <Loading /> : <Component {...props} />
		}
	</DynamicImport>
);

/**
 * Renders all routes
 *
 * @class      App
 * @return     {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/players" component={Players} />
					<Route path="/teams" component={Teams} />
					<Route path="/:teamId" exact component={TeamPage} />
					<Route path="/:teamId/articles" component={Articles} />
					<Route
						render={(): JSX.Element => (
							<h1 className="text-center">Four oh Four.</h1>
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
