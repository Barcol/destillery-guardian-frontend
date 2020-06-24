import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import SessionRow from './SessionRow';

class App extends React.Component {
    state = {
        sessionBox: "",
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/sessions")
            .then(function (response) {
                response.data.forEach(dataRow => {
                    this.sessionBox.append(<SessionRow name={dataRow.name}
                                                       date={dataRow.date}
                                                       is_finished={dataRow.is_finished}/>);
                })
            })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {this.state.sessionBox}
                    </p>

                </header>
            </div>
        );
    }
}


export default App;
