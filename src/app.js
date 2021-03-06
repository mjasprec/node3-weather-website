const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
          res.render('index', {
                    title: 'Weather',
                    name: 'MJ Snow'
          })
})

app.get('/about', (req, res) => {
          res.render('about', {
                    title: 'About Me',
                    name: 'MJ Snow'
          })
})

app.get('/help', (req, res)=>{
          res.render('help', {
                    title: 'Help Page',
                    name: 'MJ Snow',
                    message: 'Available help 24/7'
          })
})

app.get('/weather', (req, res)=>{
          if(!req.query.address){
                    return res.send({
                              error: 'You must provide an address'
                    })
          }

          geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
                    if(error){
                              return res.send({error: error})
                    }

                    forecast(latitude, longitude, (error, forecastData) =>{
                              if(error){
                                        return res.send({error: error})
                              }

                              res.send({
                                        summary: forecastData.summary,
                                        temperature: forecastData.temp,
                                        tempHigh: forecastData.tempHigh,
                                        tempLow: forecastData.tempLow,
                                        humidity: forecastData.humidity,
                                        location,
                                        address: req.query.address
                              })
                    })
          }) 
})

app.get('/products', (req, res)=>{
          if(!req.query.search){
                    return res.send({
                              error: 'You must provide a search term'
                    })
          }

          res.send({
                    product: []
          })
})

app.get('/help/*', (req, res) => {
          res.render('404', {
                    title: '404',
                    errorMessage: 'Help article not found.',
                    name: 'MJ Snow'
          })
})

app.get('*', (req, res) => {
          res.render('404', {
                    title: '404',
                    errorMessage: 'Page not found.',
                    name: 'MJ Snow'
          })
})

app.listen(port, ()=>{
          console.log('Server is up on port ' + port)
})