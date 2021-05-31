const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and views location. hbs(handlebars)- is used for dynamic web pages
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Anshul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anshul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anshul',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const name = req.query.address
    if (name === '' || name === undefined) {
        console.log('No address was provided! Please enter a valid Location')
    } else {
        geocode(name, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                const obj = {
                    error: error
                }
                // console.log(obj)
                return res.send(obj)
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    // return console.log('Error', error)
                    return res.send({ error })
                }
                const newForecastData = { Location: location, Address: name, ...forecastData }
                // console.log(newForecastData)
                return res.send(newForecastData)
            })
        })

    }


})

app.get('/products', (req, res) => {
    // req.query
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

//routes
// app.com
// app.com/help
// app.com/about


app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: 'Help Article Not Found!',
        name: 'Anshul',
        title: 'Error 404'
    })
})

// '*' -> wildcard character -- everything is a match
app.get('*', (req, res) => {
    res.render('404page', {
        message: 'Page Not Found :/',
        name: 'Anshul',
        title: 'Error 404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})