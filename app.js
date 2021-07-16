const request = require('postman-request');
const geourl =require('./utils/geocode')
// const url = 'http://api.weatherstack.com/current?access_key=367cc84f0513f4ea3aa4e20061d20eb2&query=28.4089,77.3178'

// request({ url: url, json: true }, (error, response) => {
//     console.log(response.body)
// })


geourl('hisar haryana', (error, data) => {
    console.log('error: ', error)
    console.log('data: ', data)
})