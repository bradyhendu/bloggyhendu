import React from 'react'

import '../styles/Register.scss'

const Register = () => {
  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className=' col-6 d-flex justify-content-center align-items-center register-box rounded-4 '>
                <form className='d-flex flex-column'>
                    <h1 className="text-center my-2">Register</h1>
                    <small className="text-center">Welcome to bloggyhendu! Please create an account below</small>
                    <hr className="w-100" />
                    <input type="text" placeholder="First Name" className="form-control my-3 " />
                    <input type="text" placeholder="Last Name" className="form-control my-3 " />
                    <input type="email" placeholder="Email" className="form-control my-3 " />
                    <input type="text" placeholder="Username" className="form-control my-3 " />
                    <input type="password" placeholder="Password" className="form-control my-3" />
                    <button className="btn custom-bg my-3">Register</button>
                    <p className="text-center">Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Register
