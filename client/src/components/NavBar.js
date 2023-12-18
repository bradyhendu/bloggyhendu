import React from 'react'
import logo from '../images/logo.png'
import '../styles/NavBar.scss'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light navbar-content">
        <div className='container-fluid'>
            <a className="navbar-brand" href="#">
                <img src={logo} width="125" height="30" alt="" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    <a class="nav-link" href="#">Features</a>
                    <a class="nav-link" href="#">Pricing</a>
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
