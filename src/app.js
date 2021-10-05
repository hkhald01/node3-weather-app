const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
 res.render('index', { title: 'Weather App', name: 'Andrew Mead' });
});

app.get('/about', (req, res) => {
 res.render('about', { title: 'about Me ', name: 'Andrew Mead' });
});

app.get('/help', (req, res) => {
 res.render('help', {
  title: 'Help',
  text: 'Page help',
  title: 'Help ',
  name: 'Andrew Mead',
 });
});

app.get('/weather', (req, res) => {
 if (!req.query.address) {
  return res.send({ error: 'Please enter address' });
 } else {
  geocode(
   req.query.address,
   (error, { latitude, longitude, location } = {}) => {
    if (error) {
     return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
     if (error) {
      res.send({ error });
     }
     res.send({
      location,
      forecast: forecastData,
      address: req.query.address,
     });
    });
   }
  );
 }
});

app.get('/products', (req, res) => {
 if (!req.query.search) {
  return res.send({ error: 'you must provide a serch term' });
 }

 res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
 res.render('404', {
  title: '404',
  name: 'Andre Mead',
  errorMessage: 'Help article not found',
 });
});

app.get('*', (req, res) => {
 res.render('404', {
  title: '404',
  name: 'Andrew Mead',
  errorMessage: 'Page not found',
 });
});

app.listen(port, () => {
 console.log(`server is up on port ${port}`);
});
