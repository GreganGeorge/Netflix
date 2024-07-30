import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function UserLiked () {
    const [isScrolled,setIsScrolled]=useState(false);
    const [data,setData]=useState([]);
    const navigate=useNavigate();

    window.onscroll=()=>{
        setIsScrolled(window.scrollY===0?false:true);
        return()=>(window.onscroll=null);
    }
    const fetchData=async()=>{
        const login_id=localStorage.getItem('login_id')
        const url = `http://localhost:5257/api/Liked/Get2?login_id=${login_id}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    useState(()=>{
        fetchData()
    },[])
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        {data.length===0?(<h6>List is Empty</h6>):
        <div className="grid flex">
          {data.map((movie) => {
            return (
              <Card movieData={movie} fetchData1={fetchData}/>
            );
          })}
        </div>}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    h6{
      margin-top:10rem;
      font-weight: 650;
      font-size:2.4rem;
      text-align:center;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;