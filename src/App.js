import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


function getSessionsData() {
  const sessions_url = `http://127.0.0.1:8000/sessions`
  axios.get(sessions_url).then(response => {
    if (response.status === 200) {
      console.log(response.data);
      return response.data[0]
    }
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {getSessionsData()}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
