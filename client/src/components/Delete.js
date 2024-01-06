import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

const Delete = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const token = useState(localStorage.getItem('token') || '');

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bloggyhendu-1dfd9d591b8b.herokuapp.com/delete/' + id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
      });

      if (response.status === 200) {
        window.location.replace('/');
      } else {
        setError('Something went wrong, try again later');
      }
    } catch (err) {
      setError('Something went wrong, try again later');
    }
  }

  return (
    <div className='container-md d-flex justify-content-center align-items-center flex-column vh-100'>
      <h3>Are you sure you want to delete your post?</h3>
      <div className='my-3'>
        <a href={'/post/' + id} className='btn btn-secondary mx-4'>Cancel</a>
        <button className='btn btn-danger mx-4' onClick={deletePost} >Delete</button>
      </div>
      {error && 
        <div className="alert alert-danger my-3" role="alert" id='error'>
          {error}
        </div>
      }
    </div>
  )
}

export default Delete
