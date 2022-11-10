import React, {useState, useEffect} from 'react';
import Post from './Post';
import axios from 'axios';


const Posts = () => {

    const[allPosts, setAllPosts]=useState([])
    useEffect(() => {
        const consultAPI = async () => {
            try {
                
                const res = await axios.get('http://localhost:4000/api/gallery');

                setAllPosts(res.data);

            } catch (error) {
                if(error.response.status = 500){
                    console.log(error);
                } 
            }
        }
        consultAPI();  
    }, [allPosts])

  return (
    <div className='w-full flex flex-wrap justify-evenly'>

        {allPosts.map(post => (
            <Post 
                key={ post._id}
                post={post}
            />
        ))}
    </div>
  )
}

export default Posts