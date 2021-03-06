const request = require('request');

const forecast = (latitude, longitude, callback) => {
          const url = 'https://api.darksky.net/forecast/e692f25447d4cbd5c209a888a2cfb40b/'+latitude+','+longitude;

          request({url, json:true}, (error, {body}) => {
                    if(error){
                              callback('Unable connect to weather service!', undefined)
                    }else if(body.error){
                              callback('Unable to find location. Try another search.', undefined)
                    }else{
                              const summary = body.daily.data[0].summary;
                              const temp = body.currently.temperature;
                              const tempHigh = body.daily.data[0].temperatureHigh;
                              const tempLow = body.daily.data[0].temperatureLow;
                              const humidity = (body.daily.data[0].humidity * 100)
                              callback(undefined, {summary, temp, tempHigh, tempLow, humidity}
                              )
                              //
                              // body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.'
                    }
          })
}

module.exports = forecast;