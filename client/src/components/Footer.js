import React from 'react'

const Footer = () => {
  return (
    <>
      <nav className="navbar fixed-bottom" style={{backgroundColor: '#EDE1D1'}}>
        <div className="container-fluid d-flex align-items-center">
            <p className="text-center mb-0">Created by <a href='https://github.com/bradyhendu' rel="noopener noreferrer" style={{color: '#6A704C'}} target='_blank'>Brady Henderson</a> © 2023</p>     
            <button type="button" onClick={() => window.open('https://github.com/bradyhendu/bloggyhendu/issues', '_blank')} className="btn btn-outline-danger btn-sm">Report a Bug</button>
        </div>
      </nav>
    </>
  )
}

export default Footer
