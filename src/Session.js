import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ResultRow from './ResultRow';
import ResultPlot from "./ResultPlot";

class Session extends React.Component {
    state = {
        resultBox: null,
        resultPlot: null,
    }
    distillation_date;
    created_at;

    componentDidMount() {
        axios
            .get(`http://127.0.0.1:8000/sessions/${this.props.id}/results`)
            .then(response => {
                let sessionSet = response.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
                let listOfResultRows = sessionSet.map(dataRow =>
                    <ResultRow key={dataRow.id}
                               id={dataRow.id}
                               date={dataRow.created_at}
                               temperature_steam={dataRow.temperature_steam}
                               heating_power={dataRow.heating_power}
                               mass_obtained={dataRow.mass_obtained}
                               temperature_mash={dataRow.temperature_mash}/>)
                this.setState({resultBox: listOfResultRows});
                this.setState({resultPlot: <ResultPlot dataSet={sessionSet}/>})
            })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"
                             onClick={() => this.props.loadSessionFunction(null)}/>
                        <div>
                            {this.state.resultPlot}
                        </div>
                        <table className={"table table-dark"}>
                            <thead>
                            <tr className="Session-row">
                                <th>ID</th>
                                <th>Data</th>
                                <th>Temperatura nastawu</th>
                                <th>Temperatura par</th>
                                <th>Masa produktu</th>
                                <th>Moc grzałki</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.resultBox}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default Session;
