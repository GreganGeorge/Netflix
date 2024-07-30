import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { TMDB_BASE_URL,API_KEY } from '../utils/constants';
import NotAvailable from './NotAvailable';
import toast from 'react-hot-toast';

export default React.memo(function Card({ movieData,category,selectedGenre,type,fetchData1 }) {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [typen,setTypen]=useState('');
  const [apiData, setApiData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLiked,setIsLiked]=useState(false);
  const navigate = useNavigate();
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`, 
    },
  };

  useEffect(() => {
    let url;
    if (selectedGenre) {
      url = `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=${category}`;
    } else {
      url = `${TMDB_BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
    }
    if (movieData){
      setTypen(movieData.type_n);
      url=`${TMDB_BASE_URL}/${movieData.type_n}/${movieData.movie_id}?api_key=${API_KEY}&language=en-US`;
    }

    console.log('Request URL:', url);

    fetch(url, options)
      .then(response => {
        console.log('Response Status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        if (data.results) {
          setApiData(data.results);
        } 
        else if(data){
          setApiData([data]);
        }else {
          console.error('No results found');
        }
      })
      .catch(err => console.error('Fetch error:', err));
    fetchGenres();
  }, [category, selectedGenre]);



  const fetchData=(id)=>{
    const login_id = localStorage.getItem('login_id');
    fetch(`http://localhost:5257/api/Liked?movie_id=${id}&login_id=${login_id}`)
        .then((response) => response.json())
        .then((json) => {
          if(json.length>0){
            setIsLiked(true);
          }
          else{
            setIsLiked(false);
          }
        });
  }

  const handleLiked=(id)=>{
    const login_id = localStorage.getItem('login_id');
    if(isLiked===false){
      setIsLiked(true)
      fetch(`http://localhost:5257/api/Liked?login_id=${login_id}&movie_id=${id}&type=${type?type:'movie'}`,{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              login_id:login_id,
              movie_id:id,
              type:type,
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          toast.success(result);
      },(error)=>{
          toast.error('failed');
      })}
    else{
      setIsLiked(false)
      fetch(`http://localhost:5257/api/Liked?login_id=${login_id}&movie_id=${id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            toast.success(result)
            fetchData1()
        },(error)=>{
            toast.error('Failed')
        })
    }
  }
  
  useEffect(()=>{
    if(hoveredMovie){
    fetchData(hoveredMovie);
    }
  },[hoveredMovie])


  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/${type=='tv'?'tv':'movie'}/list?api_key=${API_KEY}&language=en`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  

  const getGenreNames = (movie) => {
    if (movie.genre_ids) {
      return movie.genre_ids
        .map((id) => genres.find((genre) => genre.id === id)?.name || "")
        .filter(Boolean)
        .join(", ");
    } else if (movie.genres) {
      return movie.genres.map((genre) => genre.name).join(", ");
    }
    return "";
  };
  
  const fetchVideoUrl = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${type=='tv' || typen=='tv'?'tv':'movie'}/${movieId}/videos?api_key=${API_KEY}&language=en-US`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        setVideoUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`);
      } else {
        setVideoUrl(null);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      setVideoUrl(null);
    }
  };
  
  

  return (
    <>
      {apiData.length==0?<NotAvailable selectedGenre={selectedGenre}/>:""}
      {apiData.map((movie) => (
        <Container key={movie.id} onMouseEnter={() => {setHoveredMovie(movie.id); fetchVideoUrl(movie.id);}} onMouseLeave={() => setHoveredMovie(null)}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie" />
          <p>{type=='tv' || typen=='tv'?movie.name:movie.original_title}</p>
          {hoveredMovie==movie.id && (
            <div className='hover'>
              <div className='image-video-container'>
                {videoUrl && <iframe width='100%'
                    height='100%'
                    src={videoUrl}
                    title='YouTube Video'
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    muted
                    allowFullScreen></iframe>}
              </div>
              <div className='info-container flex column'>
                <h3 className='name' onClick={() => navigate(`/player/${movie.id}`)}>
                    {type=='tv' || typen=='tv'?movie.name:movie.original_title}
                </h3>
                <div className='icons flex j-between'>
                  <div className='controls flex'>
                    <IoPlayCircleSharp title="Play" onClick={() => navigate(`/player/${movie.id}`)} />
                    <RiThumbUpFill title="Like" />
                    <RiThumbDownFill title="Dislike" />
                    {isLiked ? (
                      <BsCheck title="Remove From List" onClick={()=>handleLiked(hoveredMovie)}/>
                    ) : (
                      <AiOutlinePlus title="Add to my list" onClick={()=>handleLiked(hoveredMovie)}/>
                    )}
                  </div>
                  <div className='info'>
                    <BiChevronDown title="More Info" />
                  </div>
                </div>
                <div className='genres flex'>
                  <ul className='flex'>
                  {getGenreNames(movie).split(', ').map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Container>
      ))}
    </>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  p{
    font-weight: 650;
  }
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        list-style: none;
        li {
          padding: 0.3rem 0.5rem;
          background-color: #333;
          color: #fff;
          border-radius: 0.3rem;
          }
        }
      }
    }
  }
`;
