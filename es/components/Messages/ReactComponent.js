import React, { Component } from 'react';
import chatIconUrl from './../../assets/chat-icon.svg';

var ReactComponent = function ReactComponent(props) {
  var meta = props.message.data.meta || null;
  var component = props.message.data.component || '';
  var author = props.message.author;
  return React.createElement(
    'div',
    { className: 'sc-message--text' },
    props.message && author === "me" && props.onDelete && React.createElement(
      'button',
      { className: 'delete-message', onClick: function onClick() {
          return props.onDelete(props.message);
        } },
      'x'
    ),
    component,
    meta && React.createElement(
      'p',
      { className: 'sc-message--meta' },
      meta
    )
  );
};

export default ReactComponent;