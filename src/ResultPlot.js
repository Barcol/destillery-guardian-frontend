import React from 'react';
import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class ResultPlot extends React.Component {
    render() {
        let temperature_steam = []
        let heating_power = []
        let mass_obtained = []
        let temperature_mash = []
        let dateTime = []
        this.props.dataSet.forEach(dataRow => {
            temperature_steam.push(dataRow.temperature_steam)
            heating_power.push(dataRow.heating_power)
            mass_obtained.push(dataRow.mass_obtained)
            temperature_mash.push(dataRow.temperature_mash)
            let eventDate = new Date(dataRow.created_at)
            dateTime.push(eventDate.toLocaleTimeString('pl-PL'))
        })
        return (
            <Plot
                className={"w-100"}
                data={[
                    {
                        name: "Temp. nastawu",
                        x: dateTime,
                        y: temperature_mash,
                        type: 'scatter',
                    },
                    {
                        name: "Temp. par",
                        x: dateTime,
                        y: temperature_steam,
                        type: 'scatter',
                    },
                    {
                        name: "Moc grzałki",
                        x: dateTime,
                        y: heating_power,
                        yaxis: 'y2',
                        type: 'scatter',
                    },
                    {
                        name: "Masa uzysku",
                        x: dateTime,
                        y: mass_obtained,
                        yaxis: 'y3',
                        type: 'scatter',
                    },
                ]}

                layout={{
                    datarevision: this.props.revision,
                    autosize: true,
                    title: 'Wykres wyników pomiarowych',
                    xaxis: {tickangle: 30, autorange: 'reversed', domain: [0.0, 0.8]},
                    plot_bgcolor: '#282c34',
                    paper_bgcolor: '#282c34',
                    font: {
                        color: 'white'
                    },
                    yaxis: {
                        title: '[°C]',
                        tickfont: {color: '#ff7f0e'},
                        titlefont: {color: '#1F77B4'},
                    },
                    yaxis2: {
                        title: '[W]',
                        overlaying: 'y',
                        side: 'right',
                        tickfont: {color: '#2CA02C'},
                        titlefont: {color: '#2CA02C'},
                    },
                    yaxis3: {
                        title: '[g]',
                        side: 'right',
                        overlaying: 'y',
                        position: 0.9,
                        tickfont: {color: '#D62728'},
                        titlefont: {color: '#D62728'},
                    },
                }}
            />
        );
    }
}

export default ResultPlot;