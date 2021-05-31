const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ab77b987b7e63eb891d0c7822cd53952&query=${lat},${lon}`

    request({ url, json: true }, (error, { body }) => {
        // console.log(body.current)
        if (error) {
            callback('Unable to connect to weather service! Please check your Network connection', undefined)
        } else if (body.error) {
            callback('Unable to find location! Please try different location', undefined)
        } else {
            callback(undefined, {
                Description: body.current.weather_descriptions[0],
                Current_Temperature: `${body.current.temperature}°C`,
                Feels_Like_Temperature: `${body.current.feelslike}°C`,
                Cloud_Cover: `${body.current.cloudcover}%`,
                Humidity: `${body.current.humidity}%`
            })
        }
    })
}

module.exports = forecast
