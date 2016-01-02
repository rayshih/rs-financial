import moment from 'moment';
import Immutable from 'immutable';
import {toDate} from './utils';

import {PeriodType} from './data';

/**
 * @return result {[account]: [{amount, date}]}
 */
export default (data, from, to) => {

  const accounts = data.get('accounts').keySeq();

  const configs = data.get('configs');
  const configsByPeriod = (type) => configs.
    filter(a => a.get('period') === type);

  const monthlyConfigs = configsByPeriod(PeriodType.Monthly);
  const dailyConfigs = configsByPeriod(PeriodType.Daily);

  const observations = data.get('observations');

  const result = {};
  accounts.forEach(a => {
    result[a] = [];
  });
  result.sum = [];

  let cAmounts = {};
  accounts.forEach(a => {
    const obs = observations.filter(o => o.get('account') === a);

    if (obs.isEmpty()) {
      cAmounts[a] = 0;
    } else {
      cAmounts[a] = obs.sortBy(a => a.date).last().get('amount');
    }
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

    monthlyConfigs.forEach(c => {
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

    dailyConfigs.forEach(c => {
      const account = c.get('account');
      const amount = c.get('amount');
      cAmounts[account] += amount;

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
