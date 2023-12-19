import React, {useState} from 'react'

import '../styles/Register.scss'

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  function register(e) {
    e.preventDefault();
    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, firstName, lastName, email})
    })
  }

  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className=' col-6 d-flex justify-content-center align-items-center register-box rounded-4 '>
                <form className='d-flex flex-column' onSubmit={register}>
                    <h1 className="text-center my-2">Register</h1>
                    <small className="text-center">Welcome to bloggyhendu! Please create an account below</small>
                    <hr className="w-100" />
                    <input type="text" placeholder="First Name" value={firstName} className="form-control my-3" onChange={e => setFirstName(e.target.value)}/>
                    <input type="text" placeholder="Last Name" value={lastName} className="form-control my-3" onChange={e => setLastName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} className="form-control my-3" onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Username" value={username} className="form-control my-3" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} className="form-control my-3" onChange={e => setPassword(e.target.value)}/>
                    <button className="btn custom-bg my-3">Register</button>
                    <p className="text-center">Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Register
