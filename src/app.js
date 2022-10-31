const path=require('path');
const express=require('express');
const hbs=require('hbs');
const { title } = require('process');

const geocode =require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

//Setup hanldebars engine
app.set('view engine','hbs');
//Setup views locations
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'JC'
    });
});


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'NO address provided'
        });
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error:error
                });
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error:error
                    })
                }

                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                });
            })
        })

    }
})

app.get('/help',(req,res)=>{
    // res.send({
    //     name:'JC',
    //     age:24
    // });
    res.render('help',{
        message:'Help message',
        title:'Help',
        name:'JC'
    })
})

app.get('/about',(req,res)=>{
    // res.send('<h1>About page</h1>')
    res.render('about',{
        title:'About',
        name:'JC'
    })
})

app.get('/help/*',(req,res)=>{
    //res.send("<h3>Help article"+req+" not found</h3>");
    res.render('404',{
        errorMessage:'Help article not found',
        article:req.url
    });
})

//setup 404 page
app.get('*',(req,res)=>{
    //res.send('<h2>404. Page not found</h2>');
    res.render('404',{
        errorMessage:'Page not found',
        title:'404'
    })
})



app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})