import React from 'react'
import '../styles/Login.scss'

const Login = () => {
  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className=' col-6 d-flex justify-content-center align-items-center login-box rounded-4 '>
                <form className='d-flex flex-column'>
                    <h1 className="text-center">Login</h1>
                    <input type="text" placeholder="Username" className="form-control my-3 " />
                    <input type="password" placeholder="Password" className="form-control my-3" />
                    <button className="btn custom-bg my-3">Login</button>
                    <p className="text-center">Don't have an account? <a href="/register">Register</a></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
