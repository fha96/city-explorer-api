'use strict';


require('dotenv').config();
const express=require('express');
const cors=require('cors');
// const weatherData=require('./data/weather.json');
const axios=require('axios');


const server=express();
server.use(cors());

const PORT=process.env.PORT;

// http://api.weatherapi.com/v1/current.json?key=a5abdc81390742f6898182841220308&q=amman
server.get('/weather', async (request,response)=>{
    let cityName=request.query.cityName;
    const url=`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${cityName}`;
    const weatherApiResponse=await axios.get(url);
    const arrayOfResponse=Object.entries(weatherApiResponse.data);
    
    try{
    const selectedData=arrayOfResponse.find(item=>{
        if(item[1].name.toLowerCase()===cityName.toLowerCase()){
            return item;
        }
    });
    
                const weatherArray=selectedData.map(item=>{
                    return new WeatherApi(item);
                });
                response.status(200).send(weatherArray);
        
            }catch(error){
                errorHandler(error,response);
            }



    // console.log(selectedData);
});




// http://localhost:3001/weather
// http://api.weatherapi.com/v1/current.json?key=a5abdc81390742f6898182841220308&q=amman
//  server.get('/weather', async (request,response)=>{
//     let cityName=request.query.cityName;
//     // const url=`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${cityName}`;
//     // const weatherApiResponse=await axios.get(url);
//     // console.log(weatherApiResponse);

//     let selectedData=weatherData.find(item=>{
//         if(item.city_name.toLowerCase()===cityName.toLowerCase()){
//             return item;
//         }
//     });
//     try{
//         const weatherArray=selectedData.data.map(item=>{
//             return new Forecast(item);
//         });
//         response.status(200).send(weatherArray);

//     }catch(error){
//         errorHandler(error,response);
//     }
// });


server.get("*",(req,res)=>{
    res.status(404).send("Not found!")
});

function errorHandler(error,res){
    res.status(500).send( {error :" somthing went wrong   "});

}
// class Forecast{
//     constructor(day){
//         this.date=day.valid_date;
//         this.decription=day.weather.description;
//     }
// }

class WeatherApi{
    constructor(data){
        this.date=data.localtime;
        this.decription=data.region;
    }
}


//Here we make our server listen to receive requests when we start it.
server.listen(PORT,()=>{
    console.log(`Server is listening on PORT : ${PORT}`);
})





