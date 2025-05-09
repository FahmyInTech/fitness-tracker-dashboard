import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shareOptions = [
  {
    name: 'Facebook',
    icon: 'fab fa-facebook',
    color: '#1877F2',
    action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)
  },
  {
    name: 'Twitter',
    icon: 'fab fa-twitter',
    color: '#1DA1F2',
    action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`)
  },
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin',
    color: '#0A66C2',
    action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)
  },
  {
    name: 'Email',
    icon: 'fas fa-envelope',
    color: '#EA4335',
    action: () => window.open(`mailto:?subject=Check this schedule&body=${window.location.href}`)
  }
];

const ShareModal = ({ open, onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  if (!open) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert('Failed to copy link');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-end md:items-center md:justify-end bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md md:rounded-3xl rounded-t-3xl rounded-l-3xl shadow-2xl border border-white/30 p-6 md:p-10 flex flex-col bg-gradient-to-br from-white/95 to-white/75 backdrop-blur-2xl"
          style={{
            margin: 0,
            right: 0,
            bottom: 0,
            minHeight: '60vh',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="md:hidden flex justify-center items-center pt-2 pb-4">
            <div className="w-12 h-1.5 rounded-full bg-[#bdbdbd] opacity-60" />
          </div>
        
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-6 text-[#4ec7a8] text-3xl hover:text-[#22b893] z-10 bg-white/60 rounded-full p-1 shadow-md border border-white/40 transition-all" 
            onClick={onClose} 
            aria-label="Close"
          >
            ×
          </motion.button>

          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-extrabold mb-8 text-[#222] tracking-tight drop-shadow-sm"
          >
            Share Schedule
          </motion.h2>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <input
                type="text"
                className="w-full border border-white/40 shadow-sm rounded-2xl px-4 py-3 bg-white/70 text-[#222] focus:outline-none focus:ring-2 focus:ring-[#4ec7a8] transition-all"
                value={window.location.href}
                readOnly
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#4ec7a8] to-[#22b893] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-[#22b893] hover:to-[#4ec7a8] transition-all"
                onClick={handleCopyLink}
              >
                {copySuccess ? 'Copied!' : 'Copy Link'}
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/70 border border-white/40 hover:border-[#4ec7a8] transition-all group"
                  onClick={option.action}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                    style={{ backgroundColor: option.color }}
                  >
                    <i className={`${option.icon} text-xl`}></i>
                  </div>
                  <span className="font-semibold text-[#222]">{option.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal; 