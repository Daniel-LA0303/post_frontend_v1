import Form from "./components/Form"
import Posts from "./components/Posts"
import Home from "./components/pages/Home";
import EditPost from "./components/pages/EditPost";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>

        <div className="pages">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/new-post' element={<Form />}/>
              <Route path='/edit-post/:id' element={<EditPost />}/>
            </Routes>
          </div>
        </BrowserRouter>
      <div>
        {/* <Form />
        <Posts /> */}
      </div>
    </>
  )
}

export default App
