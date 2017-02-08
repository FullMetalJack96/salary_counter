import React from 'react';
import Timer from "./Timer";
import Inputs from "./Inputs";
import Counter from "./Counter";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            hour: 11,
            minute: 11,
            second: 11,
            salary: 22,
            elapsedTimeM: 0,
        };
        var started = false
        var elapsedM = 1;
    }

    drawTime() {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        this.setState({
            hour: (hour < 10)
                ? '0' + hour
                : hour,
            minute: (minute < 10)
                ? '0' + minute
                : minute,
            second: (second < 10)
                ? '0' + second
                : second
        })
    }

    setSalary(value) {
        console.log(value)
    }

    startTimer() {
        this.started = !this.started;
    }

    countSalary(salaryBase, elapsedTime) {
        this.setState({
            salary: salaryBase * elapsedTime
        })
    }


    render() {
        setInterval(() => {
            this.drawTime();
        }, 1000);

        return (
            <div class='container-fluid'>
                <Timer second={this.state.second} minute={this.state.minute} hour={this.state.hour}/>
                <div class='row'>
                    <Inputs setSalary={this.setSalary.bind(this)} startTimer={this.startTimer.bind(this)}/>
                    <Counter elapsedTimeM={this.state.elapsedTimeM} salaryCount={this.state.salary} started={this.started}/>
                </div>
            </div>
        );
    }
}
