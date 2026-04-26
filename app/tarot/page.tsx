'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { TarotSpread } from '@/components/TarotSpread';
import { Button } from '@/components/ui/button';
import { saveReading, type SavedReading } from '@/lib/storage';
import type { DrawnCard } from '@/lib/tarotDeck';

export default function TarotPage() {
  const [question, setQuestion] = useState('');
  const [readingStarted, setReadingStarted] = useState(false);
  const [lastSaved, setLastSaved] = useState<SavedReading | null>(null);

  const handleStartReading = () => {
    if (!question.trim()) return;
    setReadingStarted(true);
    setLastSaved(null);
  };

  const handleReadingComplete = (
    cards: DrawnCard[], 
    interpretation: string, 
    spreadType: string
  ) => {
    const reading = saveReading({
      question,
      spreadType,
      cards: cards.map(c => ({
        name: c.name,
        position: c.position || '',
        isReversed: c.isReversed,
      })),
      interpretation,
    });
    setLastSaved(reading);
  };

  const handleNewReading = () => {
    setQuestion('');
    setReadingStarted(false);
    setLastSaved(null);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <h1 className="font-heading text-3xl text-gold sm:text-4xl">
              The Tarot
            </h1>
            <p className="mt-2 text-lavender/70">
              Draw cards and receive wisdom from across the veil
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-purple/30 bg-purple/5 p-6"
          >
            {!readingStarted ? (
              <div className="mx-auto max-w-xl space-y-6">
                <div>
                  <label htmlFor="question" className="mb-2 block font-heading text-lg text-gold">
                    What seeks your heart?
                  </label>
                  <p className="mb-4 text-sm text-lavender/60">
                    Share your question or situation. The more specific, the more insightful your reading will be.
                  </p>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What guidance do you seek? Describe your situation, concern, or question..."
                    className="h-32 w-full resize-none rounded-lg border border-purple/30 bg-purple/5 px-4 py-3 text-lavender placeholder-lavender/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                  />
                </div>

                <Button
                  onClick={handleStartReading}
                  disabled={!question.trim()}
                  className="w-full bg-gradient-to-r from-purple to-forest text-white hover:opacity-90 disabled:opacity-50"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Begin Reading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-lavender/50">
                  <p>Take a deep breath. Center yourself. The cards will speak.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg bg-purple/10 p-4">
                  <p className="text-sm text-lavender/60">Your question:</p>
                  <p className="text-lavender">{question}</p>
                </div>

                <TarotSpread 
                  question={question} 
                  onReadingComplete={handleReadingComplete}
                />

                {lastSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <p className="text-sm text-gold">Reading saved to your journal</p>
                    <Button
                      onClick={handleNewReading}
                      variant="outline"
                      className="border-purple/30 text-lavender hover:bg-purple/10"
                    >
                      New Reading
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 rounded-2xl border border-purple/20 bg-purple/5 p-6"
          >
            <h2 className="mb-4 font-heading text-xl text-gold">
              Reading Tips
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-medium text-lavender">Daily Pull</h3>
                <p className="text-sm text-lavender/60">
                  Perfect for quick daily guidance. Ask about your day ahead or a single concern.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lavender">Past Present Future</h3>
                <p className="text-sm text-lavender/60">
                  See the timeline of your situation. Great for understanding how you got here and where you&apos;re going.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lavender">Reversed Cards</h3>
                <p className="text-sm text-lavender/60">
                  Reversed cards often indicate internalized energy or blocked aspects of the upright meaning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
