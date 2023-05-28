import { useState } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState("")
  async function fetchInfo() {
    const url = `${import.meta.env.VITE_API_URL}/test`
    const response = await fetch(url)
    const json = await response.json()
    setResult(json.body)
  }

  return (
    <div>
      <button onClick={fetchInfo}>Fetch info from api</button>
      <div>result : ${result}</div>
    </div>
  )
}

export default App
