import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MessagePop = ({message, type}) => {
  let messageclass = type ? `pop-container__message pop-container__message--${type}` : 'pop-container__message'
  return (
    <div className="pop-container">
      <div className={messageclass}>
        <span onClick="" className="pop-container__message-close" aria-label="close the popup">
          <FontAwesomeIcon icon="times"size="2x" />
        </span>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default MessagePop
