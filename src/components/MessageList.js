import React, { Component } from 'react';
import TimeSpan from "chat-timespan";
import Message from './Messages'

class MessageList extends Component {

  componentWillUpdate(nextProps, nextState) {
    if (this.currentFirstRef) {
      this.a1 = this.currentFirstRef.offsetTop;
      this.b1 = this.scrollList.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevMessages = prevProps.messages;
    const messages = this.props.messages;
    const prevFirstId = prevMessages[0] && prevMessages[0].id;
    const prevLastId = prevMessages[prevMessages.length-1] && prevMessages[prevMessages.length-1].id;
    const firstId = messages[0] && messages[0].id;
    const lastId = messages[messages.length-1] && messages[messages.length-1].id;

    if (messages.length !== prevMessages.length) {
      if (prevFirstId!== firstId && prevLastId === lastId) {
        console.log("#####");
        if (this.prevFirstRef) {
          const a2 = this.prevFirstRef.offsetTop;
          this.scrollList.scrollTop = a2 - this.a1 + this.b1;
          // debugger;
        } else {
          this.scrollList.scrollTop = 0;  
        }
      } else {
        this.scrollList.scrollTop = this.scrollList.scrollHeight;
      }
    }
  }

  render () {
    const timeSpan = new TimeSpan();
    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {
          this.props.more && this.props.moreEl
        }
        {this.props.messages.map((message, i) => {
          if (i===0) {
            this.prevMessageId = this.currentMessageId;
            this.currentMessageId = message.id;
          }
          const timeInfo = timeSpan.format(message.timestamp);
          return (
            <div key={i}>
              {
                timeInfo && 
                <div className="sc-message-time-info">
                  <span>{timeInfo}</span>
                </div>
              }
              <div ref={e=>{
                if (e) {
                  this.prevMessageId === message.id && (this.prevFirstRef = e);
                  i === 0 && (this.currentFirstRef = e);
                }
              }}>
                <Message message={message} key={i} onDelete={this.props.onDelete}/>
              </div>
              
            </div>
          )
        })}
      </div>)
  }
}

export default MessageList