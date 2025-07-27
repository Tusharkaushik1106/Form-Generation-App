'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/themeToffle';
import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site';

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
      }, 300); // Half of the transition duration
    }, 3000); // Change word every 3 seconds

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50"></div>
      
      <div className="relative z-10">
        {/* Simple Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {siteConfig.name}
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a 
                  href="#features" 
                  onClick={scrollToFeatures}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Features
                </a>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Pricing
                </Link>
                <a 
                  href={siteConfig.links.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-800 dark:hover:bg-gray-100">
                  Sign Up
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-800 dark:hover:bg-gray-100 text-sm">
                  Sign Up
                </Link>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm mb-6 sm:mb-8 animate-slide-down">
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Introducing Form Builder Pro
                </span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-tight">
                Make your forms look
                <span className="block mt-2">
                  <div className="inline-block px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div 
                      className={`inline-block min-w-[150px] sm:min-w-[200px] text-center transition-transform duration-600 ease-in-out text-black dark:text-white text-lg sm:text-xl md:text-2xl ${
                        isTransitioning ? 'transform -translate-x-full' : 'transform translate-x-0'
                      }`}
                    >
                      {words[currentWordIndex]}
                    </div>
                  </div>
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay px-4">
                Create stunning forms with our drag-and-drop builder. No coding required. 
                Build, share, and analyze responses with beautiful animations and modern design.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in px-4">
                <Link 
                  href="/auth/signup" 
                  className="px-6 sm:px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  Start Building
                </Link>
                <Link 
                  href="/form-builder" 
                  className="px-6 sm:px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Everything you need to create and manage forms
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Easy Form Builder</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop interface to create forms with multiple question types including text, multiple choice, checkboxes, and more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 group">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real-time Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  View responses in real-time with beautiful charts and graphs. Export data to CSV for further analysis.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your forms with a simple link. No registration required for respondents to fill out your forms.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 group">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your data is secure with authentication and private forms. Only you can access your form responses.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Responsive Design</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Forms look great on all devices - desktop, tablet, and mobile. Perfect for collecting responses anywhere.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Instant Setup</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get started in seconds. No complex setup required. Create your first form in under a minute.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Create Your First Form?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who trust our platform for their form needs.
            </p>
            <Link 
              href="/auth/signup" 
              className="inline-block px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              Start Building Now
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{siteConfig.name}</h3>
              <p className="text-gray-400 mb-6">
                Create, share, and analyze forms with ease
              </p>
              <div className="flex justify-center space-x-6">
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link href="/auth/signup" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800">
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
