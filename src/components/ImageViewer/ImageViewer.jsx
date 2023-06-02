import CopyToClipboard from "../CopyToClipboard/CopyToClipboard"
import "./ImageViewer.css"

function ImageViewer(props) {
  return (
    <div className='d-flex flex-column align-items-center'>
        <img className="icon-success" src="../../uploads/icon-success.png" alt="icono" />
        <h1>Uploaded Successfully!</h1>
        <div>
            <img src={props.imageUrl} className="img-uploaded" alt="image uploaded" />
        </div>
        <CopyToClipboard text={props.imageUrl}/>
    </div>
  )
}

export default ImageViewer