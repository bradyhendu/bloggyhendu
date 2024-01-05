import React from 'react'
import logo from '../images/logo.png'
import Cookies from 'js-cookie'

import '../styles/NavBar.scss'

const NavBar = () => {
    let username = '';
    let token;
    if(Cookies.get('token')) {
        token = Cookies.get('token');
        if(token){
            let base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            while (base64Payload.length % 4 !== 0) {
                base64Payload += '=';
            }
            const payload = JSON.parse(atob(base64Payload));
            username = payload.username;
        }
    }

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
                    {token ? (
                        <>
                            <a className="nav-link" aria-current="page" href="/create">Create Post</a>
                            <a className="nav-link" aria-current="page" href={'/profile/' + username}>Profile</a>
                        </>
                    ) : (
                        <>
                            <a className="nav-link" aria-current="page" href="/login">Login</a>
                            <a className="nav-link" href="/register">Register</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
