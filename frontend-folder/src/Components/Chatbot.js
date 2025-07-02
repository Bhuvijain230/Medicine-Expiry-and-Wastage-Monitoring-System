import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const response = generateBotResponse(input.toLowerCase());
    setMessages([...newMessages, { sender: 'bot', text: response }]);
    setInput('');
  };

  const generateBotResponse = (input) => {
    if (input.includes('expire') || input.includes('expiring')) {
      return 'You can check expiring medicines in the "Alerts" section.';
    } else if (input.includes('donate')) {
      return 'Go to the "Donations" tab to find medicines eligible for donation.';
    } else if (input.includes('inventory')) {
      return 'You can add, edit, or delete medicines in the "Inventory" section.';
    } else if (input.includes('report')) {
      return 'Reports on expired vs available stock are in the "Reports" section.';
    } else {
      return "Sorry, I didn't understand that. Try asking about inventory, donations, alerts, or reports.";
    }
  };

  return (
    <div className="chatbot-container">
      <h2>Chatbot Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
