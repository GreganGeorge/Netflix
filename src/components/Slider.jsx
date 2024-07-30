import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider ({movies,type}){
    const getMoviesFromRange=(from,to)=>{
        return movies.slice(from,to);
    }
  return (
    <div>
        <CardSlider title="Trending Now" category={"now_playing"} />
        <CardSlider title="Blockbuster Movies"  category={"top_rated"} />
        <CardSlider title="Only On Netflix" category={"popular"} />
        <CardSlider title="Upcoming"  category={"upcoming"} />
        <CardSlider title="Top Pics for You" category={"now_playing"}/>
    </div>
  )
}
)