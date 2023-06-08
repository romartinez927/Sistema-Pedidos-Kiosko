import { useState } from 'react'
import axios from "axios"
import "./ImageUploader.css"
import ProgressBar from '../ProgressBar/ProgressBar';
import ImageViewer from '../ImageViewer/ImageViewer';
import ImageInput from './ImageInput';

function ImageUploaderContainer() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    // const handleImageUpload = async () => {
    //   const formData = new FormData()
    //   formData.append('image', selectedImage)
  
    //   try {
    //     const res = await axios.post('http://localhost:4000/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     });
  
    //     setImageUrl(res.data.imageUrl)
    //     setIsLoading(true)

    //     setTimeout(() => {
    //       setIsLoading(false)
    //     }, 2000)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // };
  
    // const handleImageChange = (event) => {
    //   setSelectedImage(event.target.files[0])
    // };


    const handleImageUpload = async () => {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'images'); // Reemplaza con tu propio upload preset
  
        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dm9aq12zw/image/upload',
            formData
          );
          console.log('URL de imagen subida:', response.data.secure_url);
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    };
  
    const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0]);
    };
  return (
    <>
      <ImageInput handleImageUpload={handleImageUpload} handleImageChange={handleImageChange} imageUrl={imageUrl}/>
      {isLoading ? <ProgressBar/> : imageUrl && <ImageViewer imageUrl={imageUrl}/>}
    </>
  )
}

export default ImageUploaderContainer