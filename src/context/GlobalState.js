import React, { createContext, useContext } from 'react';

const initialGlobalState = {
    todos: [],
    logs: []
};

const GlobalState = createContext();

class Global extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globals: initialGlobalState,
        };
    }

    componentDidMount() {
        GlobalState.set = this.setGlobalState;
    }

    setGlobalState = (data = {}, logMessage = '') => {
        const timestamp = new Date().toISOString();
        const newLog = {
            timestamp,
            logMessage
        };

        this.setState(state => ({
            globals: {
                ...state.globals,
                ...data,
                logs: [...state.globals.logs, newLog]
            },
        }));
    };

    render() {
        const { globals } = this.state;
        const { Root } = this.props;
        return (
            <GlobalState.Provider value={globals}>
                <Root />
            </GlobalState.Provider>
        );
    }
}

const useGlobalState = () => useContext(GlobalState);

export { Global, useGlobalState, GlobalState };
