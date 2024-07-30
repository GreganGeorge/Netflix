import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store'
import { API_KEY } from '../utils/constants'
import Slider from './Slider'
import NotAvailable from './NotAvailable'
import GenreSlider from './GenreSlider'

export default function SelectGenre ({genres,type}) {
    const dispatch=useDispatch()
    const [selectedGenre,setSelectedGenre]=useState(null);
    return (
        <Container>
          <Select
            className="flex"
            onChange={(e) => setSelectedGenre(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select a Genre
            </option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
          <MovieContainer>
             {selectedGenre?<GenreSlider selectedGenre={selectedGenre} type={type}/>:<NotAvailable type={type} selectedGenre={selectedGenre}/>}
          </MovieContainer>
        </Container>
      );
    }
    
    const Container = styled.div``;
    
    const Select = styled.select`
        margin-top:10rem;
        margin-left: 55rem;
        margin-bottom: 10rem;
        cursor: pointer;
        font-size: 1.4rem;
        background-color: rgba(0, 0, 0, 1);
        color: white;
    `;
    
    const MovieContainer = styled.div`
      
    `;