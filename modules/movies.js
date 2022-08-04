// https://api.themoviedb.org/3/search/movie?api_key=140ed5bb0c130efde754d62530d0cc1e&query=amman   
const axios=require('axios');

const moviesCache={};
async function movieHandler(request,response){
    let cityName=request.query.cityName;
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    console.log(moviesCache[cityName]);
    if(moviesCache[cityName] !== undefined){
        response.status(200).send(moviesCache[cityName]);
    }else{
        try {
            const moviesData= await axios.get(url);
            // console.log(moviesData);
            const arrayOfMoviesData=moviesData.data.results.map(item=>{
                return new MovieApi(item);
            });
            moviesCache[cityName]=arrayOfMoviesData;
            response.status(200).send(arrayOfMoviesData);
        } catch (error) {
           errorHandler(error,response);
        }


    }
    
    
    
    

};
class MovieApi{
    constructor(movie){
        
            this.title=movie.title;
            this.overview = movie.overview;
            this.average_votes=movie.vote_average;
            this.total_votes=movie.vote_count;
            this.image_url=movie.poster_path;
            this.popularity=movie.popularity;
            this.released_on=movie.release_date;
        
    }
}

module.exports = { movieHandler };