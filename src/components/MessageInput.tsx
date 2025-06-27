import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';

// Sample contract ABI (replace with actual ABI)
const contractABI = [
  {
    inputs: [{ name: 'message', type: 'string' }],
    name: 'logMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with deployed contract address

interface MessageInputProps {
  onMessageSubmitted?: () => void; // Callback to refresh messages
}

function MessageInput({ onMessageSubmitted }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const MAX_MESSAGE_LENGTH = 280; 
  // Check wallet connection on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // Listen for wallet changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setWalletAddress(accounts[0] || null);
        setWalletConnected(accounts.length > 0);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const checkWalletConnection = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setWalletAddress(accounts[0] || null);
      setWalletConnected(accounts.length > 0);
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0] || null);
      setWalletConnected(accounts.length > 0);
      setError(null);
    } catch (error: any) {
      if (error.code === 4001) {
        setError('Wallet connection rejected');
      } else {
        setError('Failed to connect wallet');
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
      setCharCount(value.length);
      setIsTyping(true);
      
      // Clear typing indicator after 2 seconds
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const submitMessage = async () => {
    // Validation
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    if (!walletConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!window.ethereum) {
      setError('Please install MetaMask or another Web3 wallet');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      // Estimate gas first
      const gasEstimate = await contract.logMessage.estimateGas(message);
      
      // Submit transaction
      const tx = await contract.logMessage(message, {
        gasLimit: (gasEstimate * 120n) / 100n // Add 20% buffer using BigInt arithmetic
      });

      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        setSuccess(true);
        setMessage('');
        setCharCount(0);
        
        // Call callback to refresh messages
        if (onMessageSubmitted) {
          onMessageSubmitted();
        }

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error: any) {
      console.error('Error submitting message:', error);
      
      // Handle specific error cases
      if (error.code === 4001) {
        setError('Transaction rejected by user');
      } else if (error.code === -32603) {
        setError('Network error. Please try again');
      } else if (error.message?.includes('insufficient funds')) {
        setError('Insufficient funds for gas fees');
      } else if (error.message?.includes('nonce')) {
        setError('Transaction nonce error. Please try again');
      } else {
        setError('Failed to submit message. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Leave Your Mark
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Write a message that will be immortalized on the blockchain forever
          </p>
        </motion.div>

        {/* Main input card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative group"
        >
          {/* Card with gradient border */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Wallet connection status */}
                {!walletConnected ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-200 font-medium">Wallet not connected</span>
                      </div>
                      <button
                        onClick={connectWallet}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-200"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-200 font-medium">Wallet connected</span>
                      </div>
                      <span className="text-sm text-gray-300 font-mono">
                        {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Error/Success messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <span className="text-red-200">{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl border border-green-500/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-green-200">Message successfully submitted to blockchain!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message input */}
                <div className="relative mb-6">
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Write your message to the future..."
                    className="w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    disabled={loading || !walletConnected}
                  />
                  
                  {/* Character counter */}
                  <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex space-x-1"
                      >
                        <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce delay-300"></div>
                      </motion.div>
                    )}
                    <span className={`text-xs font-mono ${
                      charCount > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {charCount}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  onClick={submitMessage}
                  disabled={loading || !walletConnected || !message.trim()}
                  whileHover={{ scale: walletConnected && message.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: walletConnected && message.trim() ? 0.98 : 1 }}
                  className={`
                    w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300
                    ${walletConnected && message.trim() && !loading
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting to Blockchain...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <span>🚀</span>
                      <span>Immortalize Message</span>
                      <span>⚡</span>
                    </div>
                  )}
                </motion.button>

                {/* Tips */}
                <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <span className="mr-2">💡</span>
                    Tips for your message
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Keep it meaningful - this will live forever on the blockchain</li>
                    <li>• Share wisdom, hopes, or thoughts for future generations</li>
                    <li>• Gas fees apply - ensure you have enough ETH</li>
                    <li>• Press Enter to submit (Shift+Enter for new line)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default MessageInput;