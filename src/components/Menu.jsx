import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="h-16 w-full bg-black bg-opacity-50">
        <div className="w-full h-full flex justify-center items-center">
            <div
                className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                <div className="mx-4 text-white">
                    <Link
                        to={'/'}
                    >Home</Link>
                </div>
                <div className=" h-8 w-px bg-gray-300"></div>
            </div>
            <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                <div className="mx-4 text-white">
                    <Link
                        to={'/new-post'}
                    >Add New Post</Link>
                </div>
                <div className=" h-8 w-px bg-gray-300"></div>
            </div>
        </div>
    </div>
  )
}

export default Menu