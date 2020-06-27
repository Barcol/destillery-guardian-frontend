import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
import routes from './routes';
import createHistory from '../node_modules/history/main';

ReactDOM.render(
    <Router routes={routes} history={createHistory()}/>,
    document.getElementById('root')
);

serviceWorker.unregister();
