const request = require('request');

const forecast = (latitude, longitude, callback) => {
 const access_key = '80c7a460080eca984383d81085484b76';
 const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}&units=f`;
 request.get({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect to weather service', undefined);
  } else if (body.error) {
   callback('Unable to find location', undefined);
  } else {
   callback(
    undefined,
    `${body.current.weather_descriptions}. It is currently ${body.current.temperature}.
     There is a ${body.current.precip}% chance of rain.Humidity is ${body.current.humidity}%, wind speed is ${body.current.wind_speed} knots`
   );
   console.log(body);
  }
 });
};

module.exports = forecast;
