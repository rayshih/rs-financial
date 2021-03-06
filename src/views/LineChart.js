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

    const sampledCashWithO = data.get('cash+o').filter(weekly);
    const sampledSumWithO = data.get('sum+o').filter(weekly);

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
        },

        {
          label: "Sum+O",
          fillColor: 'rgba(0, 0, 0, 0)',
          strokeColor: 'Pink',
          pointColor: 'Pink',
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke:  'Pink',
          data: sampledSumWithO.map(d => d.get('amount')).toJS()
        },

        {
          label: "Cash+O",
          fillColor: 'rgba(0, 0, 0, 0)',
          strokeColor: 'Orange',
          pointColor: 'Orange',
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: 'Orange',
          data: sampledCashWithO.map(d => d.get('amount')).toJS()
        },

        {
          label: "Zero Line",
          fillColor: 'rgba(0, 0, 0, 0)',
          strokeColor: 'red',
          pointColor: 'red',
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: 'red',
          data: sampledCash.map(d => 0).toJS()
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
  });
});
