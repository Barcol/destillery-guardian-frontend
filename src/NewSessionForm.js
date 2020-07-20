import React from 'react';
import logo from "./logo.svg";
import axios from 'axios'


class NewSessionForm extends React.Component {
    state = {
        name: '',
        interval: 30
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleIntervalChange(event) {
        this.setState({interval: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        axios
            .post("http://127.0.0.1:8000/sessions", {
                name: this.state.name,
                time_interval: this.state.interval
            }).then(response => {

        if (response.status === 200) {
            this.props.loadSessionFunction({name: "session", key: response.data.id})
        } else {
            console.alert("Something went wrong!")
        }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"
                             onClick={() => this.props.loadSessionFunction({name: "app", key: null})}/>
                        <h3>Rozpocznij nową sesję.</h3>
                        <small>
                            (Ta akcja spowoduje automatyczne zakończenie poprzedniej sesji,
                            jeśli nie została ona wcześniej zakończona ręcznie)
                        </small>
                        <form className={"pt-5 text-center"} onSubmit={(event) => this.handleSubmit(event)}>
                            <div className={"form-group"}>
                                <label>
                                    Nazwa sesji:
                                    <input onChange={(event) => this.handleNameChange(event)}
                                           className={"form-control"}
                                           type={"text"}/>
                                </label>
                            </div>

                            <div className={"form-group"}>
                                <label>
                                    Interwał pomiarów [s]:
                                    <input onChange={(event) => this.handleIntervalChange(event)}
                                           className={"form-control"}
                                           type={"number"}
                                           defaultValue={30}/>
                                </label>
                            </div>

                            <input className={"btn btn-primary mt-5"} type="submit" value="Wyślij"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewSessionForm;