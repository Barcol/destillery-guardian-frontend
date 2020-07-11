import React from 'react';
import App from "./App";
import Session from "./Session";
import NewSessionForm from "./NewSessionForm";

class Main extends React.Component {
    state = {
        renderSessionId: {name: "app", key: null}
    }

    render() {
        if (this.state.renderSessionId.name === "session") {
            return (
                <>
                    {<Session id={this.state.renderSessionId.key}
                              loadSessionFunction={(key) => this.setState({renderSessionId: key})}/>}
                </>
            )
        } else if (this.state.renderSessionId.name === "app") {
            return (
                <>
                    {<App loadSessionFunction={(key) => this.setState({renderSessionId: key})}/>}
                </>
            )
        } else if (this.state.renderSessionId.name === "new_session") {
            return (
                <>
                    {<NewSessionForm loadSessionFunction={(key) => this.setState({renderSessionId: key})}/>}
                </>
            )
        }
    }
}

export default Main;
