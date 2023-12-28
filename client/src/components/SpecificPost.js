import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'


const SpecificPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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
            <div className='my-3 mx-3' style={{ fontFamily: 'Roboto' }}>
                <h1 className='text-center'>{post.title}</h1>
                <h5 className='text-center text-muted'>Posted on {format(new Date(post.createdAt), 'MM/dd/yyyy')} by {post.author.firstName + ' ' + post.author.lastName}</h5>
                <div className='d-flex justify-content-center my-2'>
                    <img src={'http://localhost:4000/' + post.image} className='img-fluid rounded w-75' alt={post.title} />
                </div>
                <h4 className='text-center'>{post.description}</h4>
                <div style={{fontSize: '18px'}} dangerouslySetInnerHTML={{__html:post.content}}></div>
            </div>
        }
    </div>
  )
}

export default SpecificPost
