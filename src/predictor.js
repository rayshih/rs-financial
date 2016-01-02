import moment from 'moment';
import Immutable from 'immutable';
import {toDate} from './utils';

/**
 * @return result {[account]: [{amount, date}]}
 */
export default (data, from, to) => {

  const accounts = data.get('accounts').keySeq();
  const configs = data.get('configs');

  const result = {};
  accounts.forEach(a => {
    result[a] = [];
  });
  result.sum = [];

  let cAmounts = {};
  accounts.forEach(a => {
    cAmounts[a] = 0;
  });

  let cDate = from;
  let count = 0;
  while (cDate < to) {

    const daysInMonth = cDate.clone().add(1, 'month').date(0).date();
    const cDayInMonth = cDate.date();

    const matchDay = c => {
      const day = (c.get('periodOffset') + daysInMonth) % daysInMonth;
      return day === cDayInMonth - 1;
    };

    configs.forEach(c => {
      const account = c.get('account');

      if (matchDay(c)) {
        const amount = c.get('amount');
        cAmounts[account] += amount;
      }

      result[account].push({
        date: cDate,
        amount: cAmounts[account]
      });
    });

    // TODO
    const sum = accounts.
      map(a => result[a][count].amount).
      reduce((s, a) => s + a);

    result.sum.push({
      date: cDate,
      amount: sum
    });

    cDate = cDate.clone().add(1, 'day');
    count++;
  }

  return Immutable.fromJS(result);
};
