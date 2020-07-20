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
        buttonDownloadCSV: null,
        is_finished: true,
        name: '',
        status_explanation: null,
        time_interval: 30,
    }
    distillation_date;
    created_at;

    endSession() {
        axios
            .put(`http://127.0.0.1:8000/sessions/${this.props.id}/finish`)
            .then(response => {
                this.props.loadSessionFunction({name: "app", key: null})
            })
    }

    retrievePlotData() {
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
                    resultPlot: <ResultPlot dataSet={sessionSet} revision={sessionSet.length}/>
                })
            })
    }

    componentDidMount() {
        this.retrievePlotData()
        axios
            .get(`http://127.0.0.1:8000/sessions/${this.props.id}`)
            .then(response => {
                let name = response.data.name
                let is_finished = response.data.is_finished
                let status_explanation = response.data.status_explanation
                let time_interval = response.data.time_interval
                if (is_finished) {
                    status_explanation = response.data.status_explanation
                }
                setInterval(() => {
                    console.log("Refreshing component!")
                    this.retrievePlotData()
                }, response.data.time_interval*1000);
                this.setState({
                    name: name,
                    is_finished: is_finished,
                    status_explanation: status_explanation,
                    time_interval: time_interval,
                })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <div className={"row Logo-bar"}>
                            <div className={"col-lg-3"}>
                                <img src={logo} className="App-logo" alt="logo"
                                     onClick={() => this.props.loadSessionFunction({name: "app", key: null})}/>
                            </div>
                            <div className={"col-lg-6 h5"}>
                                <span>
                                    Nazwa sesji:<br/>
                                    <strong>{this.state.name}</strong>
                                </span><br/>
                                <span>
                                    Status sesji:<br/>
                                    <strong>
                                        {this.state.is_finished ? "Skończona" : "Trwająca"}
                                    </strong>
                                </span>
                                <span><strong>{this.state.status_explanation}</strong></span>
                            </div>
                            <div className={"col-lg-3"}>
                                {this.state.is_finished ? null :
                                    <>
                                        <button className={"btn btn-danger"} onClick={() => {
                                            if (window.confirm('Jesteś pewien?')) this.endSession()
                                        }}>
                                            Zakończ
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={"w-100"}>
                            {this.state.resultPlot}
                        </div>
                        <table className={"table table-dark"} id={"main-table"}>
                            <thead>
                            <tr className="Session-row">
                                <th>ID</th>
                                <th>Godzina</th>
                                <th>Temperatura nastawu [°C]</th>
                                <th>Temperatura par [°C]</th>
                                <th>Masa produktu [g]</th>
                                <th>Moc grzałki [W]</th>
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
