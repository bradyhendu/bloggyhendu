import React from 'react'
import { formatISO9075 } from 'date-fns'

const Post = ({title, description, content, image, createdAt, author}) => {
  return (
    <div className='card my-3 mx-2' style={{maxWidth: '500px'}}>
      <div className='row g-0'>
          <div>
          <img src={'http://localhost:4000/' + image} className='img-fluid rounded w-100' style={{height: '350px'}} alt={title} />
          </div>
        <div className='col-md-10'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
            <p className='card-text'><small className='text-muted'>Posted on {formatISO9075(new Date(createdAt))} by {author.firstName + ' ' + author.lastName}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
