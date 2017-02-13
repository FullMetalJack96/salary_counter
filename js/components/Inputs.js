import React from 'react';
import Counter from "./Counter";

export default class Inputs extends React.Component {
    handleValueChange(e) {
        {
            this.props.setSalary(e.target.value)
        }
    }
    handleSaveSession() {
        {
            this.props.save()
        }
    }

    render() {
        return (
            <section class='leftPanel col-md-6 col-xl-6 col-sm-6 col-xs-6'>
                <input class='salaryInput' type='number' placeholder='salary per hour' onChange={this.handleValueChange.bind(this)}/>
                <button class='button button--sacnite btn startBtn' onClick={this.props.startTimer}>{this.props.btnLabel}</button>
                <button class='button button--sacnite btn startBtn2' onClick={this.handleSaveSession.bind(this)}>SAVE SESSION</button>
            </section>
        );
    }
}
