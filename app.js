const request = require('postman-request');
// const url = 'http://api.weatherstack.com/current?access_key=367cc84f0513f4ea3aa4e20061d20eb2&query=28.4089,77.3178'

// request({ url: url, json: true }, (error, response) => {
//     console.log(response.body)
// })


// const urladd = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Faridabad.json?access_token=pk.eyJ1IjoicmFqYXRzcmFuIiwiYSI6ImNrcjYwdXJsYTAxamMycXBnZHJ5ZDd1ZzcifQ.Ru40dK_96iiuCuD6zGIyew&limit=1'
// request({ url: urladd, json: true }, (error, response) => {
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(latitude, longitude)
// })

const geourl = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFqYXRzcmFuIiwiYSI6ImNrcjYwdXJsYTAxamMycXBnZHJ5ZDd1ZzcifQ.Ru40dK_96iiuCuD6zGIyew&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to service', undefined)
        } else if (response.body.features[0].length === 0) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

geourl('faridabad', (error, data) => {
    console.log('error: ', error)
    console.log('data: ', data)
})