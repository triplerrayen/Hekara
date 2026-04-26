'use client';

import { motion } from 'framer-motion';
import { type DrawnCard } from '@/lib/tarotDeck';

interface CardFlipProps {
  card: DrawnCard;
  isFlipped: boolean;
  onFlip: () => void;
  position?: string;
  index: number;
}

export function CardFlip({ card, isFlipped, onFlip, position, index }: CardFlipProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {position && (
        <span className="text-xs text-gold/80">{position}</span>
      )}
      <motion.div
        className="relative h-48 w-32 cursor-pointer perspective-1000 sm:h-56 sm:w-36"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 }}
        onClick={onFlip}
      >
        <motion.div
          className="relative h-full w-full preserve-3d"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-gold/50 bg-gradient-to-br from-purple to-forest backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className="text-4xl"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity },
                }}
              >
                ✨
              </motion.span>
              <span className="text-xs text-lavender/70">Click to reveal</span>
            </div>
          </div>

          {/* Card Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-gold/50 bg-background p-3 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className={`flex flex-col items-center gap-1 ${card.isReversed ? 'rotate-180' : ''}`}>
              <span className="text-2xl">
                {card.arcana === 'major' ? '🌟' : getSuitEmoji(card.suit)}
              </span>
              <h3 className="text-center font-heading text-sm text-gold leading-tight">
                {card.name}
              </h3>
              {card.isReversed && (
                <span className="text-[10px] text-lavender/60">(Reversed)</span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {(card.isReversed ? card.keywords.reversed : card.keywords.upright)
                .slice(0, 2)
                .map((keyword, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-purple/20 px-2 py-0.5 text-[9px] text-lavender/80"
                  >
                    {keyword}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function getSuitEmoji(suit?: string): string {
  switch (suit) {
    case 'wands': return '🪄';
    case 'cups': return '🏆';
    case 'swords': return '⚔️';
    case 'pentacles': return '🪙';
    default: return '🌟';
  }
}
