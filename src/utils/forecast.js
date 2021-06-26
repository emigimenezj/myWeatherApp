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
            let {
                weather_descriptions: weather,
                temperature: temp,
                precip,
                feelslike,
                humidity,
                visibility
            } = response.body.current;
            callback(
                undefined,
                `<b>${weather[0]}</b>. It is currently <b>${temp} degrees</b> out. There is a <b>${precip}%</b> chance of rain.`,
                `${repeatString(10, "&nbsp;")}Feels Like: <b>${feelslike} degrees</b><br>` +
                `${repeatString(15,"&nbsp;")}Humidity: <b>${humidity}%</b><br>` +
                `${repeatString(20,"&nbsp;")}Visibility: <b>${visibility} km</b>`
            );
        }
    });
}

function repeatString (n, string) {
    let res = '';
    for (let i = 0; i < n; i++) res += string;
    return res;
}

module.exports = forecast;