import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ResultRow from './ResultRow';

class Session extends React.Component {
    state = {
        resultBox: "",
    }
    distillation_date;
    created_at;
    temperature_1;

    componentDidMount() {
        let listOfResultRows = []
        axios
            .get(`http://127.0.0.1:8000/sessions/${this.props.id}/results`)
            .then(response => {
                let sessionSet = response.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
                sessionSet.forEach(dataRow => {
                    listOfResultRows.push(<ResultRow key={dataRow.id}
                                                     id={dataRow.id}
                                                     date={dataRow.created_at}
                                                     temperature={dataRow.temperature_1}/>);
                })
                this.setState({resultBox: listOfResultRows});
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
                                <th>ID</th>
                                <th>Data</th>
                                <th>Temperatura</th>
                            </tr>
                            {this.state.resultBox}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default Session;
