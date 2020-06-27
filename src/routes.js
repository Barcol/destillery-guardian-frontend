import React from 'react';
import { Route} from 'react-router';

import App from './App';
import SessionRow from "./SessionRow";
import Session from "./Session";


export default (
    <Route path="/" component={App}>
        <Route path="/some/where" component={SessionRow} />
        <Route path="/some" component={Session} />
    </Route>
);