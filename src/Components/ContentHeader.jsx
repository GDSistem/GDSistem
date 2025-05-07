import React, { useState, useEffect } from 'react'
import '../Styles/ContentHeader.css';
import Profile from './Profile';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

function ContentHeader({ user, onLogout }) {
  return (
    <div className='header'>
        <SearchBar/>
        <Profile user={user} onLogout={onLogout}/>

    </div>
  )
}

export default ContentHeader