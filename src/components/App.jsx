import React from "react";

import SettingsContext from "components/SettingsContext.js";

import Display from "components/Display.jsx";
import Control from "components/Control.jsx";

import VentLR_API from "js/ventLR_API.js";

import config from "config.json"

import "css/App.scss"

class App extends React.Component {

    state = {
        settings: {
        },
        systemStats: {
            state: null,
            targetTemperature: null,
            airTemperature: null,
            heaterCapacity: null,
            failures: {
                heater: null,
                fan: null,
                frequencyConverter: null
            }
        }
    }

    constructor(props) {
        super(props);
        // this.state.systemStats = {
        //     state: "Ожидание",
        //     targetTemperature: 15,
        //     airTemperature: 10,
        //     heaterCapacity: 20,
        //     failures: {
        //         heater: false,
        //         fan: false,
        //         frequencyConverter: false
        //     }
        // };
        this.updateSystemStatus = this.updateSystemStatus.bind(this);
        this.isSystemActive = this.isSystemActive.bind(this);
        this.updateSystemStatus();
    }

    componentDidMount() {
        setInterval(this.updateSystemStatus, config.StatusUpdateInterval_ms);
    }

    async updateSystemStatus() {
        let res = await VentLR_API.getStatus();
        console.log(res);
        this.setState({
            systemStats: res
        });
    }

    isSystemActive() {
        return (
            this.state.systemStats.state == VentLR_API.States.HeaterStarting ||
            this.state.systemStats.state == VentLR_API.States.FanStarting ||
            this.state.systemStats.state == VentLR_API.States.Active
        );
    }

    render() {
        return (<SettingsContext.Provider value={this.state.settings}>
            <div className="grid">
                <Control Update={this.updateSystemStatus} value={this.isSystemActive()} isBlocked={(this.state.systemStats.state == VentLR_API.States.Idle) || (this.state.systemStats.state == VentLR_API.States.Active)} />
                <Display stats={this.state.systemStats} />
            </div>
        </SettingsContext.Provider>)
    }
}

export default App;
