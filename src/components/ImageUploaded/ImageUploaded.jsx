import CopyToClipboard from "../CopyToClipboard/CopyToClipboard"
import "./ImageUploaded.css"

function ImageUploaded() {
  return (
    <div>
        <div className='d-flex flex-column align-items-center'>
            <img 
                className="icon-success" 
                src="../../../public/icon-success.png" 
                alt="icono" 
            />
            <h1>Uploaded Successfully!</h1>
            <div>
                <img 
                    src="../../../uploads/Desayuno-medialunas.jpg" 
                    className="img-uploaded" 
                    alt="image uploaded" 
                />
            </div>
        </div>
        <CopyToClipboard text="Texto a copiar"/>
    </div>
  )
}

export default ImageUploaded