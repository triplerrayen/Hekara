'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trash2, Download, Save } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { SpellForm } from '@/components/SpellForm';
import { UpgradeModal } from '@/components/UpgradeModal';
import { Button } from '@/components/ui/button';
import { getSpells, saveSpell, deleteSpell, type SavedSpell } from '@/lib/storage';
import { format } from 'date-fns';

export default function GrimoirePage() {
  const [spellContent, setSpellContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedSpells, setSavedSpells] = useState<SavedSpell[]>([]);
  const [currentSpellData, setCurrentSpellData] = useState<{
    path: string;
    intention: string;
    moonPhase: string;
  } | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    setSavedSpells(getSpells());
  }, []);

  const handleSubmit = async (data: { path: string; intention: string; moonPhase: string }) => {
    setIsLoading(true);
    setSpellContent('');
    setCurrentSpellData(data);

    try {
      const response = await fetch('/api/spell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to generate spell');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        fullContent += chunk;
        setSpellContent(fullContent);
      }
    } catch (error) {
      console.error('Error generating spell:', error);
      setSpellContent('The spirits are quiet at this moment. Please try again when the energy is right.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSpell = () => {
    if (!spellContent || !currentSpellData) return;

    // Extract title from the content (first line that looks like a title)
    const lines = spellContent.split('\n');
    let title = 'Untitled Spell';
    for (const line of lines) {
      const trimmed = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      if (trimmed && trimmed.length > 3 && trimmed.length < 100) {
        title = trimmed;
        break;
      }
    }

    const newSpell = saveSpell({
      title,
      intention: currentSpellData.intention,
      path: currentSpellData.path,
      moonPhase: currentSpellData.moonPhase,
      content: spellContent,
    });

    setSavedSpells([newSpell, ...savedSpells]);
    setSpellContent('');
    setCurrentSpellData(null);
  };

  const handleDeleteSpell = (id: string) => {
    deleteSpell(id);
    setSavedSpells(savedSpells.filter(s => s.id !== id));
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
              The Grimoire
            </h1>
            <p className="mt-2 text-lavender/70">
              Craft personalized spells with the wisdom of an ancient spell-weaver
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Spell Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-purple/30 bg-purple/5 p-6"
            >
              <h2 className="mb-4 flex items-center gap-2 font-heading text-xl text-gold">
                <BookOpen className="h-5 w-5" />
                Weave a Spell
              </h2>
              <SpellForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>

            {/* Spell Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-purple/30 bg-purple/5 p-6"
            >
              <h2 className="mb-4 font-heading text-xl text-gold">
                Your Spell
              </h2>
              {spellContent ? (
                <div className="space-y-4">
                  <div className="max-h-[500px] overflow-y-auto rounded-lg bg-background/50 p-4">
                    <div className="prose prose-invert max-w-none text-lavender/90">
                      {spellContent.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  {!isLoading && (
                    <Button
                      onClick={handleSaveSpell}
                      className="w-full bg-gradient-to-r from-forest to-purple text-white hover:opacity-90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save to Book of Shadows
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-center text-lavender/50">
                  <p>Your spell will appear here once you cast it...</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Book of Shadows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-heading text-2xl text-gold">
                <BookOpen className="h-6 w-6" />
                Book of Shadows
              </h2>
              {savedSpells.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpgrade(true)}
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              )}
            </div>

            {savedSpells.length === 0 ? (
              <div className="rounded-2xl border border-purple/20 bg-purple/5 p-8 text-center">
                <p className="text-lavender/60">
                  Your Book of Shadows is empty. Create and save spells to build your collection.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {savedSpells.map((spell) => (
                    <motion.div
                      key={spell.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="group rounded-xl border border-purple/30 bg-purple/10 p-4 transition-all hover:border-purple/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-heading text-lg text-gold">{spell.title}</h3>
                          <p className="mt-1 text-sm text-lavender/70">
                            {spell.path} witch spell • {spell.moonPhase}
                          </p>
                          <p className="mt-1 text-xs text-lavender/50">
                            Saved {format(new Date(spell.savedAt), 'MMM d, yyyy')}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-lavender/80">
                            {spell.intention}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteSpell(spell.id)}
                          className="text-lavender/30 transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <UpgradeModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        feature="export"
      />
    </>
  );
}
