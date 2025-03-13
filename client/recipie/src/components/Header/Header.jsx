import React from 'react'
import './Header.scss'
import { Link, Navigate } from 'react-router-dom';

function Header() {
  return (
    <>
    <div className="header__container">
        <div className="header_left">
            <h1>Random Recipe Generator</h1>
        </div>
        <div className="header_right">
            <Link to='/'><p className='home'>HOME</p></Link>
            <Link to='/saved'><p className='saved'>SAVED</p></Link>
        </div>
    </div>
    </>
  )
}

export default Header