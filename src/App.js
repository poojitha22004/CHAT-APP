import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <header>
        <h1>⚡ Chat App</h1>
        {user && <button onClick={() => auth.signOut()}>Logout</button>}
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
