import React from 'react'
import Home from './components/Home'
import { Route,Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <Routes>
       <Route path='/' element={<Home/>} ></Route>
      </Routes>
    </>
  )
}

export default App