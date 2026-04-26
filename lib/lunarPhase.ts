// Lunar phase calculator based on astronomical algorithms
// Returns moon phase for any given date

export type MoonPhase = 
  | 'New Moon'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full Moon'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export interface LunarInfo {
  phase: MoonPhase;
  illumination: number; // 0-100%
  emoji: string;
  magickalEnergy: string;
}

const LUNAR_CYCLE = 29.53058867; // Average lunar cycle in days
const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z').getTime(); // Known new moon reference

export function getMoonPhase(date: Date = new Date()): LunarInfo {
  const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON) / (1000 * 60 * 60 * 24);
  const currentCycleDay = ((daysSinceNewMoon % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
  
  // Calculate illumination (simplified)
  const illumination = Math.round((1 - Math.cos((currentCycleDay / LUNAR_CYCLE) * 2 * Math.PI)) / 2 * 100);
  
  // Determine phase based on cycle day
  let phase: MoonPhase;
  let emoji: string;
  let magickalEnergy: string;
  
  if (currentCycleDay < 1.85) {
    phase = 'New Moon';
    emoji = '🌑';
    magickalEnergy = 'New beginnings, setting intentions, banishing, shadow work';
  } else if (currentCycleDay < 7.38) {
    phase = 'Waxing Crescent';
    emoji = '🌒';
    magickalEnergy = 'Setting intentions, attraction, growth, courage';
  } else if (currentCycleDay < 9.23) {
    phase = 'First Quarter';
    emoji = '🌓';
    magickalEnergy = 'Taking action, overcoming obstacles, strength, determination';
  } else if (currentCycleDay < 14.77) {
    phase = 'Waxing Gibbous';
    emoji = '🌔';
    magickalEnergy = 'Refinement, patience, nurturing, development';
  } else if (currentCycleDay < 16.61) {
    phase = 'Full Moon';
    emoji = '🌕';
    magickalEnergy = 'Manifestation, power, divination, charging, gratitude';
  } else if (currentCycleDay < 22.15) {
    phase = 'Waning Gibbous';
    emoji = '🌖';
    magickalEnergy = 'Gratitude, sharing wisdom, introspection, cleansing';
  } else if (currentCycleDay < 24.00) {
    phase = 'Last Quarter';
    emoji = '🌗';
    magickalEnergy = 'Release, forgiveness, breaking bad habits, letting go';
  } else {
    phase = 'Waning Crescent';
    emoji = '🌘';
    magickalEnergy = 'Rest, recuperation, wisdom, preparation for new cycle';
  }
  
  return { phase, illumination, emoji, magickalEnergy };
}

export function getNextMoonPhase(targetPhase: MoonPhase, fromDate: Date = new Date()): Date {
  const phases: MoonPhase[] = [
    'New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'
  ];
  
  let checkDate = new Date(fromDate);
  let iterations = 0;
  const maxIterations = 35; // Slightly more than one lunar cycle
  
  while (iterations < maxIterations) {
    const { phase } = getMoonPhase(checkDate);
    if (phase === targetPhase) {
      return checkDate;
    }
    checkDate = new Date(checkDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    iterations++;
  }
  
  return checkDate;
}
