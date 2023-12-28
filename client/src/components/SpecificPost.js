import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns'


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
      This is my specific post
    </div>
  )
}

export default SpecificPost
