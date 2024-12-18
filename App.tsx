import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import DisplayWeather from './components/DisplayWeather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Outlet /><div className="App">
      <DisplayWeather />
    </div></>
  )
}

export default App
