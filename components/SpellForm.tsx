'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMoonPhase, type LunarInfo } from '@/lib/lunarPhase';
import { MoonPhaseDisplay } from './MoonPhase';

const witchPaths = [
  { value: 'wiccan', label: 'Wiccan', description: 'Traditional Wicca with deity work' },
  { value: 'eclectic', label: 'Eclectic', description: 'Blend of various traditions' },
  { value: 'green', label: 'Green Witch', description: 'Herb and nature focused' },
  { value: 'hedge', label: 'Hedge Witch', description: 'Spirit work and dreamcraft' },
  { value: 'sea', label: 'Sea Witch', description: 'Ocean and water magic' },
  { value: 'kitchen', label: 'Kitchen Witch', description: 'Hearth and home magic' },
];

interface SpellFormProps {
  onSubmit: (data: { path: string; intention: string; moonPhase: string }) => void;
  isLoading: boolean;
}

export function SpellForm({ onSubmit, isLoading }: SpellFormProps) {
  const [path, setPath] = useState('');
  const [intention, setIntention] = useState('');
  const [lunar, setLunar] = useState<LunarInfo | null>(null);

  useEffect(() => {
    setLunar(getMoonPhase());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!path || !intention.trim() || !lunar) return;
    onSubmit({ path, intention, moonPhase: lunar.phase });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <MoonPhaseDisplay />

      <div>
        <label className="mb-2 block font-heading text-gold">
          Your Witchy Path
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {witchPaths.map((item) => (
            <motion.button
              key={item.value}
              type="button"
              onClick={() => setPath(item.value)}
              className={`rounded-lg border p-3 text-left transition-all ${
                path === item.value
                  ? 'border-gold bg-purple/20 text-gold'
                  : 'border-purple/30 bg-purple/5 text-lavender/70 hover:border-purple/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="block text-sm font-medium">{item.label}</span>
              <span className="block text-xs opacity-70">{item.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="intention" className="mb-2 block font-heading text-gold">
          Your Intention
        </label>
        <textarea
          id="intention"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="What do you wish to manifest? Describe your desire with feeling..."
          className="h-32 w-full resize-none rounded-lg border border-purple/30 bg-purple/5 px-4 py-3 text-lavender placeholder-lavender/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
        />
      </div>

      <Button
        type="submit"
        disabled={!path || !intention.trim() || isLoading}
        className="w-full bg-gradient-to-r from-purple to-forest text-white hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Weaving your spell...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Cast Spell
          </>
        )}
      </Button>
    </form>
  );
}
