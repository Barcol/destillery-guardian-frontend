import React from 'react';
import App from "./App";
import Session from "./Session";

class Main extends React.Component {
    state = {
        renderSessionId: null
    }

    render() {
        return (
            <>
                {this.state.renderSessionId
                    ? <Session id={this.state.renderSessionId}/>
                    : <App loadSessionFunction={(key) => this.setState({renderSessionId: key})}/>}
            </>
        )
    }
}

export default Main;
