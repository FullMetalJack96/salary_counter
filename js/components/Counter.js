import React from 'react';

export default class Counter extends React.Component {
  
    render() {
        return (
            <section class='rightPanel col-md-6 col-xl-6 col-sm-6 col-xs-6'>
                <div class='salaryCounter'>{this.props.salaryCount}</div>
                <div class='elapsedTime'>{this.props.elapsedTimeM}</div>
            </section>
        );
    }
}
