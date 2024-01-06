import React from 'react'
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns'

const Post = ({title, description, image, createdAt, author, _id}) => {
  return (
      <div className='card my-3 mx-2' style={{maxWidth: '400px', fontSize: '.75rem'}}>
        <div className='row g-0'>
            <div className='col-md-12 d-flex align-items-center m-1'>
              <Link to={'/profile/' + author.username} className='text-decoration-none text-dark d-flex align-items-center'>
                <img src={author.profilePicture} className='img-fluid rounded-circle me-2' style={{height: '35px', width: '35px'}} alt={author.username} />
                <p className='text-center mb-0 fw-medium'>{author.username}</p>
              </Link>
              <p className='text-center mb-0 mx-1'>•</p>
              <p className='text-center mb-0'>{formatDistanceToNow(new Date(createdAt))} ago</p>  
            </div>
            <Link to={'/post/' + _id} className='text-decoration-none text-dark'>
              <div>
                <img src={image} className='img-fluid w-100' style={{height: '350px'}} alt={title} />
              </div>
            <div className='col-md-12'>
              <div className='card-body'>
                <h5 className='card-title '>{title}</h5>
                <p className='card-text'>{description}</p>
              </div>
            </div>
            </Link>   
        </div>
      </div>
  )
}

export default Post
