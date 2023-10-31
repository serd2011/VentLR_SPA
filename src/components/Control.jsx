import React from "react";

import { Switch } from "components/controls.jsx";

import VentLR_API from "js/ventLR_API.js";

import "css/Control.scss"

class Control extends React.Component {

    state = {
        temperature: null
    }

    constructor(props) {
        super(props);
        this.enableSystem = this.enableSystem.bind(this);
        this.setTargetTemperature = this.setTargetTemperature.bind(this);
    }

    async enableSystem(isEnable) {
        await VentLR_API.enable(isEnable);
        this.props.Update();
    }

    async setTargetTemperature() {
        await VentLR_API.setTargetTemperature(this.state.temperature);
        this.props.Update();
    }

    render() {
        return (<div className="control">
            <div className="title">Управление системой</div>
            <div className="onOffSwitches">
                <button onClick={this.enableSystem.bind(this, false)}>Выкл</button>
                <button onClick={this.enableSystem.bind(this, true)}>Вкл</button>
            </div>
            <div className="temperatureControl">
                <label><span>Температура: </span><input type="number" min="0" max="60" value={this.temperature} onChange={e => this.setState({ temperature: e.target.value })} /></label>
                <button onClick={this.setTargetTemperature}>Установить</button>
            </div>
        </div>);
    }
}

export default Control;
