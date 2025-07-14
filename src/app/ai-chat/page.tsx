"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { validateConfig } from "@/lib/config";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FoodSafetyGuideline {
  title: string;
  description: string;
  icon: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [guidelines, setGuidelines] = useState<FoodSafetyGuideline[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: "Hello! Welcome to FoodShare AI. I'm here to help you donate surplus food safely and efficiently. How can I assist you with your food donation today?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    // Generate session ID
    setSessionId(Math.random().toString(36).substring(7));

    // Fetch guidelines
    fetchGuidelines();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchGuidelines = async () => {
    try {
      // Check if Supabase is configured before making API calls
      if (!validateConfig()) {
        console.warn('Supabase not configured, using default guidelines');
        setGuidelines([
          {
            title: "Temperature Control",
            description: "Keep food at proper temperature during transport",
            icon: "🌡️"
          },
          {
            title: "Expiry Check",
            description: "Ensure food is within expiry date",
            icon: "📅"
          },
          {
            title: "Proper Packaging",
            description: "Package food securely to prevent contamination",
            icon: "📦"
          }
        ]);
        return;
      }

      const response = await fetch('/api/v1/ai/guidelines');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGuidelines(data.guidelines || []);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      // Set default guidelines on error
      setGuidelines([
        {
          title: "Temperature Control",
          description: "Keep food at proper temperature during transport",
          icon: "🌡️"
        },
        {
          title: "Expiry Check",
          description: "Ensure food is within expiry date",
          icon: "📅"
        },
        {
          title: "Proper Packaging",
          description: "Package food securely to prevent contamination",
          icon: "📦"
        }
      ]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Check if Supabase is configured before making API calls
      if (!validateConfig()) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I'm currently in demo mode. To enable full AI functionality, please configure your Supabase credentials. For now, I can provide basic food safety guidance: ensure food is within expiry date, maintain proper temperature, and package securely.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        
        if (data.guidelines) {
          setGuidelines(data.guidelines);
        }
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="text-gray-500">|</div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">FoodShare AI Assistant</h1>
                  <p className="text-sm text-gray-600">Food Safety & Donation Guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b bg-green-50 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Food Safety Assistant</h3>
                    <p className="text-sm text-gray-600">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'}`}>
                        {message.type === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about food safety, donation guidelines, or anything else..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Food Safety Guidelines</h3>
              <div className="space-y-4">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-lg">{guideline.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{guideline.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{guideline.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setInputMessage("What are the food safety guidelines?")}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    📋 View safety guidelines
                  </button>
                  <button
                    onClick={() => setInputMessage("How do I package food for donation?")}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    📦 Packaging instructions
                  </button>
                  <button
                    onClick={() => setInputMessage("What temperature should I keep the food at?")}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    🌡️ Temperature guidelines
                  </button>
                  <button
                    onClick={() => setInputMessage("I want to donate prepared food")}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    🍽️ Prepared food donation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}