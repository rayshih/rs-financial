import moment from 'moment';
import {toDate} from './utils';

export default (configs, from, to) => {

  const data = [];
  let cAmount = 0;

  let cDate = from;
  while (cDate < to) {

    const daysInMonth = cDate.clone().add(1, 'month').date(0).date();
    const cDayInMonth = cDate.date();

    cAmount = configs.filter(c => {
      const day = (c.get('periodOffset') + daysInMonth) % daysInMonth;
      return day === cDayInMonth;
    }).map(c => c.get('amount')).reduce((s, a) => s + a, cAmount);

    data.push({
      date: cDate,
      amount: cAmount
    });

    cDate = cDate.clone().add(1, 'day');
  }

  return data;
};
