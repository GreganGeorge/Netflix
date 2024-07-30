import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Netflix from './pages/Netflix'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './pages/AuthContext'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import UserLiked from './pages/UserLiked'

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return (
    <BrowserRouter>
    <AuthProvider isAuthenticated={isAuthenticated}>
    <Toaster/>
    <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/player/:id" element={<Player/>}/>
        <Route exact path="/movies" element={<Movies/>}/>
        <Route exact path="/tv" element={<TVShows/>}/>
        <Route exact path="/mylist" element={<UserLiked/>}/>
        <Route exact path="/" element={<Netflix/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App