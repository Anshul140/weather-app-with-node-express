const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5zaHVsMTQwIiwiYSI6ImNrb3h5MTF2ZjA2ZDcyb28wdHB5ZWRjN2YifQ.j-C_C7NpHlUzq0P5_ZJwUw`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to reach mapbox-geocoding service! Please check your Network connection', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to get coordinates of given location! Try different location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode