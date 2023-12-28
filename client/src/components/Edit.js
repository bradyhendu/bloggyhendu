import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Editor from './Editor'

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id).then(res => 
            res.json().then(post => 
                {setTitle(post.title); 
                setDescription(post.description); 
                setContent(post.content)}
            )
        )
    }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set('title', title);
      data.set('description', description);
      data.set('content', content);
      data.set('id', id);
      if (file) {
        data.set('file', file);
      }
      const response = await fetch('http://localhost:4000/edit', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.status === 200) {
        window.location.replace('/post/' + id);
      } else {
        setError('Something went wrong, ensure all fields are filled out correctly (fields must have at least 2 characters)');
      }
    } catch (err) {
      setError('Something went wrong, ensure all fields are filled out correctly (fields must have at least 2 characters)');
    }
  }

  return (
    <>
      <form className='d-flex justify-content-center flex-column mx-4 my-5 blog-post' onSubmit={updatePost}>
        <label>Title:</label>
        <input 
          type="text" 
          className='my-2' 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <input 
          type="text" 
          className='my-2' 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)}
          required
        />
        <label>Image:</label>
        <input 
          type="file" 
          className='my-2' 
          placeholder="Image" 
          accept="image/*" 
          onChange={e => setFile(e.target.files[0])}
        />
        <Editor content={content} onChange={setContent} />
        <button className='btn my-2'>Update Post</button>
      </form>
      {error && <p className='text-danger text-center'>{error}</p>}
    </>
  )
}

export default Edit
