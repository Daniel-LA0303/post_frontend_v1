import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';

const Form = () => {

    const router = useNavigate();

    const[post, setPost] = useState({
        title: '',
        desc: ''
    });
    const{title, desc}=post

    const[file, setFile] = useState(null);


    


    //leer los datos de form
    const leerInfo = e => {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }

    //coloca la imagen en el state
    const leerArchivo = e => {
        // console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const newPost = async e => {
        e.preventDefault();

        const newPost = {
            title: title,
            desc:desc
        }

        if(file){
            //crear un formdata
            const formData = new FormData();
            const filename = Date.now() + file.name;
            formData.append('name', filename);
            formData.append('imagen', file);
            newPost.linkImage = filename
            try {
                await axios.post('http://localhost:4000/api/upload', formData)
              } catch (error) {
                console.log(error);
              }
        }


        // console.log(formData);z

        //alamcenar en db

        try {
            const res = await axios.post('http://localhost:4000/api/gallery', newPost)
            
            
        } catch (error) {
            console.log(error);
            //lanzar alerta
    
        }
        setPost({
            title:'',
            desc:''
        })

        router('/')
    }


  return (
    <>
        <Menu />
        <div className="w-full max-w-xs mx-auto my-5">
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={newPost}
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Title
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="username" 
                        type="text"  
                        name="title" 
                        onChange={leerInfo}
                        value={title}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Description
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="text"  
                        name="desc" 
                        onChange={leerInfo}
                        value={desc}
                    />

                </div>
                <div className="mb-6">
                    
                    <label className="block mb-2 text-sm text-gray-700 font-bold " >Upload file</label>
                    <input 
                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        id="file_input" 
                        type="file" 
                        onChange={leerArchivo}
                    />
                    <div className='my-2'>
                        {file && 
                            <img
                            className="writeImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                            />
                        }
                    </div>

                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                    >Add
                    </button>
                </div>
                <div className="mb-2">
                    
                </div>
            </form>
        </div>

    </>
    
  )
}

export default Form