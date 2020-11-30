import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Movies } from '../pages';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Movies} />
      </Switch>
    </div>
  );
}