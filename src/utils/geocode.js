import request from 'postman-request'

export const geocode = (address, callback) => {
  const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json' +
    '?access_token=pk.eyJ1IjoibWFhZ3VpbGFyIiwiYSI6ImNsbG1ndmM0eDJiaGIzZm5nanNmcm95ZnAifQ.wTpZsZsHVFxHga2BQqYESQ&limit=1'
  request.get(mapbox_url, {json: true}, (error, {body}) => {
    if(error){
      callback('Unable to connect to geolocation service!', undefined)
    } else if(body.features.length === 0){
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}