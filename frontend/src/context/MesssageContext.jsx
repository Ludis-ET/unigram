import React, { createContext, useState, useEffect } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = ({ type, text }) => {
    setMessages([...messages, { type, text }]);
  };

  const deleteMessage = (index) => {
    const newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages(newMessages);
  };

  const clearMessages = () => {
    setMessages([]);
  };
  
  const deleteMessagesWithDelay = () => {
    setTimeout(() => {
      for (let i = 0; i < messages.length; i++) {
        setTimeout(() => {
          deleteMessage(0);
        }, i * 3000);
      }
      setMessages([]);
    }, 15000);
  };

  useEffect(() => {
    deleteMessagesWithDelay();
  }, [messages]);

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, deleteMessage, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};
