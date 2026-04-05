'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 I'm your Matcha Latte assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Quick reply suggestions
  const quickReplies = [
    { text: "Tell me about ingredients", emoji: "🍵" },
    { text: "What are the benefits?", emoji: "⚡" },
    { text: "How much does it cost?", emoji: "💰" },
    { text: "Where can I order?", emoji: "🛒" }
  ];

  // Enhanced bot responses with more detail
  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('ingredient') || msg.includes('made')) {
      return "Our Iced Chocolate Matcha Latte is made with:\n\n🍵 Ceremonial grade matcha from Japan\n🍫 Belgian dark chocolate\n🥛 Organic oat milk\n🍯 Natural monk fruit sweetener\n\nAll premium, organic ingredients! Would you like to know more about any specific ingredient?";
    }
    if (msg.includes('benefit') || msg.includes('healthy') || msg.includes('good')) {
      return "Great question! Here's what you get:\n\n⚡ 95mg natural caffeine - sustained energy\n🧠 45mg L-Theanine - enhanced focus\n🚫 Zero sugar - guilt-free\n💪 Rich in antioxidants\n❤️ Supports heart health\n\nPerfect for sustained energy without the crash!";
    }
    if (msg.includes('price') || msg.includes('cost') || msg.includes('much')) {
      return "💰 Just $7.50 per bottle!\n\nBulk pricing available:\n• 6-pack: $42 (save $3)\n• 12-pack: $78 (save $12)\n\n✨ Free shipping on orders over $25!\n\nWant to order now?";
    }
    if (msg.includes('order') || msg.includes('buy') || msg.includes('purchase')) {
      return "🛒 Easy ordering options:\n\n1. Click 'BUY NOW' button (top right)\n2. Scroll to purchase section (bottom)\n3. Call us: +1 (555) 123-4567\n\n📦 FREE shipping on $25+\n🚚 Ships in 3-5 business days\n💳 Secure checkout\n\nReady to order?";
    }
    if (msg.includes('shipping') || msg.includes('delivery')) {
      return "📦 Shipping Info:\n\n✅ FREE on orders $25+\n🚚 Standard: 3-5 business days\n⚡ Express: 1-2 business days (+$9.99)\n🌍 International shipping available\n📍 Track your order 24/7\n\nWhere are you located?";
    }
    if (msg.includes('contact') || msg.includes('call') || msg.includes('email') || msg.includes('support')) {
      return "💬 We'd love to hear from you!\n\n📞 Phone: +1 (555) 123-4567\n📧 Email: hello@matchalatte.com\n💬 WhatsApp: +1 (555) 123-4567\n⏰ Available: 24/7\n\nPrefer to chat here? I'm always available! 😊";
    }
    if (msg.includes('compare') || msg.includes('vs') || msg.includes('difference')) {
      return "🆚 Matcha vs Regular Coffee:\n\n✨ Matcha:\n• Sustained energy (4-6 hours)\n• L-Theanine for calm focus\n• 137x more antioxidants\n• No crash or jitters\n\n☕ Coffee:\n• Quick spike & crash\n• Can cause jitters\n• Fewer antioxidants\n\nMatcha = Better energy! 💚";
    }
    if (msg.includes('caffeine') || msg.includes('energy')) {
      return "⚡ Caffeine Content:\n\n95mg per bottle - perfect amount!\n\n📊 Comparison:\n• Our Matcha: 95mg\n• Regular Coffee: 80-100mg\n• Energy Drink: 80-150mg\n\n✨ The difference? L-Theanine creates smooth, sustained energy without the crash!\n\nWant to try it?";
    }
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! 😊\n\nIs there anything else you'd like to know about our Matcha Latte?\n\nI'm here to help! 💚";
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! 👋 Welcome back!\n\nWhat can I help you with today?\n\n• Product info\n• Ordering\n• Shipping\n• Ingredients\n• Health benefits\n\nJust ask! 😊";
    }
    
    return "I'd love to help! 💚\n\nYou can ask me about:\n\n🍵 Ingredients & quality\n⚡ Health benefits\n💰 Pricing & deals\n🛒 How to order\n📦 Shipping info\n📞 Contact us\n\nWhat interests you most?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Add unread if chat is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 500); // Random delay for realism
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleLike = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, liked: !msg.liked, disliked: false }
        : msg
    ));
  };

  const handleDislike = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, disliked: !msg.disliked, liked: false }
        : msg
    ));
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hi! 👋 I'm your Matcha Latte assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 left-0 w-80 md:w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-matchaGreen/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-matchaGreen to-matchaLight p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <Bot className="w-6 h-6 text-matchaGreen" />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-accent font-bold text-white flex items-center gap-1.5 text-sm md:text-base">
                    Matcha Assistant
                    <Sparkles className="w-4 h-4 text-yellow-200" />
                  </h3>
                  <p className="text-[10px] md:text-xs text-white/80">Online • Instant replies</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="text-white hover:bg-white/20 px-2 py-1 rounded-lg transition-colors text-[10px] md:text-xs font-medium uppercase tracking-wider"
                  title="Clear chat"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gradient-to-b from-gray-50 to-white scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col gap-1.5 max-w-[85%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-matchaGreen to-matchaLight text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.text}</p>
                      <p className={`text-[10px] mt-2 font-semibold ${
                        message.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {/* Bot message actions */}
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-3 px-1">
                        <button
                          onClick={() => handleLike(message.id)}
                          className={`p-1 rounded-full hover:bg-gray-100 transition-all active:scale-90 ${
                            message.liked ? 'text-matchaGreen bg-matchaGreen/10' : 'text-gray-400'
                          }`}
                          title="Helpful"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDislike(message.id)}
                          className={`p-1 rounded-full hover:bg-gray-100 transition-all active:scale-90 ${
                            message.disliked ? 'text-red-500 bg-red-50/50' : 'text-gray-400'
                          }`}
                          title="Not helpful"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(message.text, message.id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-all active:scale-90 text-gray-400"
                          title="Copy message"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-1.5 h-1.5 bg-matchaGreen rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-1.5 h-1.5 bg-matchaGreen rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-1.5 h-1.5 bg-matchaGreen rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies Area */}
            {messages.length <= 2 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 bg-white border-t border-gray-100"
              >
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2.5 px-1">💡 Suggested Topics</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.text}
                      onClick={() => handleQuickReply(reply.text)}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(106, 153, 78, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      className="text-[11px] px-3 py-2.5 bg-gray-50 text-gray-700 rounded-xl transition-all border border-gray-100 font-semibold text-left flex items-start flex-col gap-1"
                    >
                      <span className="text-base">{reply.emoji}</span>
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-matchaGreen/40 focus:ring-4 focus:ring-matchaGreen/5 focus:bg-white transition-all"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-r from-matchaGreen to-matchaLight text-white rounded-full flex items-center justify-center hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-matchaGreen/20"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-[10px] text-gray-400 mt-3 text-center font-medium">
                AI Powered • Instant Support 24/7
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group/btn">
        {/* Main Chat Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 w-16 h-16 bg-gradient-to-br from-matchaGreen to-matchaLight rounded-full shadow-2xl flex items-center justify-center text-white"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Badge */}
          {!isOpen && unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white"
            >
              {unreadCount}
            </motion.div>
          )}

          {/* Desktop Tooltip */}
          {!isOpen && (
            <div className="absolute left-full ml-4 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block shadow-2xl">
              Need help? Chat with us! 💚
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
            </div>
          )}
        </motion.button>

        {/* Triple Pulsing Ring Effect */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-matchaGreen/40 -z-0"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-matchaLight/30 -z-0"
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-matchaGreen/20 -z-0"
              initial={{ scale: 1, opacity: 0.2 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
            />
          </>
        )}
      </div>
    </div>
  );
}
