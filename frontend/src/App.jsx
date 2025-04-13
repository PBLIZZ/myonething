import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css' // Make sure Tailwind directives are in here
import LifeQuizComponent from '@/life-quiz' // Assuming default export, adjust if needed


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* ----> REMOVE ALL DEFAULT VITE CONTENT <---- */}

      {/* ----> RENDER YOUR IMPORTED COMPONENT <---- */}
      <LifeQuizComponent />

    </>
  )
}

export default App
