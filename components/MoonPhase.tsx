'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getMoonPhase, type LunarInfo } from '@/lib/lunarPhase';

export function MoonPhase({ showDetails = false }: { showDetails?: boolean }) {
  const [lunar, setLunar] = useState<LunarInfo | null>(null);

  useEffect(() => {
    setLunar(getMoonPhase());
  }, []);

  if (!lunar) return null;

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span 
        className="text-2xl"
        animate={{ 
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {lunar.emoji}
      </motion.span>
      {showDetails && (
        <div className="text-sm">
          <p className="font-heading text-gold">{lunar.phase}</p>
          <p className="text-lavender/70 text-xs">{lunar.illumination}% illuminated</p>
        </div>
      )}
    </motion.div>
  );
}

export function MoonPhaseDisplay() {
  const [lunar, setLunar] = useState<LunarInfo | null>(null);

  useEffect(() => {
    setLunar(getMoonPhase());
  }, []);

  if (!lunar) return null;

  return (
    <motion.div 
      className="rounded-xl border border-purple/30 bg-purple/10 p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        <motion.span 
          className="text-4xl"
          animate={{ 
            filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {lunar.emoji}
        </motion.span>
        <div>
          <h3 className="font-heading text-lg text-gold">{lunar.phase}</h3>
          <p className="text-sm text-lavender/70">{lunar.illumination}% illuminated</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-lavender/80">
        <span className="text-gold">Magickal energy:</span> {lunar.magickalEnergy}
      </p>
    </motion.div>
  );
}
