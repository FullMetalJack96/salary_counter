import React from 'react';
import Timer from "./Timer";

export default class Counter extends React.Component {
  constructor(){
    super();
    this.state = {
      salaryCounter : 1111
    }
  }

  calculateSalary(time){
    this.setState({
      salaryCounter: Math.round((this.props.salaryBase * (time/3600)*100))/100
    })
  }
  

    render() {

      let OPTIONS = { delay: 1000}
        return (
            <section class='rightPanel col-md-6 col-xl-6 col-sm-6 col-xs-6'>
                <div class='salaryCounter'><span>{this.state.salaryCounter} PLN</span></div>
                <div class='elapsedTime'>
                  <Timer options={OPTIONS} time={this.calculateSalary.bind(this)} start={this.props.timer}/>
                </div>
            </section>
        );
    }
}
