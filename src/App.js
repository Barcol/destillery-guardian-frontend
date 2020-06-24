import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends React.Component {
  state= {
    sessionName: "",
    sessionDate: ""
  }
  distillation_date;
  componentDidMount() {
    axios
        .get("http://127.0.0.1:8000/sessions")
        .then(response => this.setState({sessionName: response.data[0].name,
          sessionDate: response.data[0].distillation_date}))
  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              {this.state.sessionName}
            </p>
            <p>
              {this.state.sessionDate}
            </p>
          </header>
        </div>
    );
  }
}


export default App;
