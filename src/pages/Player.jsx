import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { TMDB_BASE_URL, API_KEY } from '../utils/constants';
import axios from 'axios';

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');

  const getVideo = async (movieId) => {
    const { data: { results } } = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const trailer = results.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const url = await getVideo(id);
      setVideoUrl(url);
    };
    fetchVideo();
  }, [id]);

  return (
    <Container>
      <div className='player'>
        <div className='back'>
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {videoUrl && (
          <iframe
            src={videoUrl}
            title='trailer'
            frameBorder={0}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    iframe {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
