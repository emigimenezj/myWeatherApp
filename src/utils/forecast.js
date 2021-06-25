const request = require('request');

function forecast(lat, long, callback) {
    const url = 'http://api.weatherstack.com/current?' +
        'access_key=6893076b45e1154df1c415e776ff5fb9' +
        `&query=${lat},${long}`;

    request({url, json: true}, (error, response) => {

        if (error)
            callback("Unable to connect to weather service!");

        else if (response.body.error)
            callback("Unable to find location!");

        else {
            let {weather_descriptions: weather, temperature: temp, precip} = response.body.current
            // let weather = response.body.current.weather_descriptions[0];
            // let temp = response.body.current.temperature;
            // let precip = response.body.current.precip;
            callback(
                undefined,
                `${weather[0]}. It is currently ${temp} degrees out. There is a ${precip}% chance of rain.`
            );
        }
    });
}

module.exports = forecast;