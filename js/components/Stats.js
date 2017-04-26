import React from 'react';
var LineChart = require("react-chartjs");

export default class Stats extends React.Component {

    constructor(){
      super();
      this.state = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0, 0],
        }]
      }
      var salary = 0;
      var hours = 0;
    }
    componentWillMount(){
      var that = this
      var mondayData = 0, tuesdayData = 0, wednesdayData = 0, thursdayData = 0, fridayData = 0, saturdayData = 0, sundayData = 0
      var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      setTimeout(function () {
        var salary = 0;
        var hours = 0;
        for (let value of that.props.statsData) {
          console.log(monthArray[parseInt(value.date.split('.')[1])-1])
          salary+=value.salary_full
          hours+=value.sessionTime / (60 * 60)
          that.hours = Math.round(hours * 100) / 100
          that.salary = Math.ceil(salary);
              switch (value.day) {
                case "Monday":
                  mondayData += value.sessionTime / (60 * 60)
                  break;
                case "Tuesday":
                  tuesdayData += value.sessionTime / (60 * 60)
                  break;
                case "Wednesday":
                  wednesdayData += value.sessionTime / (60 * 60)
                  break;
                case "Thursday":
                  thursdayData += value.sessionTime / (60 * 60)
                  break;
                case "Friday":
                  fridayData += value.sessionTime / (60 * 60)
                  break;
                case "Saturday":
                  saturdayData += value.sessionTime / (60 * 60)
                  break;
                case "Sunday":
                  sundayData += value.sessionTime / (60 * 60)
                  break;
                default:

              }
        }
        that.setState({
            datasets: [
                {
                    data: [mondayData, tuesdayData, wednesdayData, thursdayData, fridayData, saturdayData, sundayData]
                }
            ]
        })
      }, 1000);
    }

    render() {
      var those = this
        return (
          <div>
            <section class='statsPanelLeft col-md-6 col-xl-6 col-sm-6 col-xs-6'>
              <div class='monthStats'>

                <span>Salary: {this.salary} zł</span>
              <br/>
                <span>Hours: {this.hours} h</span>
              </div>
              <div class='yearStats'>Year</div>
            </section>
            <section class='statsPanelRight col-md-6 col-xl-6 col-sm-6 col-xs-6'>
              <LineChart.Line data={this.state} width="350" height="180"/>
          </section>
        </div>
        );
    }
}
