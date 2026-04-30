import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Preloader from './components/Preloader';

function App() {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" theme={theme} onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`min-h-screen text-charcoal dark:text-gray-100 transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-cream'}`}
          >
            <Routes>
              <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="*" element={<NotFound theme={theme} />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
