import React, { useEffect, useState } from 'react'
import Post from './Post'

const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then(res => 
            res.json().then(posts => 
                setPosts(posts)
            )
        )
    }, []);

  return (
    <div className='my-3 d-flex align-items-center flex-column vh-100'>
        {posts.length > 0 && posts.map(post => (
            <Post key={post._id} {...post}/>
        ))}
    </div>
  )
}

export default HomePage
