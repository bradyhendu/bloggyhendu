import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

const Delete = () => {
  const { id } = useParams();
  const [error, setError] = useState('');

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/delete/' + id, {
        method: 'DELETE',
        credentials: 'include'
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
