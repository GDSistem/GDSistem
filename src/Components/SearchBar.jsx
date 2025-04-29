import React from 'react'
import '../Styles/SearchBar.css'
import { IoSearch } from "react-icons/io5";


function SearchBar() {
  return (
    <div className='container'>
        <IoSearch className="search-icon"/>
        <input type="text" placeholder='Busca lo que desee...' className='search-box' />
    </div>
  )
}

export default SearchBar