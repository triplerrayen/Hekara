'use client';

import { motion } from 'framer-motion';
import { Trash2, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import type { SavedSpell, SavedReading } from '@/lib/storage';

interface SpellEntryProps {
  spell: SavedSpell;
  onDelete: (id: string) => void;
}

export function SpellEntry({ spell, onDelete }: SpellEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border border-purple/30 bg-purple/10 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-forest/20 p-2">
            <BookOpen className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h3 className="font-heading text-gold">{spell.title}</h3>
            <p className="text-sm text-lavender/70">
              {spell.path} • {spell.moonPhase}
            </p>
            <p className="text-xs text-lavender/50">
              {format(new Date(spell.savedAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-lavender/50 transition-colors hover:text-lavender"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <button
            onClick={() => onDelete(spell.id)}
            className="text-lavender/50 transition-colors hover:text-red-400"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-purple/20 pt-4"
        >
          <p className="mb-2 text-sm text-lavender/80">
            <span className="text-gold">Intention:</span> {spell.intention}
          </p>
          <div className="prose prose-invert max-w-none text-sm text-lavender/80">
            {spell.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

interface ReadingEntryProps {
  reading: SavedReading;
  onDelete: (id: string) => void;
}

export function ReadingEntry({ reading, onDelete }: ReadingEntryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border border-purple/30 bg-purple/10 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-purple/20 p-2">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h3 className="font-heading text-gold line-clamp-1">{reading.question}</h3>
            <p className="text-sm text-lavender/70">
              {reading.spreadType} • {reading.cards.length} card{reading.cards.length > 1 ? 's' : ''}
            </p>
            <p className="text-xs text-lavender/50">
              {format(new Date(reading.savedAt), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-lavender/50 transition-colors hover:text-lavender"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          <button
            onClick={() => onDelete(reading.id)}
            className="text-lavender/50 transition-colors hover:text-red-400"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-purple/20 pt-4"
        >
          <div className="mb-3 flex flex-wrap gap-2">
            {reading.cards.map((card, i) => (
              <span
                key={i}
                className="rounded-full bg-purple/20 px-2 py-1 text-xs text-lavender"
              >
                {card.name} {card.isReversed ? '(R)' : ''}
              </span>
            ))}
          </div>
          <div className="prose prose-invert max-w-none text-sm text-lavender/80">
            {reading.interpretation.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
