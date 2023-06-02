import React from 'react'

function ImageInput(props) {
  return (
    <div className={props.imageUrl && "d-none"}>
        <h1>Upload your image</h1>
        <p>File should be Jpeg, Png...</p>
        <div className='input-div mb-3'>
          <div className="d-flex flex-column align-items-center gap-3">
            <img width={110} src="../../uploads/image.svg" alt="image" />
            <p>Drag & drop your image here</p>
          </div>
          <input 
            type="file" 
            className="file" 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={props.handleImageChange} 
          />
        </div>
        <button className="mx-auto w-40 py-2" onClick={props.handleImageUpload}>Upload</button>
    </div>
  )
}

export default ImageInput