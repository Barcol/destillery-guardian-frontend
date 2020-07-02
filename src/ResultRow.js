import React from 'react';
import './App.css';

class ResultRow extends React.Component {
    temperature;

    render() {
        return (
            <tr className="Session-row">
                <th>
                    {this.props.id}
                </th>
                <th>
                    {this.props.date}
                </th>
                <th>
                    {this.props.temperature}
                </th>
            </tr>
        );
    }
}


export default ResultRow;
