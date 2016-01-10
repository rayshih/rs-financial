import './css/bootstrap.min.css';
import {component} from 'cycle-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Observable} from 'rx';
import rawData from './data';
import moment from 'moment';
import BalanceList from './views/BalanceList';
import {toDate} from './utils';
import predictor from './predictor';
import Immutable from 'immutable';

import {
  Grid,
  Navbar
} from 'react-bootstrap';

const App = component('App', () => {
  const data = Immutable.fromJS(rawData);

  const from = data.get('startDate');
  const to = from.clone().add(6, 'months');

  const result = predictor(data, from, to);

  const accounts = data.get('accounts');

  const {Header, Brand, Toggle, Collapse} = Navbar;

  return Observable.just(
    <div>

      <Navbar>
        <Header>
          <Brand>RS financial</Brand>
        </Header>
      </Navbar>

      <Grid>
        <p>from: {toDate(from)}</p>
        <p>to: {toDate(to)}</p>
        <BalanceList accounts={accounts} data={result} />
      </Grid>

    </div>
  );
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
