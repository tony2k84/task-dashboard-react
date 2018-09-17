import React from 'react';
import ReactDOM from 'react-dom';
import { store, history, persistor } from './redux/store';
import { Route } from 'react-router';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

import registerServiceWorker from './registerServiceWorker';
import "semantic-ui-css/semantic.min.css";
import './index.css';
import Home from './pages/home';
import Login from './pages/login';


const provider = (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ConnectedRouter history={history}>
				<div style={{ minHeight: 600, height: '100vh' }}>
					<Route exact path="/" component={Login} />
					<Route path="/home" component={Home} />
				</div>
			</ConnectedRouter>
		</PersistGate>
	</Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
