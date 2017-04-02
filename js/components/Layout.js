import React from 'react';
import Clock from "./Clock";
import Inputs from "./Inputs";
import Counter from "./Counter";
import Stats from "./Stats";
import $ from "jquery"


const ipcRenderer = window.require('electron').ipcRenderer;
const remote = window.require('electron').remote;
var main = remote.require("./main.js");

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyAWwkjFluxtfsB_uinWIzv7Htg_8ISBc5g",
    authDomain: "salary-counter.firebaseapp.com",
    databaseURL: "https://salary-counter.firebaseio.com",
    storageBucket: "salary-counter.appspot.com",
    messagingSenderId: "767173401750"
};

firebase.initializeApp(config);


//displayState = 0 - salary/ 1- Stats

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            salaryBase: 20,
            btnLabel: 'start',
            saveSession: false,
            displayState: 'salary',
        }
        var started = false;
    }

    changeDisplayState(viewStateNr){

      switch (viewStateNr) {
        case 0:
          this.setState({displayState: 'salary'})

          break;
        case 1:
          var data;
          this.setState({displayState: 'stats'})
          var that = this
          firebase.database().ref().on("child_added", function(snapshot, prevChildKey) {
            data = snapshot.val();
            var array = $.map(data, function(value, index){
              return [value]
            })
            that.setState({chartData: array});
          });

          break;
      }
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
    writeUserData(time, salary, date, sessionId, day) {

        firebase.database().ref('sessions/' + sessionId).set({day: day,sessionTime: time, salary_full: salary, salary_base: this.state.salaryBase, date: date, user: "Jacek"});
    }

    saveSession(time, salary) {
        if (this.state.saveSession) {

            ipcRenderer.send('async', {
                time: time,
                salary: salary
            });

            var date = new Date();
            var daysArray = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];

            var sessionId = daysArray[date.getDay()] + "_" + date.getFullYear() + "_" + date.getTime();

            this.writeUserData(time, salary, date.toLocaleString(), sessionId, daysArray[date.getDay()]);

            this.setState({saveSession: false})
        }
    }

    save() {
        this.setState({saveSession: true})
    }
    render() {
        if (this.state.displayState == 'salary') {
          return(
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 titleBar'>
                        <h2 class='button button--sacnite' onClick={() => this.changeDisplayState(0)}>Your salary</h2>
                    </div>
                    <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 statsBar'>
                        <h2 class='button button--sacnite' onClick={() => this.changeDisplayState(1)}>Your statistics</h2>
                    </div>
                </div>
                <div class='content'>
                    <div class='row'>
                        <Inputs save={this.save.bind(this)} startTimer={this.startTimer.bind(this)} setSalary={this.setSalary.bind(this)} btnLabel={this.state.btnLabel}/>
                        <Counter save={this.state.saveSession} saveSession={this.saveSession.bind(this)} timer={this.started} salaryBase={this.state.salaryBase}/>
                    </div>
                </div>
            </div>
            );
        }else{
          return(
            <div class='container-fluid'>
              <div class='row'>
                  <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 titleBar'>
                      <h2 class='button button--sacnite' onClick={() => this.changeDisplayState(0)}>Your salary</h2>
                  </div>
                  <div class='col-md-6 col-xl-6 col-sm-6 col-xs-6 statsBar'>
                      <h2 class='button button--sacnite' onClick={() => this.changeDisplayState(1)}>Your statistics</h2>
                  </div>
              </div>
            <Stats statsData={this.state.chartData}></Stats>
            </div>
            );
        }
    }
}
