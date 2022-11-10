import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Post = ({post}) => {

    const PF = "http://localhost:4000/uploads/"


    const deletePost = async(id) => {

        console.log(id);

            try {
                
                const res = await axios.delete(`http://localhost:4000/api/gallery/${id}`);


            } catch (error) {
                if(error.response.status = 500){
                    console.log(error);
                } 
            }
    }

  return (
    <div className=' p-3 bg-red-400 card rounded mx-2 my-3'>
        <div className=' flex flex-col justify-center w-full m-auto text-white font-bold'>
            <h2 className='text-center'>Title: {post.title}</h2>
            <p className='text-center'>Description: {post.desc}</p>
            <p className='text-center'>Img name:{post.linkImage}</p>
            <div className='m-auto'>
                <img
                    className="singlePostImg img_card"
                    src={PF+post.linkImage}
                    alt=""
                />
            </div>
        </div>

        <div className=' mt-3 flex justify-between'>
            <Link
                to={`/edit-post/${post._id}`}
                className=' w-20 bg-blue-600 p-2 rounded-sm text-white mx-1'
            >Edit</Link>
            <button
                className=' w-20 bg-red-500 p-2 rounded-sm text-white mx-1'
                onClick={() => deletePost(post._id)}
            >Delete</button>
        </div>

    </div>
  )
}

export default Post