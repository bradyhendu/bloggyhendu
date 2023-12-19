import React, {useState} from 'react'

import '../styles/Register.scss'

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function register(e) {
    e.preventDefault();
      const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password, firstName, lastName, email})
      });

      if(response.status === 200){
          window.location.href = '/login';
      } else if (response.status === 400){
          setError('Username or email already exists');
          document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
      } else {
          setError('Something went wrong');
          document.getElementById('bottom').scrollIntoView({behavior: "smooth"});
      }
    }

  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column vh-100">
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
            <div id='bottom'></div>    
            {
                error && 
                <div className="alert alert-danger my-3" role="alert" id='error'>
                    {error}
                </div>
            }
        </div>
    </>
  )
}

export default Register
