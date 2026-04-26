'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFlip } from './CardFlip';
import { drawCards, spreadPositions, type DrawnCard } from '@/lib/tarotDeck';
import { UpgradeModal } from './UpgradeModal';

type SpreadType = 'single' | 'pastPresentFuture' | 'celticCross';

interface TarotSpreadProps {
  question: string;
  onReadingComplete: (cards: DrawnCard[], interpretation: string, spreadType: string) => void;
}

export function TarotSpread({ question, onReadingComplete }: TarotSpreadProps) {
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);

  const spreads = [
    { type: 'single' as const, name: 'Daily Pull', cards: 1, description: 'One card for quick guidance' },
    { type: 'pastPresentFuture' as const, name: 'Past Present Future', cards: 3, description: 'See your timeline' },
    { type: 'celticCross' as const, name: 'Celtic Cross', cards: 10, description: 'Deep insight', locked: true },
  ];

  const handleSpreadSelect = (type: SpreadType) => {
    if (type === 'celticCross') {
      setShowUpgrade(true);
      return;
    }
    setSpreadType(type);
  };

  const handleDrawCards = () => {
    if (!spreadType) return;
    
    const cardCount = spreadType === 'single' ? 1 : spreadType === 'pastPresentFuture' ? 3 : 10;
    const positions = spreadPositions[spreadType];
    const drawnCards = drawCards(cardCount).map((card, i) => ({
      ...card,
      position: positions[i],
    }));
    
    setCards(drawnCards);
    setReadingStarted(true);
    setFlippedCards(new Set());
    setInterpretation('');
  };

  const handleCardFlip = async (index: number) => {
    if (flippedCards.has(index)) return;
    
    const newFlipped = new Set(flippedCards);
    newFlipped.add(index);
    setFlippedCards(newFlipped);

    // When all cards are flipped, get interpretation
    if (newFlipped.size === cards.length) {
      await getInterpretation();
    }
  };

  const getInterpretation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, cards }),
      });

      if (!response.ok) throw new Error('Failed to get interpretation');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let fullInterpretation = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        fullInterpretation += chunk;
        setInterpretation(fullInterpretation);
      }

      onReadingComplete(cards, fullInterpretation, spreadType || 'single');
    } catch (error) {
      console.error('Error getting interpretation:', error);
      setInterpretation('The spirits are quiet at this moment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetReading = () => {
    setSpreadType(null);
    setCards([]);
    setFlippedCards(new Set());
    setInterpretation('');
    setReadingStarted(false);
  };

  if (!spreadType) {
    return (
      <>
        <div className="space-y-4">
          <h3 className="font-heading text-lg text-gold">Choose Your Spread</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {spreads.map((spread) => (
              <motion.button
                key={spread.type}
                onClick={() => handleSpreadSelect(spread.type)}
                className={`relative rounded-xl border p-4 text-left transition-all ${
                  spread.locked
                    ? 'border-purple/20 bg-purple/5 text-lavender/50'
                    : 'border-purple/30 bg-purple/10 text-lavender hover:border-gold/50'
                }`}
                whileHover={{ scale: spread.locked ? 1 : 1.02 }}
                whileTap={{ scale: spread.locked ? 1 : 0.98 }}
              >
                {spread.locked && (
                  <div className="absolute right-2 top-2">
                    <Lock className="h-4 w-4 text-gold/50" />
                  </div>
                )}
                <span className="block font-heading text-gold">{spread.name}</span>
                <span className="block text-sm opacity-70">{spread.cards} card{spread.cards > 1 ? 's' : ''}</span>
                <span className="block text-xs opacity-50">{spread.description}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <UpgradeModal 
          isOpen={showUpgrade} 
          onClose={() => setShowUpgrade(false)} 
          feature="celtic-cross"
        />
      </>
    );
  }

  if (!readingStarted) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center text-lavender/70">
          You have chosen the <span className="text-gold">{spreads.find(s => s.type === spreadType)?.name}</span> spread.
        </p>
        <Button
          onClick={handleDrawCards}
          className="bg-gradient-to-r from-purple to-forest text-white hover:opacity-90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Draw Cards
        </Button>
        <button
          onClick={() => setSpreadType(null)}
          className="text-sm text-lavender/50 hover:text-lavender"
        >
          Choose different spread
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card, index) => (
          <CardFlip
            key={index}
            card={card}
            isFlipped={flippedCards.has(index)}
            onFlip={() => handleCardFlip(index)}
            position={card.position}
            index={index}
          />
        ))}
      </div>

      {flippedCards.size < cards.length && (
        <p className="text-center text-sm text-lavender/60">
          Click each card to reveal ({flippedCards.size}/{cards.length} revealed)
        </p>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-gold">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>The spirits speak...</span>
        </div>
      )}

      {interpretation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-purple/30 bg-purple/10 p-6"
        >
          <h3 className="mb-4 font-heading text-lg text-gold">Your Reading</h3>
          <div className="prose prose-invert max-w-none text-lavender/90">
            {interpretation.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-3">{paragraph}</p>
            ))}
          </div>
        </motion.div>
      )}

      {interpretation && !isLoading && (
        <div className="flex justify-center">
          <Button
            onClick={resetReading}
            variant="outline"
            className="border-purple/30 text-lavender hover:bg-purple/10"
          >
            New Reading
          </Button>
        </div>
      )}
    </div>
  );
}
