const Cycle = require('cycle-react');
const React = require('react');
const ReactDOM = require('react-dom');

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

const Hello = Cycle.component('Hello', function computer(interactions) {
  return interactions.get('OnNameChanged')
    .map(ev => ev.target.value)
    .startWith('')
    .map(name =>
      <div>
        <label>Name:</label>
        <input type="text" onChange={interactions.listener('OnNameChanged')} />
        <hr />
        <h1>Hello {name}</h1>
      </div>
    );
});

ReactDOM.render(
  <MyComponent />,
  // <Hello />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
