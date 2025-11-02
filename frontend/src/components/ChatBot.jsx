import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export default function AIChatBot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const simulateAIResponse = (userMessage) => {
        setIsTyping(true);

        setTimeout(() => {
            const responses = [
                // "That's an interesting question! Let me help you with that.",
                // "I understand what you're asking. Here's my take on it...",
                // "Great point! I'd be happy to assist you with that.",
                // "Thanks for sharing! Based on what you've told me, I suggest...",
                // "I'm processing your request. Let me provide you with a detailed response."
                userMessage
            ];

            // const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            console.log(responses)
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: responses,
                sender: 'bot',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInput('');

        try {
            const res = await axiosInstance.post("/ai-services/chatbot", { prompt: input });

            if (res.status !== 200 && res.status !== 201) {
                toast.error(res.data?.message || "Unexpected response");
                return;
            }

            const data = res.data?.message || res.data?.response || "I'm sorry, I couldn’t generate a response.";
            simulateAIResponse(data);

        } catch (error) {
            toast.error("Error sending message to AI");
            simulateAIResponse("Sorry, something went wrong while processing your request.");
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="bg-slate-800/50 backdrop-blur-xl shadow-2xl border-b border-slate-700/50">
                <div className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/50">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-800 rounded-full"></div>
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent truncate">
                                AI Assistant
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 truncate">Always here to help</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${message.sender === 'bot'
                                ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-violet-500/50'
                                : 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-cyan-500/50'
                                }`}>
                                {message.sender === 'bot' ? (
                                    <Bot className="w-5 h-5 text-white" />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div className={`flex flex-col max-w-[calc(100%-4rem)] sm:max-w-lg ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`rounded-2xl px-4 sm:px-5 py-3 shadow-lg wrap-break-word ${message.sender === 'bot'
                                    ? 'bg-slate-800/90 backdrop-blur-sm border border-slate-700/50'
                                    : 'bg-linear-to-r from-cyan-600 to-blue-600 shadow-cyan-500/30'
                                    }`}>
                                    <p className={`text-sm leading-relaxed ${message.sender === 'bot' ? 'text-slate-200' : 'text-white'}`}>
                                        {message.text}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-500 mt-1 px-1">
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/50">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-4 sm:px-5 py-3 shadow-lg">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-slate-800/50 backdrop-blur-xl border-t border-slate-700/50 shadow-2xl">
                <div className="px-4 py-4">
                    <div className="max-w-4xl mx-auto flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className="w-full px-4 sm:px-5 py-3 pr-10 sm:pr-12 rounded-2xl border-2 border-slate-700 focus:border-violet-500 focus:outline-none resize-none transition-all bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm sm:text-base"
                                rows="1"
                                style={{ maxHeight: '120px' }}
                            />
                            <MessageSquare className="absolute right-3 sm:right-4 top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={input.trim() === ''}
                            className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:scale-100"
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-center max-w-4xl mx-auto">
                        Press Enter to send, Shift + Enter for new line
                    </p>
                </div>
            </div>
        </div>
    );
}