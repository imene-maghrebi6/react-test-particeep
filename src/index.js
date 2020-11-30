import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  {Root}  from './containers';
import configureStore from './store';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import reportWebVitals from './reportWebVitals';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  <NotificationContainer />
  <Router>
    <Switch>
      <Route path="/" component={Root} />
    </Switch>
  </Router>
</Provider>,
document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
