import React from 'react'

const MessagePop = ({message}) => {
  return (
    <div className="pop-container">
      <p className="pop-container__message">{message}</p>
    </div>
  )
}

export default MessagePop
