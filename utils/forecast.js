const request = require('postman-request');

const forecastdata = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=367cc84f0513f4ea3aa4e20061d20eb2&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to service', undefined, undefined)
        } else if (response.body.error) {
            callback('unable to find location', undefined, undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecastdata
