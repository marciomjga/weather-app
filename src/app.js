import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import { forecast } from './utils/forecast.js'
import { geocode } from './utils/geocode.js'

// Get paths for config below
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// Define paths for Express config
const pathToPublic = path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// Setup hbs engine views location
app.set('view engine', 'hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)

// Setup static directory to serve
app.use(express.static(pathToPublic))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Marcio'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Marcio'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'THIS IS A MISTAKE, SEND HELP!',
    title: 'Halp',
    name: 'Marcio'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address to search'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send ({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})

// Catch 404 after help pages
app.get('/help/*', (req, res) => {
  res.render('pageNotFound', {
    errorMessage: 'Help article not found!',
    title: 'Help article not found!',
    name: 'Marcio'
  })
})

// Catch generic 404 pages
app.get('*', (req, res) => {
  res.render('pageNotFound', {
    errorMessage: 'Page not Found',
    title: 'Page not found!',
    name: 'Marcio'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})