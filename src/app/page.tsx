'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/themeToffle';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const words = ['modern', 'beautiful', 'professional', 'stunning', 'amazing', 'incredible'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Enhanced Navbar */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center"
              >
                <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {siteConfig.name}
                </Link>
              </motion.div>

              {/* Navigation Links */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden md:flex items-center space-x-8"
              >
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#features" 
                  onClick={scrollToFeatures}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer font-medium"
                >
                  Features
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                    Pricing
                  </Link>
                </motion.div>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={siteConfig.links.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:hidden flex items-center space-x-2"
              >
                <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm">
                  Sign Up
                </Link>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center"
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden pt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              {/* Enhanced Badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8"
              >
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  ✨ Introducing Form Builder Pro
                </span>
                <motion.svg 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-4 h-4 ml-3 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.div>
              
              {/* Enhanced Main Headline */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-800 dark:text-gray-200 mb-8 leading-tight"
              >
                Make your forms look
                <br />
                <motion.span 
                  className="inline-block mt-4"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </motion.h1>
              
              {/* Enhanced Description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
              >
                Create stunning forms with our drag-and-drop builder. No coding required. 
                Build, share, and analyze responses with beautiful animations and modern design.
              </motion.p>
              
              {/* Enhanced CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center px-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/auth/signup" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform"
                  >
                    🚀 Start Building Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/form-builder" 
                    className="inline-block px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:bg-white dark:hover:bg-gray-700"
                  >
                    🎯 Try Demo
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                  <div className="text-gray-600 dark:text-gray-400">Forms Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
                  <div className="text-gray-600 dark:text-gray-400">Responses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">99.9%</div>
                  <div className="text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div id="features" className="py-20 sm:py-32 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Powerful Features
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
                Everything you need to create and manage forms
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Feature 1 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Easy Form Builder</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Drag and drop interface to create forms with multiple question types including text, multiple choice, checkboxes, and more.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-time Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  View responses in real-time with beautiful charts and graphs. Export data to CSV for further analysis.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Share your forms with a simple link. No registration required for respondents to fill out your forms.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your data is secure with authentication and private forms. Only you can access your form responses.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Responsive Design</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Forms look great on all devices - desktop, tablet, and mobile. Perfect for collecting responses anywhere.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instant Setup</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get started in seconds. No complex setup required. Create your first form in under a minute.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-8">
              Ready to Create Your First Form?
            </h2>
            <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Join thousands of users who trust our platform for their form needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/auth/signup" 
                className="inline-block px-10 py-5 bg-white text-blue-600 hover:bg-gray-100 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-2xl shadow-xl"
              >
                🚀 Start Building Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Create, share, and analyze forms with ease
              </p>
              <div className="flex justify-center space-x-8 mb-8">
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                  Login
                </Link>
                <Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors duration-200 font-medium">
                  Sign Up
                </Link>
              </div>
              <div className="pt-8 border-t border-gray-800">
                <p className="text-gray-500 text-sm">
                  © 2025 {siteConfig.name}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
