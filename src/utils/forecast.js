import request from 'postman-request'
import chalk from 'chalk'
export const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current' +
    '?access_key=0a7f7d824104223fd3b6dd06ed21a3a9' +
    '&query='+long+','+lat
  request.get(url, {json: true}, (error, {body}) => {
    if(error){
    callback('Unable to connect to weather service!', undefined)
  } else if(body.error) {
    callback('Unable to find location. Reason: '+body.error.info)
  }
    else{
      const current = body.current;
      callback(undefined, {
        forecastText: 'The weather is ' + current.weather_descriptions[0] + '. It is currently '
          + current.temperature + ' degrees out. It feels like '
          + current.feelslike + ' degrees out. The humidity is '+current.humidity +'%.',
        forecastLocation: body.location.name
      })

    }
  })
}