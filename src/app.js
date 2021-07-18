const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geourl = require('../utils/geocode');
const forecastdata = require('../utils/forecast');

const app = express()
const port=process.env.PORT || 3000

//define path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rajat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rajat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Rajat',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'you must provide an address'
        })
    }

    geourl(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecastdata(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            return res.send({
                location:location,
                forecastData:forecastData,
                address:req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send(
        'my 404 page'
    )
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})