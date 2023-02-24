import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const API_KEY = import.meta.env.VITE_API_KEY
  return (
    <div className="App">
    <Navbar/>
    </div>
  )
}

export default App
