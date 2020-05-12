const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 

//paths for express config
const publicDir = path.join(__dirname,'../public')  
const viewsPath = path.join(__dirname,'../templates/views')  
const partialsPath = path.join(__dirname,'../templates/partials')  

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDir))

app.get('', (req , res)=>{
    res.render('index',
    {
        title: 'Weather',
        name : 'Ven' 
    })
})

app.get('/about', (req , res)=>{
    res.render('about',
    {
        title: 'About Me',
        name : 'Ven'
 
    })
})
  
app.get('/help', (req , res)=>{
    res.render('help',
    {
        title: 'Help',
        content : 'Provide address for weather',
        name: 'Ven'
 
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send(
            {
                error: 'You must provide an address'  
            } 
        )
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){ 
            return res.send({error}) 
        } 

        forecast( latitude,longitude , (ferror, {message}) => {
            if(ferror)
            {
                return res.send({error})
            }
                 
            res.send({
                address: req.query.address,
                location, 
                forecast: message
            })
        }) 
        
    })


   
}) 

app.get('/products', (req,res) => { 
    if (!req.query.search) {
        return res.send(
            {
                error: 'You must provide a search term'  
            } 
        )
    }
    console.log(req.query)
    res.send({
             products:[]
    })
}) 

app.get('/help/*', (req , res)=>{ 
    res.render('404',
    {
        title: '404',
        error_message : 'Help article not found',
        name: 'Ven'
 
    })
})

app.get('*', (req , res)=>{
    res.render('404',
    {
        title: '404',
        error_message : 'Page not found',
        name: 'Ven'
 
    })
})

app.listen(3000, () => [
    console.log('Server is up on port 3000')
])