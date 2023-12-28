import React from 'react'
import Cookies from 'js-cookie'

import '../styles/Profile.scss'

const Profile = () => {
  const token = Cookies.get('token');
  let base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  while (base64Payload.length % 4 !== 0) {
    base64Payload += '=';
   }
   const payload = JSON.parse(atob(base64Payload));

   //user's information
    const username = payload.username;
    const email = payload.email;
    const firstName = payload.firstName;
    const lastName = payload.lastName;
    const password = payload.password;

    function logout() {
      Cookies.remove('token');
      window.location.href = '/login';
    }
  return (
    <>
      {
        token ? (
          <div className="container-fluid d-flex justify-content-center align-items-center flex-column vh-100">
            <div className=' col-10 d-flex justify-content-center align-items-center profile-box rounded-4 flex-column'>
              <h1 className='my-3'>Your Profile</h1>
              <hr className="w-100 line" />
              <div className="d-flex flex-column">
                <p><span>Name:</span> {firstName} {lastName}</p>
                <p><span>Email:</span> {email}</p>
                <p><span>Username:</span> {username}</p>
                <p><span>Password:</span> {password}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-row">
                <button className="btn btn-danger my-3 mx-2" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger my-3" role="alert" id='error'>
              You are not logged in
          </div>
            )
        }
    </>
  )
}

export default Profile
