import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Moment from 'react-moment'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
 addLikePost,
 fetchPosts,
 postsSelector,
} from '../../redux/posts/postsSlice'

import { AiFillCloseCircle } from 'react-icons/ai'

import dongco from '../../images/dongco.png'
import btnPost from '../../images/icons/btn-post.png'
import btnlike from '../../images/icons/btnlike.png'
import heart from '../../images/icons/heart.png'
import uploadFile from '../../images/icons/uploadFile.png'

import { Auth } from './Auth'

import config from '../../configs/Configs.json'

const { AVATAR_DEFAULT_FEMALE, API__SERVER } = config
const { userID } = new Auth()

const GroupDetail = () => {
 const { groupId } = useParams()
 const [postList, setPostList] = useState([])

 const { posts, changeTogglePosts } = useSelector(postsSelector)
 const dispatch = useDispatch()

 useEffect(() => {
  dispatch(fetchPosts(groupId))
 }, [changeTogglePosts, groupId])

 useEffect(() => {
  const newPosts = []
  posts.length > 0
   ? posts.forEach(async (post, index) => {
      const comments = await getComments(post.PostID)
      const newPost = { ...post, comments }
      newPosts.push(newPost)

      if (index === posts.length - 1) setPostList(newPosts)
     })
   : setPostList(newPosts)
 }, [posts])

 const getComments = async (postId) => {
  const { data } = await axios.get(
   `${API__SERVER}/forum/comment/${postId}/${userID}`
  )
  return data.Comments
 }

 const [formPost, setFormPost] = useState({ content: '', image: null, title: '' })
 const { content, image, title } = formPost

 const handleChangeFormPost = (e) => {
  if (e.target.name === 'image') {
   let file = e.target.files[0]
   const imageUrl = URL.createObjectURL(file)

   if (!file) return

   setFormPost({ ...formPost, image: imageUrl })
   return
  }

  setFormPost({ ...formPost, content: e.target.value })
 }

 const handleSubmitFormPost = (e) => {
  e.preventDefault()
  const data = {
   Content: content,
   PhotoURL: [image],
   Title: title,
   GroupID: groupId,
   PostLatitude: '40',
   PostLongitude: '50',
  }
 }

 const postForm = async () => {
  const response = axios.post(`${API__SERVER}/forum/add_post/${userID}`)
 }

 return (
  <div>
   <form
    onSubmit={handleSubmitFormPost}
    className='relative p-5 rounded-lg bg-[#222222] border border-solid border-[#4EC957]'
   >
    <div className='flex gap-2'>
     <img
      className='w-[73px] h-[73px] rounded-full'
      src={AVATAR_DEFAULT_FEMALE}
      alt='avatar nu default'
     />
     <input
      type='text'
      placeholder='Hãy viết nên suy nghĩ của mình !'
      className='bg-transparent w-full focus-visible:outline-none'
      value={content}
      onChange={handleChangeFormPost}
     />
    </div>

    <div
     className={`flex justify-end mt-3 ${image ? 'w-[100px] h-[100px]' : ''}`}
     style={
      image ? { background: `no-repeat center/cover url(${image})` } : null
     }
    >
     <button className='m-1 text-gray-900 hover:text-black flex transition'>
      <AiFillCloseCircle />
     </button>
    </div>

    <div className='mt-3 flex justify-between'>
     <div className='relative bg-[#303030] py-2 px-5 rounded-[20px] '>
      <div className='flex gap-1'>
       <img src={uploadFile} alt='upload file' />
       <spa>Ảnh/Video</spa>
      </div>

      <input
       onChange={handleChangeFormPost}
       className='absolute z-10 inset-0 opacity-0 focus-visible:outline-none'
       type='file'
       name='image'
      />
     </div>

     <button type='submit' className='bg-[#4EC957] rounded-[20px]  py-2 px-5'>
      Đăng
     </button>
    </div>
   </form>

   <div>
    <ul>
     {postList.length > 0 ? (
      postList.map(
       ({
        Content,
        PostID,
        UserFullName,
        Avatar,
        FavoriteCount,
        FirstComment,
        Title,
        UpdatePostAt,
        Photo,
        IsFavorited,
        comments,
       }) => {
        const refBtn = React.createRef()

        return (
         <li
          key={PostID}
          className='mt-5 bg-[#222222] rounded-xl border border-solid border-[#4EC957]'
         >
          <div className='p-5 flex justify-between'>
           <div className='flex gap-2 items-center'>
            <img
             className='w-[73px] h-[73px] rounded-full'
             src={AVATAR_DEFAULT_FEMALE}
             alt='avatar nu default'
            />
            <div>
             <h3>{UserFullName}</h3>

             <Moment fromNow>{`${UpdatePostAt}+0700`}</Moment>
            </div>
           </div>

           <button
            className='h-max relative z-[1]'
            type=''
            onClick={(e) => {
             const isHidden = refBtn.current.classList.contains('hidden')
             isHidden
              ? refBtn.current.classList.remove('hidden')
              : refBtn.current.classList.add('hidden')
            }}
           >
            <img src={btnPost} alt='btn post' />

            <div
             ref={refBtn}
             className={
              'hidden p-5 bg-[#222] w-[200px] h-[200px] shadow-[0px_0px_8px_#000] absolute right-0 top-5 z-[10]'
             }
            >
             <button
              onClick={() => console.log('delete')}
              className='flex gap-2 items-center'
              type=''
             >
              <IoMdClose /> Delete
             </button>
            </div>
           </button>
          </div>

          <div>
           <div className='pl-5 pb-5'>
            {/* <h2 className='capitalize text-lg'>{Title}</h2> */}
            <p>{Content}</p>
           </div>
           {Photo && <img className='w-full' src={dongco} alt={Title} />}
          </div>

          <div className='py-3 px-5'>
           <div className='flex justify-between items-center pb-1'>
            <div className='flex gap-1 items-center'>
             <div className='w-[20px] h-[20px] rounded-full bg-white p-1 flex items-center justify-center'>
              <img src={heart} alt='like' />
             </div>

             {FavoriteCount}
            </div>
            <p>{comments.length} bình luận</p>
           </div>

           <hr />

           <div className='flex gap-3 mt-3 ml-5'>
            <button
             className='flex gap-1 bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]'
             type='button'
             onClick={() => dispatch(addLikePost(PostID))}
            >
             <img
              className='w-[20px] h-[20px] transition'
              src={btnlike}
              alt='like'
             />
             {IsFavorited ? 'Đã thích' : 'Thích'}
            </button>

            <button
             className='flex gap-1 bg-[#303030] py-2 px-5 rounded-[20px] hover:opacity-70 hover:transition-[0.3s]'
             type='button'
            >
             Bình luận
            </button>
           </div>
          </div>
         </li>
        )
       }
      )
     ) : (
      <li className='mt-5'>
       <h2>KHÔNG CÓ BÀI VIẾT NÀO</h2>
      </li>
     )}
    </ul>
   </div>
  </div>
 )
}

export default GroupDetail
