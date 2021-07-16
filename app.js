const chalk = require('chalk')
const geourl = require('./utils/geocode');
const forecastdata = require('./utils/forecast');

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geourl(address, (error, data) => {
        if (error) {
            return console.log(error)
        }

        forecastdata(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(chalk.green.inverse(data.location))
            console.log(chalk.inverse(forecastData))
        })
    })
}
