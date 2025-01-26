import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Ensure your CSS file has appropriate styles

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef(null);

  // Auto-scroll to the bottom of the chat when messages are updated
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chatbot response');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Assistance</div>
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${
              msg.role === 'assistant' ? 'assistant' : 'user'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <textarea
          className="chatbot-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          aria-label="Type your message"
        />
        <button
          className="chatbot-send-button"
          onClick={handleSendMessage}
          disabled={isLoading}
          aria-label="Send message"
        >
          {isLoading ? <div className="chatbot-spinner"></div> : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
