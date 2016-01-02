import {component} from 'cycle-react';
import React from 'react';
import {toDate} from '../utils';
import {Observable} from 'rx';

export default component('BalanceList', (interactions, props) => {

  return Observable.combineLatest(
    props.get('accounts'),
    props.get('data'),
    (accounts, data) => {

      const rows = data.rent.map(({date, amount}, i) => {
        return (
          <tr key={i}>
            <td>{toDate(date)}</td>
            <td>{amount}</td>
          </tr>
        );
      });

      const headers = accounts.unshift('Date').
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

