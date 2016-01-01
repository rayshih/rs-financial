import {component} from 'cycle-react';
import React from 'react';
import {toDate} from '../utils';

export default component('BalanceList', (interactions, props) => {

  return props.get('data').map(d => d.rent).map(data => {

    const rows = data.map(({date, amount}, i) => {
      return (
        <tr key={i}>
          <td>{toDate(date)}</td>
          <td>{amount}</td>
        </tr>
      );
    });

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  });

});

