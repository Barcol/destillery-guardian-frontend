import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import SessionRow from './SessionRow';

class App extends React.Component {
    state = {
        sessionBox: "",
    }
    distillation_date;

    componentDidMount() {
        let listOfSessionRows = []
        axios
            .get("http://127.0.0.1:8000/sessions")
            .then(response => {
                let sessionSet = response.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
                sessionSet.forEach(dataRow => {
                    listOfSessionRows.push(<SessionRow key={dataRow.id}
                                                       name={dataRow.name}
                                                       date={dataRow.distillation_date}
                                                       is_finished={dataRow.is_finished}/>);
                })
                this.setState({sessionBox: listOfSessionRows});
            })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <table className={"table table-dark"}>
                            <tr className="Session-row">
                                <th>Nazwa</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                            {this.state.sessionBox}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
