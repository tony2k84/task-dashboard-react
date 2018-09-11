import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './redux/store';
import App from './App';
import "semantic-ui-css/semantic.min.css";
import './index.css';

import { PersistGate } from 'redux-persist/integration/react'

const provider = (
	<Provider store={store}>
      	<PersistGate loading={null} persistor={persistor}>
			{App}
		</PersistGate>
	</Provider>
);

ReactDOM.render(provider, document.getElementById('root'));
registerServiceWorker();
