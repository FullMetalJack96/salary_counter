import React from 'react';
import Clock from "./Clock";
import Inputs from "./Inputs";
import Counter from "./Counter";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
          salaryBase: 20,
          btnLabel: 'start'
        }
        var started = false;
    }

    startTimer() {
        this.started = !this.started;
        if(this.started){
          this.setState({
            btnLabel: 'pause'
          })
        }else{
          this.setState({
            btnLabel: 'start'
          })
        }
    }

    setSalary(value){
        this.setState({
          salaryBase: value
        })
    }
    render() {
        return (
            <div class='container-fluid'>
              <div class='row'>
                <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 titleBar'>
                <h2 class='button button--sacnite'>Your salary</h2>
                </div>
                <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 statsBar'>
                <h2 class='button button--sacnite'>Your statistics</h2>
                </div>
              </div>
                <div class='row'>
                    <Inputs startTimer={this.startTimer.bind(this)} setSalary={this.setSalary.bind(this)} btnLabel={this.state.btnLabel}/>
                    <Counter timer={this.started} salaryBase={this.state.salaryBase}/>
                </div>
            </div>
        );
    }
}
