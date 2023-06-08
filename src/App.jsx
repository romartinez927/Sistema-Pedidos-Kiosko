import './App.css'
import ImageUploaderContainer from './components/ImageUploaderContainer/ImageUploaderContainer'
import { CloudinaryContext } from 'cloudinary-react'

function App() {
  const cloudinaryConfig = {
    cloudName: 'dm9aq12zw',
    apiKey: '868199114623562',
    apiSecret: 'Aac-tnZXgz_jn9nMy23F2JHP_Ko'
  };

  return (
    <CloudinaryContext {...cloudinaryConfig}>
      <div id="app" className='bg-white py-5 px-4'>
          <div className='d-flex flex-column text-center gap-2'>
            <ImageUploaderContainer />
          </div>
      </div>
    </CloudinaryContext>
  )
}

export default App
