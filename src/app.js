const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);    // setting absolute location path for views
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emi Giménez'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP !',
        text: 'This is some helpful text.',
        name: 'Emi Giménez'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT !',
        name: 'Emi Giménez'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide an address to consult!'
        });
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error});

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) return res.send({error});

            res.send({
                forecast : forecastData,
                location,
                address
            });
        });
    });
});




app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});





app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404 not found',
        message: "Help article not found. Are you sure you write it correctly?",
        name: 'Emi Giménez'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404 not found',
        message: "Sorry. We can't find the page you're looking for.",
        name: 'Emi Giménez'
    });
});



app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});