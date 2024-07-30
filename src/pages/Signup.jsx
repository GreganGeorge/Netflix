import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import toast from 'react-hot-toast';

export default function Signup() {
    const [showPassword,setShowPassword]=useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSignUp=()=>{
        var proceed=true;
        if(email=="" || password=="")
        {
            proceed=false;
        }
        if(proceed==true)
        {
            var user={};
            user.email=email;
            user.password=password;
            fetch("http://localhost:5257/api/User",{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                toast.success("Account Created.Please Login.");
            },(error)=>{
                toast.error("Error");
            })
        }
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changePassword=(e)=>{
        setPassword(e.target.value);
    }
  return (
    <Container showPassword={showPassword}>
        <BackgroundImage/>
        <div className='content'>
            <Header login/>
            <div className='body flex column a-center j-center'>
                <div className='text flex column'>
                    <h1>Unlimited movies, TV shows and more</h1>
                    <h4>Watch anywhere. Cancel anytime.</h4>
                    <h6>Ready to watch? Enter your email to create a new account</h6>
                </div>
                <div className='form'>
                    <input type='email' placeholder='Email Address' name='email' value={email} 
                    onChange={changeEmail}/>
                    {showPassword && (<input type='password' placeholder='Password' name='password' value={password}
                    onChange={changePassword}/>)}
                    {!showPassword && (<button onClick={()=>setShowPassword(true)}>Get Started</button>)}
                </div>
                <button onClick={handleSignUp}>Sign Up</button>
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
        .body{
            gap:1rem;
            .text{
                gap:1rem;
                text-align:center;
                font-size:2rem;
                h1{
                    padding:0 25rem;
                }
            }
            .form{
                display:grid;
                grid-template-columns:${({showPassword})=>showPassword?"1fr 1fr":"2fr 1fr"};
                width:60%;
                input{
                    color:black;
                    border:none;
                    padding:1.5rem;
                    font-size:1.2rem;
                    border:1px solid black;
                    &:focus{
                        outline:none;
                    }
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color:#e50914;
                    border:none;
                    cursor:pointer;
                    color:white;
                    font-weight:bolder;
                    font-size:1.05rem;
                }
            }
            button{
                padding: 0.5rem 1rem;
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
`;