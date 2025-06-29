import { motion } from 'framer-motion';

function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements - matching MessageDisplay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-bl from-red-500/25 to-orange-500/25 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Floating particles - matching MessageDisplay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
        ></motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Log your
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-green-500 bg-clip-text text-transparent">
            presence
          </span>
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            on-chain
          </span>
        </motion.h1>

        {/* Subtitle with enhanced styling */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Leave a <span className="text-purple-400 font-semibold">trace</span>. 
          Stay <span className="text-pink-400 font-semibold">remembered</span>.
          <br />
          <span className="text-lg md:text-xl text-gray-400 mt-2 block">
            Immortalize your thoughts on the blockchain forever
          </span>
        </motion.p>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-400/30"
          >
            <a href="./MessageInput.tsx">Start Writing</a>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border-2 border-blue-400/50 text-blue-400 font-bold text-lg rounded-full hover:bg-blue-500/10 transition-all duration-300"
          >
            <a href="./MessageDisplay.tsx">View Messages</a>
          </motion.button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: "🔗",
              title: "Immutable",
              description: "Once written, never erased"
            },
            {
              icon: "🌐",
              title: "Decentralized",
              description: "Stored on the blockchain"
            },
            {
              icon: "⚡",
              title: "Instant",
              description: "Real-time on-chain updates"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.5, type: "spring" }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"
        ></motion.div>
      </motion.section>
    </div>
  );
}

export default Hero;