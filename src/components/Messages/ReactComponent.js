import React, { Component } from 'react';
import chatIconUrl from './../../assets/chat-icon.svg';

const ReactComponent = (props) => {
  const meta = props.message.data.meta || null
  const component = props.message.data.component || ''
  const author = props.message.author
  return (
    <div className="sc-message--text">
      {
        props.message && 
        author === "me" && 
        props.onDelete && 
          <button className='delete-message' onClick={() => props.onDelete(props.message)}>
            x
          </button>
      }
      {component}
      {meta && <p className='sc-message--meta'>{meta}</p>}
    </div>
    )
}

export default ReactComponent