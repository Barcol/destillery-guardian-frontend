import React from 'react';
import logo from "./logo.svg";

class NewSessionForm extends React.Component {

    handleNameChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
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
                        <form className={"pt-5 text-center"} onSubmit={this.handleSubmit}>
                            <div className={"form-group"}>
                                <label>
                                    Nazwa sesji:
                                    <input className={"form-control"} type={"text"}/>
                                </label>
                            </div>

                            <div className={"form-group"}>
                                <label>
                                    Interwał czasowy pomiarów:
                                    <input className={"form-control"} type={"text"} value={30}/>
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