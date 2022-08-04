'use strict';


require('dotenv').config();
const express=require('express');
const cors=require('cors');
const weather =require('./modules/weather');
const movies=require('./modules/movies');


const server=express();
server.use(cors());

const PORT=process.env.PORT;

server.get('/weather', weather.handleWeather);


server.get('/movies', movies.movieHandler);





server.get("*",(req,res)=>{
    res.status(404).send("Not found!")
});

function errorHandler(error,res){
    res.status(500).send( {error :" somthing went wrong   "});

}




//Here we make our server listen to receive requests when we start it.
server.listen(PORT,()=>{
    console.log(`Server is listening on PORT : ${PORT}`);
})





