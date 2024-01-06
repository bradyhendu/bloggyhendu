import React, {useState} from 'react'

import '../styles/Create.scss'
import Editor from './Editor'

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';  

  const createNewPost = async (e) => {
    e.preventDefault();
    try {

      const data = new FormData();
      data.set('title', title);
      data.set('description', description);
      data.set('content', content);
      data.set('file', file);
      data.set('token', token);
      console.log(token);

      const response = await fetch('https://bloggyhendu-1dfd9d591b8b.herokuapp.com/post', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.status === 200) {
        window.location.replace('/');
      } else {
        setError('Something went wrong, ensure all fields are filled out correctly (fields must have at least 2 characters)');
      }
    } catch (err) {
      setError('Something went wrong, ensure all fields are filled out correctly (fields must have at least 2 characters)');
    }


  }
  return (
    <>
      <form className='d-flex justify-content-center flex-column mx-4 my-5 blog-post' onSubmit={createNewPost}>
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
          required
        />
        <Editor content={content} onChange={setContent} />
        <button className='btn my-2'>Publish my Post</button>
      </form>
      {error && <p className='text-danger text-center'>{error}</p>}
    </>
  )
}

export default Create
