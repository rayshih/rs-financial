import React from 'react';

var LineChart = require("react-chartjs").Line;

const rand = (min, max, n) => {
  const oneRand = () => Math.random() * (max - min) + min;
  const r = [];

  for (let i = 0; i < n; i++) {
    r.push(oneRand());
  }

  return r;
};

var MyComponent = React.createClass({
  render: function() {
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: rand(32, 100, 7)
      }, {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: rand(32, 100, 7)
      }]
    };

    const chartOptions = {};

    return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>;
  }
});

export default MyComponent;
