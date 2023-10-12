import { useState } from 'react'
import MyRoute from '../Routes';
import './App.css'
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <MyRoute />
    </BrowserRouter>      
  )
}

export default App