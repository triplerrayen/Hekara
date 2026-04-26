// Local storage helpers for Book of Shadows and Tarot Journal

export interface SavedSpell {
  id: string;
  title: string;
  intention: string;
  path: string;
  moonPhase: string;
  content: string;
  savedAt: string;
}

export interface SavedReading {
  id: string;
  question: string;
  spreadType: string;
  cards: Array<{
    name: string;
    position: string;
    isReversed: boolean;
  }>;
  interpretation: string;
  savedAt: string;
}

const SPELLS_KEY = 'witchy-grimoire-spells';
const READINGS_KEY = 'witchy-tarot-readings';

export function getSpells(): SavedSpell[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(SPELLS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveSpell(spell: Omit<SavedSpell, 'id' | 'savedAt'>): SavedSpell {
  const spells = getSpells();
  const newSpell: SavedSpell = {
    ...spell,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };
  spells.unshift(newSpell);
  localStorage.setItem(SPELLS_KEY, JSON.stringify(spells));
  return newSpell;
}

export function deleteSpell(id: string): void {
  const spells = getSpells().filter(s => s.id !== id);
  localStorage.setItem(SPELLS_KEY, JSON.stringify(spells));
}

export function getReadings(): SavedReading[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(READINGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveReading(reading: Omit<SavedReading, 'id' | 'savedAt'>): SavedReading {
  const readings = getReadings();
  const newReading: SavedReading = {
    ...reading,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  };
  readings.unshift(newReading);
  localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  return newReading;
}

export function deleteReading(id: string): void {
  const readings = getReadings().filter(r => r.id !== id);
  localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
}
