const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=24990e904f10b85dc8f2c4d99a7b0338&query='+ latitude + ','+ longitude
    request({url, json:true}, (error,{ body })=>{
        if(error){
            callback('Unable to access weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                location : body.location.name,
                summary : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                message : body.current.weather_descriptions[0]+'. It is ' + body.current.temperature + ' degrees out and feels like ' + body.current.feelslike + ' degrees'
            }) 

        }
    })

}        

module.exports = forecast