import React from 'react';
import { auth } from '../firebase';

function Message({ msg }) {
  const isUser = msg.uid === auth.currentUser.uid;

  return (
    <div className={`message ${isUser ? 'sent' : 'received'}`}>
      <img src={msg.photoURL} alt="avatar" />
      <p>{msg.text}</p>
    </div>
  );
}

export default Message;
