const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnNvbGl2ZW4iLCJhIjoiY2thMHU3ZHFyMW54azNlcGI3M2s5eXcxZiJ9.WMZD9jQBeDavWW3NBDjaVw&limit=1'
    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to access geolocation',undefined)
        }
        else if(body.features.length === 0){

            callback('No matched location')
        }
        else {
            
            callback(undefined, {
                location: body.features[0].place_name ,
                latitude: body.features[0].center[1] ,
                longitude: body.features[0].center[0]
            })
            

        }
    })
}

module.exports = geocode
