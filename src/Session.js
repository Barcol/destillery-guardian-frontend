import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ResultRow from './ResultRow';
import ResultPlot from "./ResultPlot";
import {CSVLink} from "react-csv";

class Session extends React.Component {
    state = {
        resultBox: null,
        resultPlot: null,
        buttonDownloadCSV: null
    }
    distillation_date;
    created_at;

    componentDidMount() {
        axios
            .get(`http://127.0.0.1:8000/sessions/${this.props.id}/results`)
            .then(response => {
                let sessionSet = response.data.sort((a, b) => (a.id < b.id) ? 1 : -1)
                let csvData = [["ID", "Godzina", "Temperatura par", "Moc grzałki",
                    "Masa produktu", "Temperatura nastawu"]].concat(sessionSet.map(dataRow => [dataRow.id,
                    dataRow.created_at,
                    dataRow.temperature_steam,
                    dataRow.heating_power,
                    dataRow.mass_obtained,
                    dataRow.temperature_mash]))
                console.log(this.state.buttonDownloadCSV)
                console.table(this.state.buttonDownloadCSV)
                let listOfResultRows = sessionSet.map(dataRow =>
                    <ResultRow key={dataRow.id}
                               id={dataRow.id}
                               date={dataRow.created_at}
                               temperature_steam={dataRow.temperature_steam}
                               heating_power={dataRow.heating_power}
                               mass_obtained={dataRow.mass_obtained}
                               temperature_mash={dataRow.temperature_mash}/>)
                this.setState({
                    resultBox: listOfResultRows,
                    buttonDownloadCSV: <CSVLink className={"btn btn-secondary"} data={csvData}>Pobierz CSV</CSVLink>,
                    resultPlot: <ResultPlot dataSet={sessionSet}/>
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"
                             onClick={() => this.props.loadSessionFunction({name: "app", key: null})}/>
                        <div className={"w-100"}>
                            {this.state.resultPlot}
                        </div>
                        <table className={"table table-dark"} id={"main-table"}>
                            <thead>
                            <tr className="Session-row">
                                <th>ID</th>
                                <th>Godzina</th>
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
                        {this.state.buttonDownloadCSV}
                    </div>
                </div>
            </div>
        );
    }
}


export default Session;
