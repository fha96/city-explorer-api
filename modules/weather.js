// http://api.weatherapi.com/v1/current.json?key=a5abdc81390742f6898182841220308&q=amman 
const axios=require('axios');
async function handleWeather(request,response){
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
};
class WeatherApi{
    constructor(data){
        this.date=data.localtime;
        this.decription=data.region;
    }
}
module.exports = { handleWeather };
