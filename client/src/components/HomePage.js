import React, { useEffect, useState } from 'react'
import Post from './Post'
import Footer from './Footer';

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
    <>
        <div className='my-3 d-flex align-items-center flex-column pb-5'>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post}/>
            ))}
            {posts.length === 0 && 
                <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
                    <h2 className='text-center text-muted'>No posts yet, check back later</h2>
                    <h5 className='text-center text-muted'>Or <a href='/create' style={{color: '#6A704C'}}>create one</a> yourself!</h5>
                </div>
            }
        </div>
        <Footer />
    </>
  )
}

export default HomePage
