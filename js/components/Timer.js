import React, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import Calculations from './utils/Calculations'

let offset = null,
    interval = null

export default class Timer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clock: 0,
            time: ''
        }
        var start;
    }

    componentDidMount() {
        // this.play()
    }

    componentWillUnmount() {
        this.pause()
    }

    pause() {
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    }

    play() {
        if (!interval) {
            offset = Date.now()
            interval = setInterval(this.update.bind(this), this.props.options.delay)
        }
    }

    sendTime(time) {
        {
            this.props.time(time)
        };
    }

    reset() {
        let clockReset = 0
        this.setState({clock: clockReset})
        let time = Calculations(clockReset / 1000)
        this.setState({time: time})
    }

    update() {

        this.sendTime(this.state.clock / 1000);
        let clock = this.state.clock
        clock += this.calculateOffset()
        this.setState({clock: clock})
        let time = Calculations(clock / 1000)
        this.setState({time: time})
    }

    calculateOffset() {
        let now = Date.now()
        let newOffset = now - offset
        offset = now
        return newOffset
    }

    render() {

      if(this.props.start == undefined || this.props.start == 0){
        this.start = false;
      }else{
        this.start = true;
      }
      if(this.start){
        this.play();
      }else{
        this.pause();
      }
        const timerStyle = {
            margin: "0px",
            textAlign: "center"
        };

        const secondsStyles = {
            fontSize: "1.2em",
            fontWeight: "200",
            lineHeight: "1.5",
            margin: "0px",
            color: "#fff"
        };

        return (
            <div style={timerStyle} className="react-timer">
                {this.props.start}
                <h3 style={secondsStyles} className="seconds">{this.state.time}</h3>
                <br/>
            </div>
        )
    }
}

Timer.propTypes = {
    options: PropTypes.object
}
