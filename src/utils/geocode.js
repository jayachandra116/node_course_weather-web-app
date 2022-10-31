const request = require("request");
const {access_key}=require('../../config/constants')

const geocode = (address='', callback) => {
  const weather_url = "http://api.weatherstack.com/";
  const weather_endpoint = "current";
  
  //const query = "Hyderabad";

  const url =weather_url+weather_endpoint+'?'+'access_key='+access_key+'&'+'query='+address;

  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, {
        latitude: body.location.lat,
        longitude:body.location.lon,
        location: body.location.name
      });
    }
  });
};

module.exports = geocode;
