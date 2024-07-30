import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email,setEmail]=useState('');
    const navigate=useNavigate();
    const [password,setPassword]=useState('');
    const HandleLogin=()=>{
        fetch(`http://localhost:5257/api/user?password=${password}&email=${email}`)
        .then((response) => response.json())
        .then((json) => {
          if(json.length>0){
            toast.success("Logged in");
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('login_id',json[0].u_id)
            navigate(`/`); 
          }
          else{
            toast.error("Incorrect credentials");
          }
        });
    }
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          HandleLogin();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [email,password]);

    const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    }
  return (
    <Container>
      <BackgroundImage/>
      <div className='content'> 
        <Header/>
        <div className='form-container flex column a-center j-center'>
          <div className='form flex column a-center j-center'>
            <div className='title'>
              <h3>Login</h3>
            </div>
            <div className='container flex column'>
              <input type='email' placeholder='Email Address' name='email' value={email} 
              onChange={changeEmail}/>
              <input type='password' placeholder='Password' name='password' value={password}
              onChange={changePassword}/>
              <button onClick={HandleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container=styled.div`
    position:relative;
    .content{
        position:absolute;
        top:0;
        left:0;
        background-color:rgba(0,0,0,0.5);
        height:100vh;
        width:100vw;
        display:grid;
        grid-template-rows:15vh 85vh;
        .form-container{
          gap:2rem;
          height:85vh;
          .form{
            padding:5rem;
            background-color:#000000b0;
            width:25vw;
            gap:2rem;
            color:white;
            .title{
              font-size:2.5rem;
            }
            .container{
              gap:2rem;
              input{
                padding:0.8rem 1rem;
                width:15rem;
              }
              button{
                padding: 0.8rem 1rem;
                background-color:#e50914;
                border:none;
                cursor:pointer;
                color:white;
                border-radius:0.2rem;
                font-weight:bolder;
                font-size:1.05rem;
              }
            }
          }
        }
    }
`;