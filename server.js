'use strict';


require('dotenv').config();
const express=require('express');
const cors=require('cors');
const weatherData=require('./data/weather.json');
const { application } = require('express');


const server=express();
server.use(cors());

const PORT=process.env.PORT;


// http://localhost:3001/weather
server.get('/weather',(request,response)=>{
    let cityName=request.query.cityName;
    // const lat=request.query.lat;
    // const lon=request.query.lat;

    let selectedData=weatherData.find(item=>{
        if(item.city_name.toLowerCase()===cityName.toLowerCase()){
            return item;
        }
    });
    try{
        const weatherArray=selectedData.data.map(item=>{
            return new Forecast(item);
        });
        response.status(200).send(weatherArray);

    }catch(error){
        errorHandler(error,response);
    }
});


server.get("*",(req,res)=>{
    res.status(404).send("Not found!")
});

function errorHandler(error,res){
    res.status(500).send( {error :" somthing went wrong   "});

}
class Forecast{
    constructor(day){
        this.date=day.valid_date;
        this.decription=day.weather.description;
    }
}


//Here we make our server listen to receive requests when we start it.
server.listen(PORT,()=>{
    console.log(`Server is listening on PORT : ${PORT}`);
})





