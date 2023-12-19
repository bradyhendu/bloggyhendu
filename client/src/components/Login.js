import React, {useState} from 'react'
import '../styles/Login.scss'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
  }
  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className=' col-6 d-flex justify-content-center align-items-center login-box rounded-4 '>
                <form className='d-flex flex-column' onSubmit={login}>
                    <h1 className="text-center my-2">Login</h1>
                    <small className="text-center">Please enter your username and password</small>
                    <hr className="w-100" />
                    <input type="text" placeholder="Username" value={username} className="form-control my-3 " onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} className="form-control my-3" onChange={e => setPassword(e.target.value)}/>
                    <button className="btn custom-bg my-3">Login</button>
                    <p className="text-center">Don't have an account? <a href="/register">Register</a></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login
