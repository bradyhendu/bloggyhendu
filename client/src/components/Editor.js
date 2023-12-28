import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = ({content, onChange}) => {
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
  return (
    <ReactQuill className='my-2' 
      value={content} 
      modules={modules} 
      formats={formats} 
      placeholder="Write something amazing..." 
      onChange={onChange}
      required
    />
  )
}

export default Editor
