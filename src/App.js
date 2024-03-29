import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import SessionRow from './SessionRow';

class App extends React.Component {
    state = {
        sessionBox: null,
    }
    distillation_date;

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/sessions")
            .then(response => {
                let listOfSessionRows = response.data
                    .sort((a, b) => (a.id < b.id) ? 1 : -1)
                    .map(dataRow =>
                        <SessionRow key={dataRow.id}
                                    id={dataRow.id}
                                    name={dataRow.name}
                                    date={dataRow.distillation_date}
                                    is_finished={dataRow.is_finished}
                                    loadSessionFunction={this.props.loadSessionFunction}/>)
                this.setState({sessionBox: listOfSessionRows});
            })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <img src={logo} className="btn App-logo" alt="logo"/>
                        <button className={"btn btn-secondary"}
                                onClick={() => this.props.loadSessionFunction({name: "new_session", key: null})}>
                            Rozpocznij nową sesję
                        </button>
                        <table className={"table table-dark"}>
                            <thead>
                            <tr className="Session-row">
                                <th>Nazwa</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.sessionBox}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
