import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'
import Cookies from 'js-cookie'

const SpecificPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const token = Cookies.get('token');
    let base64Payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64Payload.length % 4 !== 0) {
        base64Payload += '=';
    }
    const payload = JSON.parse(atob(base64Payload));

    //user's username
    const username = payload.username;
    

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id).then(res => 
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
                    <img src={'http://localhost:4000/' + post.image} className='img-fluid rounded w-75 object-cover'  style={{maxHeight:'500px', maxWidth: '500px'}} alt={post.title} />
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
