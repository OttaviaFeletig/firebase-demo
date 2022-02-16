import React, { useState, useContext, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
const Chat = () => {
  const db = getFirestore();
  const { user, setUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const sendText = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        authorId: user.uid,
        authorEmail: user.email,
        text: text,
        date: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  // const getMessages = async () => {
  //   const querySnapshot = await getDocs(collection(db, "messages"));
  //   const messages = [];
  //   querySnapshot.forEach((doc) => {
  //     messages.push(doc.data());
  //   });
  //   setMessages(messages);
  // };
  const listenToChanges = () => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
      console.log("Current messages: ", messages.join(", "));
    });
  };
  useEffect(() => {
    // getMessages();
    listenToChanges();
  }, []);
  return (
    <div>
      <h2>Chat</h2>
      {messages.map((message) => (
        <div>
          <p>{message.authorEmail}</p>
          <p>{message.text}</p>
          <p>{message.date.seconds}</p>
        </div>
      ))}
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={sendText}>Send</button>
    </div>
  );
};

export default Chat;
