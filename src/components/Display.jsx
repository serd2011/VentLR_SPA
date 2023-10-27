import React from "react";

import "css/Display.scss"

let stateNames = ["Система остановлена", "Запуск калорифера", "Запуск вентилятора", "Система заблокированна", "Система в работе", "Продув электрокалорифера", "Останов вентилятора"];

class Display extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let dataToDisplay = {
            state: (this.props.stats.state === null ? "Не определено" : stateNames[this.props.stats.state]),
            targetTemperature: (this.props.stats.targetTemperature === null ? "Не определено" : this.props.stats.targetTemperature.toFixed(2) + " °С"),
            airTemperature: (this.props.stats.airTemperature === null ? "Не определено" : this.props.stats.airTemperature.toFixed(2) + " °С"),
            heaterCapacity: (this.props.stats.heaterCapacity === null ? "Не определено" : this.props.stats.heaterCapacity.toFixed(2) + " Вт"),
            failures: {
                heater: (this.props.stats.failures.heater === null ? "Не определено" : (this.props.stats.failures.heater ? "Неисправность" : "В норме")),
                fan: (this.props.stats.failures.fan === null ? "Не определено" : (this.props.stats.failures.fan ? "Неисправность" : "В норме")),
                frequencyConverter: (this.props.stats.failures.frequencyConverter === null ? "Не определено" : (this.props.stats.failures.frequencyConverter ? "Неисправность" : "В норме"))
            }
        };

        return (<div className="display">
            <div className="title">Состояние системы</div>
            <div>Статус: <span>{dataToDisplay.state}</span></div>
            <div>Уставка: <span>{dataToDisplay.targetTemperature}</span></div>
            <div>Температура притока: <span>{dataToDisplay.airTemperature}</span></div>
            <div>Мощность калорифера: <span>{dataToDisplay.heaterCapacity}</span></div>
            <div>Калорифер: <span>{dataToDisplay.failures.heater}</span></div>
            <div>Вентилятор: <span>{dataToDisplay.failures.fan}</span></div>
            <div>Частотник: <span>{dataToDisplay.failures.frequencyConverter}</span></div>
        </div>);
    }
}

export default Display;
