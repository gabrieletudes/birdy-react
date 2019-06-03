import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => {
  return (
      <div className="loading-container">
        <span className="loading-container__dove animate-pass" aria-label="Fetching data">
          <FontAwesomeIcon icon="dove" size="3x"/>
        </span>
        <p>We are looking for some Birds...</p>
      </div>
  )
}

export default Loading
