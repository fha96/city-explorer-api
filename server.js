'use strict';


require('dotenv').config();
const express=require('express');
const cors=require('cors');
const weatherData=require('./data/weather.json');


const server=express();
server.use(cors());

const PORT=process.env.PORT;


// http://localhost:3001/weather&lon=LONGITUDE&lat=LATITUDE
server.get('/weather',(request,response)=>{
    let cityName=request.query.cityName;
    
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

    }catch{
        response.status(500).send("somthing went wrong!");
    }
    // let selectedData=weatherData.find(item=>{
    //     if(item.city_name==="Seattle"){
    //         return item;
    //     }
    // })
    // response.send(selectedData.city_name);
})

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





