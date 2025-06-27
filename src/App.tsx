import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MessageInput from './components/MessageInput';
import MessageDisplay from './components/MessageDisplay';
import Footer from './components/Footer';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMessageSubmitted = () => {
    // Trigger a refresh of the MessageDisplay component
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <Header />
        <main className="mx-auto px-4 py-8">
          <Hero />
          <MessageInput onMessageSubmitted={handleMessageSubmitted} />
          <MessageDisplay key={refreshTrigger} />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;