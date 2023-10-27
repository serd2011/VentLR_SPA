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
            <label id="switch"><span>Вкл / Выкл</span><Switch enabled={this.props.isBlocked} onChange={this.enableSystem} /></label>
            <div id="temperatureControl">
                <label><span>Температура: </span><input type="number" min="0" max="60" value={this.temperature} onChange={e => this.setState({ temperature: e.target.value })} /></label>
                <button onClick={this.setTargetTemperature}>Установить</button>
            </div>
        </div>);
    }
}

export default Control;
