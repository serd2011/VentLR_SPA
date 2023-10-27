import config from "config.json"

/**
* @typedef Failures
* @type {object}
* @property {bool} heater
* @property {bool} fan
* @property {bool} frequencyConverter
*/

/**
* @typedef Status
* @type {object}
* @property {States} state
* @property {number} targetTemperature
* @property {number} airTemperature
* @property {number} heaterCapacity
* @property {Failures} failures
*/

class VentLR_API {

    /**
 * States
 * @readonly
 * @enum {number}
 */
    static States = {
        Idle: 0,
        HeaterStarting: 1,
        FanStarting: 2,
        Blocked: 3,
        Active: 4,
        HeaterBlowdown: 5,
        FanStopping: 6
    };

    /**
     * Returns current system status
     * 
     * @returns {Promise<Status>}
     */
    static async getStatus() {
        const url = config.url.getStatus;
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }

    /**
     * Enables or disables the system 
     * 
     * @param {bool} isEnable 
     */
    static async enable(isEnable) {
        const url = config.url.enable;
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                enable: isEnable,
            })
        };
        await fetch(url, options);
    }

    /**
     * Sets target temperature
     * 
     * @param {number} temperature
     */
    static async setTargetTemperature(temperature) {
        const url = config.url.setTargetTemperature;
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                temperature: temperature,
            })
        };
        await fetch(url, options);
    }

}

export default VentLR_API;
