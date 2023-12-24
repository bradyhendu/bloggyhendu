import React, {useState} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import '../styles/Create.scss'

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      ['code-block']
    ]
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'code-block'
  ]

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set('title', title);
      data.set('description', description);
      data.set('content', content);
      data.set('file', file);
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
      });
    } catch (err) {
      console.error(err.message);
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
        <ReactQuill className='my-2' 
          value={content} 
          modules={modules} 
          formats={formats} 
          placeholder="Write something amazing..." 
          onChange={newValue => setContent(newValue)}
          required
        />
        <button className='btn my-2'>Publish my Post</button>
      </form>
    </>
  )
}

export default Create
