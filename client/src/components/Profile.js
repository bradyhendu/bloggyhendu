import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'

import Post from './Post'



import '../styles/Profile.scss'

const Profile = () => {
  let { username } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  
  let token;
  let tokenUsername;

  if(Cookies.get('token')){
    token = Cookies.get('token');
    let base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64Payload.length % 4 !== 0) {
        base64Payload += '=';
    }
    const payload = JSON.parse(atob(base64Payload));
    tokenUsername = payload.username;//for checking the token's username against the username in the url (for the password)
  }

  useEffect(() => {
    fetch('http://localhost:4000/user/' + username).then(res => 
      res.json().then(data => {
        if(data.user){
          setUser(data.user);
          setUserPosts(data.user.userPosts);
        }
      }).catch(err => console.log(err))
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
          <div className="container-fluid d-flex justify-content-center align-items-center flex-column my-5 w-75">
              <div className="d-flex justify-content-center align-items-center flex-row">
                <img src={'http://localhost:4000/' + user.profilePicture} className='img-fluid rounded-circle mx-3' style={{height: '125px', width: '125px'}} alt={user.username} />
                <div className='d-flex flex-column'>
                  <h1 className='my-3'>{user.username}'s Profile</h1>
                  <div className='d-flex flex-row'>
                    <small className='mx-2'><span>Name:</span> {user.firstName} {user.lastName}</small>
                    <small className='mx-2'><span>Email:</span> {user.email}</small>
                  </div>
                </div>
              </div>
              {tokenUsername === username &&
                <div className="d-flex justify-content-center align-items-center flex-row">
                  <button className="btn btn-secondary my-3 mx-2" onClick={() => window.location.href = '/profile/edit/' + username}>Edit Profile</button>
                  <button className="btn btn-danger my-3 mx-2" onClick={logout}>Logout</button>
                </div>
              }
              <hr className="w-100 line" />
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h3 className='my-3'>Posts</h3>
                <div className="d-flex flex-wrap justify-content-center align-items-center flex-row">
                {userPosts.length > 0 && userPosts.map(post => (
                  <Post key={post._id} {...post}/>
                ))}
                {userPosts.length === 0 && 
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <h2 className='text-center text-muted'>This user has no posts yet, check back later</h2>
                    </div>
                }
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
