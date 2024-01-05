import React, {useState} from 'react'

import '../styles/Login.scss'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [token, setToken] = useState(null);

  async function login(e) {
    e.preventDefault();
    const response = await fetch('https://bloggyhendu-1dfd9d591b8b.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}),
      credentials: 'include'
    });

    if(response.status === 200){
      response.json().then(data => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      });
      window.location.href = '/';
    } else if (response.status === 401){
      setError('Invalid credentials');
      document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
    } else {
      setError('Something went wrong');
      document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
    }
  }
  return (
    <>
        {
            token ? (
            <div className="alert alert-danger my-3" role="alert" id='error'>
                You are already logged in
            </div>
            ) : (
              <div className="container-fluid d-flex justify-content-center align-items-center flex-column vh-100">
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
                <div id='bottom'> </div> 
                {
                    error && 
                    <div className="alert alert-danger my-3" role="alert" id='error'>
                        {error}
                    </div>
                }
              </div>
            )
        }
    </>
  )
}

export default Login
