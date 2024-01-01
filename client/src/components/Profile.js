import React, {useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'



import '../styles/Profile.scss'

const Profile = () => {
  let { username } = useParams();
  const [user, setUser] = React.useState(null);
  
  let token;
  let tokenUsername;

  token = Cookies.get('token');
  let base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  while (base64Payload.length % 4 !== 0) {
      base64Payload += '=';
  }
  const payload = JSON.parse(atob(base64Payload));
  tokenUsername = payload.username;//for checking the token's username against the username in the url (for the password)

  useEffect(() => {
    fetch('http://localhost:4000/user/' + username).then(res => 
        res.json().then(user => 
            setUser(user)
        )
    )
  }, [username]);

    function logout() {
      Cookies.remove('token');
      window.location.href = '/login';
    }

  return (
    <>
      {
        user ? (
          <div className="container-fluid d-flex justify-content-center align-items-center flex-column vh-100">
            <div className=' col-10 d-flex justify-content-center align-items-center profile-box rounded-4 flex-column'>
              <h1 className='my-3'>Your Profile</h1>
              <hr className="w-100 line" />
              <div className="d-flex flex-column">
                <p><span>Name:</span> {user.firstName} {user.lastName}</p>
                <p><span>Email:</span> {user.email}</p>
                <p><span>Username:</span> {user.username}</p>
                <p><span>Password:</span> {user.password}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-row">
                <button className="btn btn-danger my-3 mx-2" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger my-3" role="alert" id='error'>
              Could not find user.
          </div>
            )
        }
    </>
  )
}

export default Profile
