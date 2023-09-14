import { useState } from 'react'
import MyRoute from '../Routes';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MyRoute />
  )
}

export default App