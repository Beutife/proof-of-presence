import { motion } from 'framer-motion';
import ethLogo from '../assets/eth.png';

function Footer() {
  return (
    <motion.footer
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mt-auto overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.95) 0%, rgba(236, 72, 153, 0.95) 50%, rgba(59, 130, 246, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Subtle animated elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tr from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-50"></div>
                <img src={ethLogo} alt="Logo" className="relative w-10 h-10 rounded-full border-2 border-white/80 shadow-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  Proof of Presence
                </h3>
                <p className="text-sm text-blue-200/80">Immortalize your thoughts</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Leave your mark on the blockchain forever. Every message you write becomes a permanent part of the decentralized ledger, ensuring your thoughts live on for eternity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Write Message', href: '#write' },
                { name: 'View Messages', href: '#explore' },
                { name: 'How It Works', href: '#about' },
                { name: 'Smart Contract', href: '#contract' }
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                  >
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 group-hover:bg-pink-400 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
            <div className="space-y-3">
              <a 
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">G</span>
                </div>
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">T</span>
                </div>
                <span className="text-sm">Twitter</span>
              </a>
              <a 
                href="https://discord.gg/your-server"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">D</span>
                </div>
                <span className="text-sm">Discord</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Tech stack */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <img src={ethLogo} alt="Ethereum" className="w-4 h-4" />
              <span className="text-xs text-white/80 font-medium">Ethereum</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Solidity</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <span className="text-xs text-white/80 font-medium">React</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-300">
              © 2024 Proof of Presence. Built with ❤️ on the blockchain.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Immortalizing thoughts, one block at a time.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
}

export default Footer;