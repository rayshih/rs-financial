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

const App = component('App', () => {
  const data = Immutable.fromJS(rawData);

  const from = data.get('startDate');
  const to = from.clone().add(3, 'months');

  const result = predictor(data, from, to);

  const accounts = data.get('accounts').keySeq().toList();

  return Observable.just(
    <div>
      <h1>RS financial</h1>
      <p>from: {toDate(from)}</p>
      <p>to: {toDate(to)}</p>
      <BalanceList accounts={accounts} data={result} />
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
