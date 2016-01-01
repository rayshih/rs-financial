import {component} from 'cycle-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {Observable} from 'rx';
import rawData from './data';
import moment from 'moment';
import BalanceList from './views/BalanceList';
import {toDate} from './utils';
import predictor from './predictor';
import Immutable from 'Immutable';

const App = component('App', () => {

  const from = moment();
  const to = moment().add(3, 'months');

  const data = Immutable.fromJS(rawData);
  const result = predictor(data, from, to);

  return Observable.just(
    <div>
      <h1>RS financial</h1>
      <p>from: {toDate(from)}</p>
      <p>to: {toDate(to)}</p>
      <BalanceList data={result} />
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
