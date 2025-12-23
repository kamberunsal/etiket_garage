import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Merhaba! Ben Etiket Garage AI asistanı. PPF kaplama, göçük düzeltme veya fiyatlar hakkında sorularınızı yanıtlayabilirim.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const botMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button - Orange Background (Primary Call to Action) */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-brand-yellow text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:shadow-[0_0_30px_rgba(255,107,0,0.7)] transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 bg-brand-red rounded-full animate-ping"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-brand-gray border border-brand-red/30 rounded-lg shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header - Gradient Orange to Red */}
            <div className="bg-gradient-to-r from-brand-yellow to-brand-red p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-white" />
                <div>
                  <h3 className="text-white font-display font-bold text-sm">ETIKET AI ASİSTAN</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-[10px] text-gray-200">Çevrimiçi</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <Minimize2 className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-yellow text-black font-medium rounded-br-none' // User msg: Orange
                        : 'bg-brand-gray border border-gray-700 text-gray-300 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-brand-gray border border-gray-700 p-3 rounded-lg rounded-bl-none flex space-x-1">
                    <span className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-brand-gray border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Aracım için PPF ne kadar?"
                  className="flex-1 bg-brand-dark border border-gray-600 rounded-md px-4 py-2 text-white text-sm focus:outline-none focus:border-brand-yellow transition-colors placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-brand-yellow text-black p-2 rounded-md hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="text-[10px] text-gray-500 mt-2 text-center">
                AI yanıtları tahmini olabilir. Kesin bilgi için randevu alınız.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};