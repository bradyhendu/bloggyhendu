import React from 'react'

const Post = ({title, description, content, image, createdAt}) => {
  return (
    <div className=''>
      <div className='card mb-3'>
        <img src={image} className='card-img-top' alt={title} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'><small className='text-muted'>Created on {new Date(createdAt).toLocaleDateString()}</small></p>
        </div>
      </div>
    </div>
  )
}

export default Post
