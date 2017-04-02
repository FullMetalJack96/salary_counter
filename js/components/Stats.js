import React from 'react';
var LineChart = require("react-chartjs");

export default class Stats extends React.Component {

    constructor(){
      super();
      this.state = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3, 3],
            borderWidth: 1
        }]
      }
    }
    componentWillMount(){
      var that = this
      setTimeout(function () {
        console.log(that.props.statsData)
      }, 1000);
    }



    render() {
        return (
            <section class='leftPanel col-md-12 col-xl-12 col-sm-12 col-xs-12'>
              <LineChart.Line data={this.state} width="600" height="250"/>
            </section>
        );
    }
}
