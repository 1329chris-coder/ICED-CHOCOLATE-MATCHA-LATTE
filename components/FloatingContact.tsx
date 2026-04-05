'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, MessageCircle, Mail, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      label: 'Call Now',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'bg-green-500 hover:bg-green-600',
      delay: 0.1
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: 'https://wa.me/15551234567',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      delay: 0.15
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: 'hello@matchalatte.com',
      href: 'mailto:hello@matchalatte.com',
      color: 'bg-blue-500 hover:bg-blue-600',
      delay: 0.2
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
          >
            {contactOptions.map((option) => (
              <motion.a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: option.delay }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${option.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 min-w-[200px] group`}
              >
                <option.icon className="w-5 h-5" />
                <div className="flex flex-col items-start">
                  <span className="text-xs opacity-80 uppercase tracking-tight">{option.label}</span>
                  <span className="text-sm font-semibold">{option.value}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Main Contact Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative z-10 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-matchaGreen to-matchaLight hover:from-matchaLight hover:to-matchaGreen'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="phone"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <Phone className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulsing Ring Animation */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-matchaGreen opacity-50 -z-0"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}
