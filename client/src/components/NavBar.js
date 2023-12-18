import React from 'react'
import logo from '../images/logo.png'
import '../styles/NavBar.scss'

const NavBar = () => {

    

  return (
    <nav className="navbar navbar-expand-md navbar-light navbar-content">
        <div className='container-fluid'>
            <a className="navbar-brand" href="/">
                <img src={logo} width="125" height="30" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                <div className="navbar-nav">
                    <a className="nav-link" aria-current="page" href="/login">Login</a>
                    <a className="nav-link" href="/register">Register</a>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
