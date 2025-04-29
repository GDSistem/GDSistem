import React, { useState, useEffect } from 'react'
import '../Styles/ContentHeader.css';
import Profile from './Profile';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

function ContentHeader() {
  return (
    <div className='header'>
        <SearchBar/>
        <Profile/>

    </div>
  )
}

export default ContentHeader