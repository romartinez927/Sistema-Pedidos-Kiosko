import { useRef } from "react"
import "./CopyToClipboard.css"

function CopyToClipboard({ text }) {
const textRef = useRef(null)

const copyToClipboard = () => {
    if (textRef.current) {
      textRef.current.select()
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    }
}
  return (
    <div className='d-flex align-items-center justify-content-between copy-container mx-auto mt-3'>
        <p className='my-auto px-1'>{text}</p>
        <input
        ref={textRef}
        type="text"
        value={text}
        style={{ position: 'absolute', left: '-9999px' }}
        readOnly
        />
        <button onClick={copyToClipboard} className='btn btn-primary'>Copy Link</button>
    </div>
  )
}

export default CopyToClipboard