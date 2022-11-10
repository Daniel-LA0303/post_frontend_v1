import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../Menu';

const EditPost = () => {
    const router = useNavigate();

    const params = useParams();
    // console.log(params);

    const[title, setTitle]=useState('');
    const[desc, setDesc]= useState('');
    const[image, setImage]= useState('');
    const[newImage, setNewImage] = useState(false);

    // const[]

    const[file, setFile] = useState(null);


    const PF = "http://localhost:4000/uploads/"

    useEffect(() => {
        const consultAPI = async () => {
            try {
                
                const res = await axios.get(`http://localhost:4000/api/gallery/${params.id}`);

                // console.log(res.data._id);
                setTitle(res.data.title)
                setDesc(res.data.desc);
                setImage(res.data.linkImage)

            } catch (error) {
                if(error.response.status = 500){
                    console.log(error);
                } 
            }
        }
        consultAPI();  
    }, [])
    


    //leer los datos de form
    const leerInfo = e => {
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }

    //coloca la imagen en el state
    const leerArchivo = e => {
        setFile(e.target.files[0]);
        
    }

    const updatePost = async e => {
        e.preventDefault();
        const newPost = {
            title: title,
            desc:desc
        }
        if(image !== undefined){ //el usuario actualizo la imagen si no el usuario no tiene iamgen o mantien la misma
            newPost.previousName=image
        }
        if (file) {
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

        try {
            const res = await axios.put(`http://localhost:4000/api/gallery/${params.id}`, newPost)
        } catch (error) {
            console.log(error);
            //lanzar alerta
        }

        router('/')

        
    }
  return (
    <>
        <Menu />
        <div className="w-full max-w-xs mx-auto my-5">
            <form 
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={updatePost}
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
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setDesc(e.target.value)}
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
                        {newImage ? (
                            <img
                            className="writeImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        ): (
                            <>
                                {image !== '' ? (
                                    <img
                                        className=""
                                        src={PF+image}
                                        alt=""
                                    />
                                ): null}
                            </>
                        )}

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

export default EditPost