import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 I'm your Falcon Energy AI Assistant. Ask me anything about solar savings, warranties, or our installation process!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Call Gemini API directly (for demonstration/local dev)
    // Note: In production, it's safer to route this through the Supabase 'chat' Edge Function we created!
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey || apiKey === 'paste_your_api_key_here') {
        throw new Error("VITE_GROQ_API_KEY missing in .env.local");
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful customer service AI for 'Falcon Energy', a premium solar energy provider in Madhya Pradesh, India. 
We serve Bhopal, Indore, Gwalior and all over Madhya Pradesh.
Answer questions about solar energy, PM Kusum Yojana subsidies (up to 60% off), 25-year panel warranties, residential/commercial/industrial installations, and pricing.
Keep answers brief (2-4 sentences), friendly, and persuasive. Encourage users to use the savings calculator or book a free site survey.`
            },
            { role: 'user', content: input }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      const data = await response.json();
      console.log("Groq raw response:", data);

      if (!response.ok) {
        throw new Error(`API ${response.status}: ${data?.error?.message || JSON.stringify(data?.error)}`);
      }

      const aiResponse = data.choices?.[0]?.message?.content;
      if (aiResponse) {
        setMessages((prev) => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
      } else {
        throw new Error("No response from AI. Check F12 console.");
      }
    } catch (err) {
      console.error("Groq API Error:", err);
      setMessages((prev) => [...prev, {
        id: Date.now(),
        text: `⚠️ ${err?.message || String(err)}`,
        sender: 'ai'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <button 
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={22} />
        <span className="chatbot-fab-label">AI Assistant</span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <Bot size={20} />
            <span>Falcon AI Assistant</span>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-container ${msg.sender === 'user' ? 'user' : 'ai'}`}>
              {msg.sender === 'ai' && <div className="chat-avatar"><Bot size={16} /></div>}
              <div className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble-container ai">
               <div className="chat-avatar"><Bot size={16} /></div>
               <div className="chat-bubble ai typing">
                 <span className="dot"></span>
                 <span className="dot"></span>
                 <span className="dot"></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chatbot-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about solar..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send" disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIChatbot;
