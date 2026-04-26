'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, BookOpen, Sparkles, Filter } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { SpellEntry, ReadingEntry } from '@/components/JournalEntry';
import { 
  getSpells, 
  getReadings, 
  deleteSpell, 
  deleteReading,
  type SavedSpell, 
  type SavedReading 
} from '@/lib/storage';

type FilterType = 'all' | 'spells' | 'readings';

interface JournalItem {
  type: 'spell' | 'reading';
  data: SavedSpell | SavedReading;
  savedAt: string;
}

export default function JournalPage() {
  const [spells, setSpells] = useState<SavedSpell[]>([]);
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    setSpells(getSpells());
    setReadings(getReadings());
  }, []);

  const handleDeleteSpell = (id: string) => {
    deleteSpell(id);
    setSpells(spells.filter(s => s.id !== id));
  };

  const handleDeleteReading = (id: string) => {
    deleteReading(id);
    setReadings(readings.filter(r => r.id !== id));
  };

  // Combine and sort by date
  const allItems: JournalItem[] = [
    ...spells.map(s => ({ type: 'spell' as const, data: s, savedAt: s.savedAt })),
    ...readings.map(r => ({ type: 'reading' as const, data: r, savedAt: r.savedAt })),
  ].sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

  const filteredItems = allItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'spells') return item.type === 'spell';
    if (filter === 'readings') return item.type === 'reading';
    return true;
  });

  const spellCount = spells.length;
  const readingCount = readings.length;

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
              Magickal Journal
            </h1>
            <p className="mt-2 text-lavender/70">
              Your saved spells and tarot readings in one sacred place
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 grid gap-4 sm:grid-cols-3"
          >
            <div className="rounded-xl border border-purple/30 bg-purple/10 p-4 text-center">
              <ScrollText className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="text-2xl font-bold text-lavender">{spellCount + readingCount}</p>
              <p className="text-sm text-lavender/60">Total Entries</p>
            </div>
            <div className="rounded-xl border border-forest/30 bg-forest/10 p-4 text-center">
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="text-2xl font-bold text-lavender">{spellCount}</p>
              <p className="text-sm text-lavender/60">Saved Spells</p>
            </div>
            <div className="rounded-xl border border-purple/30 bg-purple/10 p-4 text-center">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="text-2xl font-bold text-lavender">{readingCount}</p>
              <p className="text-sm text-lavender/60">Tarot Readings</p>
            </div>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 flex items-center gap-4"
          >
            <Filter className="h-5 w-5 text-lavender/50" />
            <div className="flex gap-2">
              {(['all', 'spells', 'readings'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`rounded-full px-4 py-1.5 text-sm capitalize transition-all ${
                    filter === type
                      ? 'bg-purple/30 text-gold'
                      : 'text-lavender/60 hover:text-lavender'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Journal Entries */}
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-purple/20 bg-purple/5 p-12 text-center"
            >
              <ScrollText className="mx-auto mb-4 h-12 w-12 text-lavender/30" />
              <h2 className="mb-2 font-heading text-xl text-gold">
                Your Journal Awaits
              </h2>
              <p className="text-lavender/60">
                {filter === 'all' 
                  ? 'Save spells from the Grimoire and readings from the Tarot to build your collection.'
                  : filter === 'spells'
                  ? 'No spells saved yet. Visit the Grimoire to create and save your first spell.'
                  : 'No readings saved yet. Visit the Tarot to receive and save your first reading.'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  item.type === 'spell' ? (
                    <SpellEntry
                      key={`spell-${(item.data as SavedSpell).id}`}
                      spell={item.data as SavedSpell}
                      onDelete={handleDeleteSpell}
                    />
                  ) : (
                    <ReadingEntry
                      key={`reading-${(item.data as SavedReading).id}`}
                      reading={item.data as SavedReading}
                      onDelete={handleDeleteReading}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
