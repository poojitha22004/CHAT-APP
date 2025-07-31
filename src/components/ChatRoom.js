import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import Message from './Message';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      text: input,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
    });

    setInput('');
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="messages">
        {messages.map(msg => <Message key={msg.id} msg={msg} />)}
        <span ref={scrollRef}></span>
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
