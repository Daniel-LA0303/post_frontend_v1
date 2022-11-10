import React from 'react';
import Posts from '../Posts';
import Menu from '../Menu';

const Home = () => {
  return (
    <div>
        <Menu />
        <div
            className=' my-2'
        >
            <Posts />
        </div>
        
    </div>
  )
}

export default Home