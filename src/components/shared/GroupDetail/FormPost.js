import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AiFillCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import config from '../../../configs/Configs.json'
import uploadFile from '../../../images/icons/uploadFile.png'

import { useDispatch } from 'react-redux'
import { addPost, patchPost } from '../../../redux/posts/postsSlice'

const { AVATAR_DEFAULT_MALE, LONGITUDE_DEFAULT, LATITUDE_DEFAULT } = config

const FormPost = (props) => {
 const modalStyles = {
  content: {
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',

   width: '400px',
   height: 'max-content',
   background: '#1a1919',
   color: 'white',
   padding: '0 !important',
   border: 'none',
  },

  overlay: {
   background: 'rgba(0, 0, 0,.7)',
  },
 }

 const dispatch = useDispatch()
 const { groupId } = useParams()

 const { modal, hiddenModal } = props
 const { showModal, method, post } = modal

 const [formPost, setFormPost] = useState({
  content: '',
  image: null,
  title: '',
  file: '',
 })
 const { content, image, title, file } = formPost

 useEffect(() => {
  method === 'patch'
   ? setFormPost({
      content: post.Content,
      image: post.Photo,
      title: post.Title,
      file: '',
     })
   : setFormPost({ content: '', image: null, title: '', file: '' })
 }, [modal])

 const handleChangeFormPost = (e) => {
  if (e.target.name === 'image') {
   let file = e.target.files[0]
   const imageUrl = URL.createObjectURL(file)

   if (!file) return

   setFormPost({
    ...formPost,
    image: imageUrl,
    [e.target.name]: e.target.value,
   })
   return
  }

  setFormPost({ ...formPost, [e.target.name]: e.target.value })
 }

 const handleSubmitFormPost = (e) => {
  e.preventDefault()

  if (content.trim() === '' || title.trim() === '') return

  const data = {
   Content: content.trim(),
   PhotoURL: image ? [image] : null,
   Title: title.trim(),
   GroupID: groupId,
//    UpdatePostAt: new Date(),
   PostLatitude: LATITUDE_DEFAULT,
   PostLongitude: LONGITUDE_DEFAULT,
  }

  const postID = post.PostID

  method === 'post'
   ? dispatch(addPost(data))
   : dispatch(patchPost({ data, postID }))
  setFormPost({
   content: '',
   image: null,
   title: '',
   file: '',
  })
  hiddenModal()
 }

 return (
  <Modal
   isOpen={showModal}
   style={modalStyles}
   ariaHideApp={false}
   contentLabel='Modal Form'
  >
   <div className='flex p-2 relative justify-center border-b-white border-b border-solid'>
    <h2>{method === 'post' ? 'Create' : 'edit'} post</h2>
    <button
     className='absolute right-2 top-[50%] translate-y-[-50%] text-lg text-white'
     onClick={hiddenModal}
     type='button'
    >
     <AiFillCloseCircle />
    </button>
   </div>

   <form className='p-5' onSubmit={handleSubmitFormPost}>
    <div className='flex gap-2 items-center'>
     <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
      <img src={AVATAR_DEFAULT_MALE} alt='avatar user' />
     </div>
     <h2>Nguyen Dang tien</h2>
    </div>

    <input
     className='mt-3 focus-visible:outline-none bg-transparent'
     type='text'
     name='title'
     placeholder='Tiêu đề'
     onChange={handleChangeFormPost}
     value={title}
    />

    <textarea
     type='text'
     id='textarea-post'
     placeholder='Nội dung'
     className='min-h-[50px] my-3 bg-transparent w-full focus-visible:outline-none'
     value={content}
     onChange={handleChangeFormPost}
     name='content'
    />

    {image && (
     <div className='relative rounded-lg overflow-hidden h-[150px]'>
      <img
       className='h-full w-full object-cover object-center'
       src={image}
       alt='postImage'
      />

      <button
       className='text-xl absolute right-2 top-2 text-gray-900 hover:text-black transition'
       onClick={() => setFormPost({ ...formPost, image: null })}
       type='button'
      >
       <AiFillCloseCircle />
      </button>
     </div>
    )}

    <div className='relative my-3 w-max bg-[#303030] py-2 px-5 rounded-md'>
     <div className='flex gap-1'>
      <img src={uploadFile} alt='upload file' />
      <spa>Ảnh/Video</spa>
     </div>

     <input
      onChange={handleChangeFormPost}
      className='absolute z-10 inset-0 opacity-0 focus-visible:outline-none'
      type='file'
      name='file'
      value={file}
     />
    </div>

    <button className='bg-success w-full rounded-md py-2' type='submit'>
     Post
    </button>
   </form>
  </Modal>
 )
}

export default FormPost
