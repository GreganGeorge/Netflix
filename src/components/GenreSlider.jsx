import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function GenreSlider ({movies,selectedGenre,type}){
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to);
    }
  return (
    <div>
        <CardSlider title={type=="movie"?"Movies":"TV Shows"} category={"now_playing"} selectedGenre={selectedGenre} type={type}/>
    </div>
  )
}
)