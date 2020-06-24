import React from 'react';
import './App.css';

class SessionRow extends React.Component {
    is_finished;

    render() {
        return (
            <div className="SessionRow">
                <p>
                    {this.props.name}
                </p>
                <p>
                    {this.props.date}
                </p>
                <p>
                    {this.props.is_finished}
                </p>
            </div>
        );
    }
}


export default SessionRow;
