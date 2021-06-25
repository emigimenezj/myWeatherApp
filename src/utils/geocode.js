const request = require('request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?' +
        'access_token=pk.eyJ1IjoiZW1pbGlva3BvMSIsImEiOiJja3BzMTRndngwMnpwMnVzNHhnOXU0NHQ4In0.zt4BpI8wqd3I-5YsDa1Lsg' +
        '&limit=1';

    request({url, json: true}, (error, response) => {

        if (error)
            callback('Unable to connect to the location service!', undefined);

        else if (response.body.features.length === 0)
            callback('Unable to find location. Try another search.', undefined);

        else {
            let {center, place_name: place} = response.body.features[0];
            callback(undefined, {latitude: center[1], longitude: center[0], location: place});
        }
    });
}

module.exports = geocode;