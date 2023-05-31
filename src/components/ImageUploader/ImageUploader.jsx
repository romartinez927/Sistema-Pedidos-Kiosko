import React, { useState } from 'react'
import axios from "axios"
import "./ImageUploader.css"

function ImageUploader() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    const handleImageUpload = async () => {
      const formData = new FormData();
      formData.append('image', selectedImage);
  
      try {
        const res = await axios.post('http://localhost:4000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        setImageUrl(res.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };
  return (
    <>
      <div className='input-div mb-3'>
        <p>Drag & drop your image here</p>
        <input 
          type="file" 
          className="file" 
          accept="image/png, image/jpeg, image/jpg" 
          onChange={handleImageChange} 
        />
      </div>
      <button className="mx-auto w-40 py-2"  onClick={handleImageUpload}>Cargar imagen</button>
      {imageUrl && <img src={imageUrl} alt="Cargado" />}
    </>
  )
}

export default ImageUploader