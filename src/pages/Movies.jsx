import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres,fetchMovies } from '../store';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import SelectGenre from '../components/SelectGenre';

export default function Movies () {
    const [isScrolled,setIsScrolled]=useState(false);
    const navigate=useNavigate();
    const genresLoaded=useSelector((state)=>state.netflix.genresLoaded);
    const movies=useSelector((state)=>state.netflix.movies);
    const genres=useSelector((state)=>state.netflix.genres);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getGenres({type:'movie'}))
    },[])

    useEffect(()=>{
        if(genresLoaded){
        dispatch(fetchMovies({type:"movies"}))
        }
    },[genresLoaded])
    window.onscroll=()=>{
        setIsScrolled(window.scrollY===0?false:true);
        return()=>(window.onscroll=null);
    }
  return (
    <Container>
        <div className='navbar'>
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className='data'>
            <SelectGenre genres={genres} type="movie"/>
        </div>
    </Container>
  )
}

const Container=styled.div`
    .data{
        margin-top:8rem;
        .not-available{
            text-align:center;
            color:white;
            margin-top:4rem;
        }
    }
`;