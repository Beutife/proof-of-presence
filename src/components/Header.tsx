import { motion } from 'framer-motion';
import WalletConnect from './WalletConnect';

function Header() {
  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full sticky top-0 z-20"
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
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Main header content */}
      <div className="relative z-10 w-full px-6 flex items-center justify-between h-20 md:h-24">
        {/* Left: Logo and Title */}
        <motion.div 
          className="flex items-center space-x-4 min-w-0" 
          style={{ flex: 1 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Enhanced logo with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-50 animate-pulse"></div>
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/80 shadow-lg shrink-0 hover:scale-110 transition-transform duration-300" 
            />
          </div>
          
          {/* Enhanced title with gradient */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
              Proof of Presence
            </span>
            <span className="text-xs md:text-sm text-blue-200/80 font-medium tracking-wider">
              IMMORTALIZE YOUR THOUGHTS
            </span>
          </div>
        </motion.div>

        {/* Center: Enhanced Navigation */}
        <motion.nav 
          className="hidden md:flex space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { name: 'Home', href: '#home' },
            { name: 'Write', href: '#write' },
            { name: 'Explore', href: '#explore' },
            { name: 'About', href: '#about' }
          ].map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative group px-4 py-2 rounded-full text-gray-200 hover:text-white font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <span className="relative z-10">{item.name}</span>
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              {/* Active indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-4 transition-all duration-300"></div>
            </motion.a>
          ))}
        </motion.nav>

        {/* Right: Wallet Connect with enhanced styling */}
        <motion.div 
          className="flex items-center space-x-4 min-w-0" 
          style={{ flex: 1, justifyContent: 'flex-end' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Status indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/80 font-medium">Live</span>
          </div>
          
          <WalletConnect />
        </motion.div>
      </div>

      {/* Enhanced mobile header */}
      <motion.div 
        className="flex md:hidden justify-center items-center py-3 border-t border-white/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            Proof of Presence
          </span>
        </div>
      </motion.div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
    </motion.header>
  );
}

export default Header;