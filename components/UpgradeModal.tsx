'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sparkles, BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: 'celtic-cross' | 'export';
}

export function UpgradeModal({ isOpen, onClose, feature = 'celtic-cross' }: UpgradeModalProps) {
  const features = [
    { icon: Moon, text: 'Celtic Cross 10-Card Spread' },
    { icon: BookOpen, text: 'Unlimited Book of Shadows entries' },
    { icon: Download, text: 'Export your grimoire as PDF' },
    { icon: Sparkles, text: 'Exclusive full moon rituals' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-purple/30 bg-background p-6 shadow-2xl">
              {/* Decorative gradient */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-purple/30 blur-3xl" />
              
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-lavender/50 transition-colors hover:text-lavender"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mx-auto mb-4 text-5xl"
                >
                  🌕
                </motion.div>
                <h2 className="font-heading text-2xl text-gold">
                  Full Moon Coven
                </h2>
                <p className="mt-2 text-lavender/70">
                  {feature === 'celtic-cross' 
                    ? 'Unlock the powerful Celtic Cross spread'
                    : 'Export your grimoire to keep forever'}
                </p>

                <ul className="my-6 space-y-3 text-left">
                  {features.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-lavender"
                    >
                      <item.icon className="h-5 w-5 text-gold" />
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple to-forest text-white hover:opacity-90">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade for $14.99/month
                  </Button>
                  <p className="text-xs text-lavender/50">
                    Cancel anytime. Blessed be your practice.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
