import React from 'react';

export default class Clock extends React.Component {
    render() {
        return (
            <div class='row'>
              <div class='col-md-12 timer'>
                <h1>
                  {this.props.hour}:{this.props.minute}:{this.props.second}
                </h1>
              </div>
            </div>
        );
    }
}
