import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode';

const SpecificPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    
    let token;

    let username = '';
    if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        username = decoded.username;
    }
    

    useEffect(() => {
        fetch('https://bloggyhendu-1dfd9d591b8b.herokuapp.com/post/' + id).then(res => 
            res.json().then(post => 
                setPost(post)
            )
        )
    }, [id]);

  return (
    <div>
        {post &&
            <div className='my-3 mx-5' style={{ fontFamily: 'Roboto' }}>
                <h1 className='text-center'>{post.title}</h1>
                <h5 className='text-center text-muted'>Posted on {format(new Date(post.createdAt), 'MM/dd/yyyy')} by {post.author.firstName + ' ' + post.author.lastName}</h5>
                {username === post.author.username &&
                    <div className='d-flex justify-content-center'>
                        <a href={'/edit/' + post._id} className='btn btn-secondary my-3 mx-2'>Edit</a>
                        <a href={'/delete/' + post._id} className='btn btn-danger my-3 mx-2'>Delete</a>
                    </div>
                }
                <div className='d-flex justify-content-center my-2'>
                    <img src={post.image} className='img-fluid rounded w-75 object-cover'  style={{maxHeight:'500px', maxWidth: '500px'}} alt={post.title} />
                </div>
                <h4 className='text-center'>{post.description}</h4>
                <hr />
                <div dangerouslySetInnerHTML={{__html:post.content}}></div>
            </div>
        }
    </div>
  )
}

export default SpecificPost
