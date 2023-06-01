import './App.css'
import ImageUploader from './components/ImageUploader/ImageUploader'
import ProgressBar from './components/ProgressBar/ProgressBar'
import ImageUploaded from './components/ImageUploaded/ImageUploaded'

function App() {

  return (
    <div id="app" className='bg-white py-5 px-4'>
      {/* <div className='d-flex flex-column text-center gap-2'>
        <h1>Upload your image</h1>
        <p>File should be Jpeg, Png...</p>
        <ImageUploader />
      </div> */}
      {/* <ProgressBar /> */}
      <ImageUploaded />
    </div>
  )
}

export default App
