import React from 'react';
import './App.css';

class SessionRow extends React.Component {
    is_finished;

    render() {
        return (
            <tr className="Session-row">
                <th>
                    {this.props.name}
                </th>
                <th>
                    {this.props.date}
                </th>
                <th className={"btn " + (this.props.is_finished ? "btn-primary" : "btn-success")}
                    onClick={() => this.props.loadSessionFunction({name: "session", key: this.props.id})}>
                    {this.props.is_finished ? "Zakończono" : "Trwa"}
                </th>
            </tr>
        );
    }
}


export default SessionRow;
