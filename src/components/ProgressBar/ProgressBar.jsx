import React from 'react'
import "./ProgressBar.css"

function ProgressBar() {
  return (
    <div className='d-flex flex-column gap-2'>
        <h2>Uploading...</h2>
        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar w-75"></div>
        </div>
    </div>
  )
}

export default ProgressBar