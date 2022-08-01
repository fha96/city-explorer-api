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
    let selectedData=weatherData.find(item=>{
        if(item.city_name==="Seattle"){
            return item;
        }
    })
    response.send(selectedData);
})


server.get('*',(req,res)=>{
    res.status(404).send("Please try to choose Amman Seattle or Paris");
})



//Here we make our server listen to receive requests when we start it.
server.listen(PORT,()=>{
    console.log(`Server is listening on PORT : ${PORT}`);
})



