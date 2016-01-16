import React from 'react';
import {Line} from 'react-chartjs';
import {component} from 'cycle-react';

const rand = (min, max, n) => {
  const oneRand = () => Math.random() * (max - min) + min;
  const r = [];

  for (let i = 0; i < n; i++) {
    r.push(oneRand());
  }

  return r;
};

export default component('LineChart', (interactions, props) => {
  return props.get('data').map((data) => {

    const weekly = d => d.get('date').isoWeekday() === 1;

    const sampledCash = data.get('cash').filter(weekly);
    const sampledSum = data.get('sum').filter(weekly);

    console.log(sampledCash.toJS());

    const chartData = {
      labels: sampledCash.map(d => d.get('date').format('YYYY-MM-DD')).toJS(),
      datasets: [
        {
          label: "Sum",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: sampledSum.map(d => d.get('amount')).toJS()
        },

        {
          label: "Cash",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: sampledCash.map(d => d.get('amount')).toJS()
        }
      ]
    };

    const chartOptions = {};

    return (
      <Line
        data={chartData}
        options={chartOptions}
        width="1100"
        height="250"/>
    );
  })
});
