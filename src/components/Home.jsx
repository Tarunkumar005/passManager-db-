import React from 'react'
import Manager from './Manager'
import Navbar from './Navbar'

const Home = ({online, setOnline}) => {
  return (
    <>
        <Navbar setOnline={setOnline} online={online} />
        <Manager online={online} />
    </>
  )
}

export default Home