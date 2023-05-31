import { useState } from 'react'
import './App.css'
import ImageUploader from './components/ImageUploader/ImageUploader'

function App() {
  // const [result, setResult] = useState("")
  // async function fetchInfo() {
  //   const url = `${import.meta.env.VITE_API_URL}/test`
  //   const response = await fetch(url)
  //   const json = await response.json()
  //   setResult(json.body)
  // }

  return (
    <div id="app" className='bg-white py-5 px-4'>
      {/* <button onClick={fetchInfo}>Fetch info from api</button>
      <div>result : ${result}</div> */}
      <div className='d-flex flex-column text-center gap-2'>
        <h1>Upload your image</h1>
        <p>File should be Jpeg, Png...</p>
        <ImageUploader />
      </div>
    </div>
  )
}

export default App
