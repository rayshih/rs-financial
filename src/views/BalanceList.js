import {component} from 'cycle-react';
import React from 'react';
import {toDate} from '../utils';
import {Observable} from 'rx';
import {Table} from 'react-bootstrap';

export default component('BalanceList', (interactions, props) => {

  return Observable.combineLatest(
    props.get('accounts'),
    props.get('data'),
    (accounts, data) => {

      const accountNames = accounts.keySeq().toList();

      const date = data.get(accountNames.first()).map(r => r.get('date'));

      const metaAccount = ['sum', 'cash'];
      const amountsInList = accountNames.unshift(...metaAccount).map(a => (
        data.get(a).map(r => r.get('amount'))));

      const rows = date.zip(...amountsInList).
        map(([date, ...amounts], i) => {
          const amountEs = amounts.map((a, j) => {
            const warning = {color: 'GoldenRod'};
            const alert = {color: 'Red'};

            let style = null;
            if (j < metaAccount.length) {
              if (a < 10000 && a >= 5000) style = warning;
              if (a < 5000) style = alert;
            }

            return <td key={j} style={style}>{a}</td>;
          });

          return (
            <tr key={i}>
              <td>{toDate(date)}</td>
              {amountEs}
            </tr>
          );
        });

      const headers = accountNames.unshift(...metaAccount).unshift('Date').
        map((name, i) => {
          const a = accounts.get(name);
          if (a && a.get('isAmortized')) {
            return <th key={i}>{name}(am)</th>;
          }

          return <th key={i}>{name}</th>;
        });

      return (
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {headers}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      );

    }
  );

});

