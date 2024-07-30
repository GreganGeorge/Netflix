import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { useAuth } from '../pages/AuthContext'; 

export default function Navbar ({isScrolled}) {
    const links=[
        {name:"Home",link:'/'},
        {name:"TV Shows",link:'/tv'},
        {name:"Movies",link:'/movies'},
        {name:"My List",link:'/mylist'},
    ];
    const [showSearch,setShowSearch]=useState(false);
    const [inputHover,setInputHover]=useState(false);
    const { loggedIn, logout,login } = useAuth(); 
  return (
    <Container>
        <nav className={`flex ${isScrolled?"scrolled":""}`}>
            <div className='left flex a-center'>
                <div className='brand flex a-center j-center'>
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <ul className='links flex'>
                    {links.map(({name,link})=>{
                        return(
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='right flex a-center'>
                <div className={`search ${showSearch?"show-search":""}`}>
                    <button onFocus={()=>setShowSearch(true)} 
                    onBlur={()=>{
                        if(!inputHover)
                        {
                            setShowSearch(false);
                        }
                    }}>
                        <FaSearch/>
                    </button>
                    <input type="text" placeholder='Search' onMouseEnter={()=>setInputHover(true)}
                    onMouseLeave={()=>setInputHover(false)}
                    onBlur={()=>{setShowSearch(false); setInputHover(false);}}/>
                </div>
                {loggedIn?<button onClick={logout}>Sign Out</button>:<button onClick={login}>Sign In</button>}
            </div>
        </nav>
    </Container>
  )
}

const Container=styled.div`
    .scrolled{
        background-color:black;
    }
    nav{
        position:sticky;
        top:0;
        height:6.5rem;
        width:100%;
        justify-content:space-between;
        position:fixed;
        z-index:2;
        padding:0 4rem;
        align-items:center;
        transition:0.3s ease-in-out;
        .left{
            gap:5rem;
            .brand{
                img{
                    height:4rem;
                }
            }
            .links{
                list-style-type:none;
                gap:2rem;
                font-size:1.2rem;
                li{
                    a{
                        color:white;
                        text-decoration:none;
                    }
                }
            }
        }
        .right{
            gap:1rem;
            button{
                padding: 0.5rem 1rem;
                background-color:#e50914;
                border:none;
                cursor:pointer;
                color:white;
                border-radius:0.2rem;
                font-weight:bolder;
                font-size:1.1rem;
              }
            .search{
                display:flex;
                gap:0.4rem;
                align-items:center;
                justify-content:center;
                padding:0.2rem;
                padding-left:0.5rem;
                button{
                    background-color:transparent;
                    svg{
                        color:white;
                    }
                }
                input{
                    width:0;
                    opacity:0;
                    visibility:hidden;
                    transition:0.3s ease-in-out;
                    background-color:transparent;
                    border:none;
                    color:white;
                    &:focus{
                        outline:none;
                    }    
                }
            }
            .show-search{
                border:1px solid white;
                background-color:rgba(0,0,0,0.6);
                input{
                    width:100%;
                    opacity:1;
                    visibility:visible;
                    padding:0.3rem;
                }
            }
        }
    }
`;