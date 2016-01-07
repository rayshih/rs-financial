import moment from 'moment';
import Immutable from 'immutable';
import {toDate} from './utils';

import {
  ConfigType,
  PeriodType
} from './data';

const prepareResult = (accounts) => {
  return accounts.reduce((r, a) => {
    r[a] = [];
    return r;
  }, {
    sum: [],
    cash: []
  });
};

// TODO: use the last one before start date
const prepareInitAmount = (accounts, observations) => {

  return accounts.reduce((r, a) => {
    const ob = observations.
      filter(o => o.get('account') === a).
      sortBy(a => a.date).
      last();

    if (ob) {
      r[a] = ob.get('amount');
    } else {
      r[a] = 0;
    }

    return r;
  }, {});
};

/**
 * @return result {[account]: [{amount, date}]}
 */
export default (data, from, to) => {

  const accountMap = data.get('accounts');
  const accounts = accountMap.keySeq();
  const observations = data.get('observations');
  const configs = data.get('configs');

  const checkPeriodType = (c, type) =>
    c.get('type') === ConfigType.Periodically &&
    c.get('period') === type;

  const result = prepareResult(accounts);
  const initAmount = prepareInitAmount(accounts, observations);

  let cDate = from;
  let count = 0;
  while (cDate < to) {

    const daysInMonth = cDate.clone().add(1, 'month').date(0).date();
    const cDayInMonth = cDate.date();

    const checkFixDate = c =>
      c.get('type') === ConfigType.FixDate &&
      c.get('date').diff(cDate, 'days') === 0;

    const matchMonthlyDay = c => {
      const day = (c.get('periodOffset') + daysInMonth) % daysInMonth;
      return day === cDayInMonth - 1;
    };

    accounts.forEach(a => {
      let diff = 0;

      configs.
        filter(c => c.get('account') === a).
        forEach(c => {
          const match =
            checkFixDate(c) ||
            checkPeriodType(c, PeriodType.Monthly) && matchMonthlyDay(c) ||
            checkPeriodType(c, PeriodType.Daily);

          if (match) diff += c.get('amount');
        });

      const last = count - 1 >= 0 ?
        result[a][count - 1].amount :
        initAmount[a];

      result[a].push({
        date: cDate,
        amount: last + diff
      });
    });

    const sum = accounts.
      map(a => result[a][count].amount).
      reduce((s, a) => s + a);

    result.sum.push({
      date: cDate,
      amount: sum
    });

    const cash = accounts.
      filter(a => !accountMap.getIn([a, 'isAmortized'])).
      map(a => result[a][count].amount).
      reduce((s, a) => s + a);

    result.cash.push({
      date: cDate,
      amount: cash
    });

    cDate = cDate.clone().add(1, 'day');
    count++;
  }

  return Immutable.fromJS(result);
};
