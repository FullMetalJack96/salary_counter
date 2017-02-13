import React from 'react';
import Clock from "./Clock";
import Inputs from "./Inputs";
import Counter from "./Counter";

const ipcRenderer = window.require('electron').ipcRenderer;
const remote = window.require('electron').remote;
var main = remote.require("./main.js");

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            salaryBase: 20,
            btnLabel: 'start',
            saveSession: false
        }
        var started = false;
    }

    startTimer() {
        this.started = !this.started;
        if (this.started) {
            this.setState({btnLabel: 'pause'})
        } else {
            this.setState({btnLabel: 'start'})
        }
    }

    setSalary(value) {
        this.setState({salaryBase: value})
    }

    saveSession(time, salary) {
        if (this.state.saveSession) {
            ipcRenderer.send('async', {
                time: time,
                salary: salary
            });
            this.setState({saveSession: false})
        }
    }

    save() {
        this.setState({saveSession: true})
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
                    <Inputs save={this.save.bind(this)} startTimer={this.startTimer.bind(this)} setSalary={this.setSalary.bind(this)} btnLabel={this.state.btnLabel}/>
                    <Counter save={this.state.saveSession} saveSession={this.saveSession.bind(this)} timer={this.started} salaryBase={this.state.salaryBase}/>
                </div>
            </div>
        );
    }
}
