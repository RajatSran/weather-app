const request = require('postman-request');

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


module.exports=geourl   