import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import { useState } from 'react';
import Home2 from './components/Home2';
function App() {
const [online, setOnline] = useState("");

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={(online != "")? <Home setOnline={setOnline} online={online}/> : <Login setOnline={setOnline}/>} /> */}
        <Route path="/" element={(online != "")? <Home setOnline={setOnline} online={online}/> : <Home2/>} />
        <Route path="/login" element={<Login setOnline={setOnline}/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
