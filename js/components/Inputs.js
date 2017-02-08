import React from 'react';

export default class Inputs extends React.Component {
  handleValueChange(e){
    
    {this.props.setSalary(e.target.value)}
  }
    render() {
        return (
            <section class='leftPanel col-md-6 col-xl-6 col-sm-6 col-xs-6'>
                <input class='salaryInput' type='number' onChange={this.handleValueChange.bind(this)}/>
                <button class='btn btn-success startBtn' onClick={this.props.startTimer}>START</button>
            </section>
        );
    }
}
