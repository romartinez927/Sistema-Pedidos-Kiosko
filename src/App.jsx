import './App.css'
import ImageUploaderContainer from './components/ImageUploaderContainer/ImageUploaderContainer'

function App() {

  return (
    <div id="app" className='bg-white py-5 px-4'>
        <div className='d-flex flex-column text-center gap-2'>
          <ImageUploaderContainer />
        </div>
    </div>
  )
}

export default App
