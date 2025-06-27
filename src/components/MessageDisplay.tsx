import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';

// Sample contract ABI for fetching messages
const contractABI = [
  {
    inputs: [],
    name: 'getMessages',
    outputs: [
      { name: 'addresses', type: 'address[]' },
      { name: 'timestamps', type: 'uint256[]' },
      { name: 'messages', type: 'string[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

interface Message {
  address: string;
  timestamp: string;
  message: string;
}

function MessageDisplay() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const [addresses, timestamps, messages] = await contract.getMessages();
        const formatted = addresses.map((addr: string, i: number) => ({
          address: addr,
          timestamp: new Date(Number(timestamps[i]) * 1000).toLocaleString(),
          message: messages[i],
        }));
        setMessages(formatted.reverse()); // Newest first
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []); // This will now refresh when the component key changes

  return (
    <div className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 space-y-6 p-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Messages from the Future
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover what others have left behind on the blockchain
          </p>
        </motion.div>

        {/* Messages Grid */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Messages Yet</h3>
              <p className="text-gray-500">Be the first to leave your mark on the blockchain!</p>
            </motion.div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                {/* Card with gradient border */}
                <div className="relative p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                  <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Message content */}
                    <div className="relative z-10">
                      {/* Address with gradient */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {msg.address.slice(2, 4).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-mono bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {msg.address.slice(0, 6)}...{msg.address.slice(-4)}
                            </p>
                            <p className="text-xs text-gray-500">{msg.timestamp}</p>
                          </div>
                        </div>
                        
                        {/* Decorative element */}
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
                        </div>
                      </div>

                      {/* Message text */}
                      <div className="relative">
                        <p className="text-lg text-gray-100 leading-relaxed font-medium">
                          "{msg.message}"
                        </p>
                        
                        {/* Decorative quote marks */}
                        <div className="absolute -top-2 -left-2 text-4xl text-purple-500/30 font-serif">"</div>
                        <div className="absolute -bottom-2 -right-2 text-4xl text-pink-500/30 font-serif">"</div>
                      </div>

                      {/* Bottom accent */}
                      <div className="mt-4 pt-4 border-t border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default MessageDisplay;