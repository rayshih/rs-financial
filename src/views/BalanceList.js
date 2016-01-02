import {component} from 'cycle-react';
import React from 'react';
import {toDate} from '../utils';
import {Observable} from 'rx';

export default component('BalanceList', (interactions, props) => {

  return Observable.combineLatest(
    props.get('accounts'),
    props.get('data'),
    (accounts, data) => {

      const date = data.get(accounts.first()).map(r => r.get('date'));
      const amountsInList = accounts.unshift('sum').map(a => (
        data.get(a).map(r => r.get('amount'))));

      const rows = date.zip(...amountsInList).
        map(([date, ...amounts], i) => {
          const amountEs = amounts.map((a, j) => <td key={j}>{a}</td>);

          return (
            <tr key={i}>
              <td>{toDate(date)}</td>
              {amountEs}
            </tr>
          );
        });

      const headers = accounts.unshift('sum').unshift('Date').
        map((name, i) => <th key={i}>{name}</th>);

      return (
        <table>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      );

    }
  );

});

