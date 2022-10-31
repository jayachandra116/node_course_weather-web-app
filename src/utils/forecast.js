const request = require("request");
const {access_key}=require('../../config/constants')

const forecast = (latitude, longitude, callback) => {
  const weather_url = "http://api.weatherstack.com/";
  const weather_endpoint = "current";
  const query = latitude+','+longitude;

  const url =
    weather_url +
    weather_endpoint +
    "?" +
    "access_key=" +
    access_key +
    "&" +
    "query=" +
    query;

  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        response:body
      });
    }
  });
};

module.exports = forecast;
