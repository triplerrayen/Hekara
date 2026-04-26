// Full 78-card Rider-Waite Tarot Deck

export interface TarotCard {
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  keywords: {
    upright: string[];
    reversed: string[];
  };
  element?: string;
  zodiac?: string;
}

export interface DrawnCard extends TarotCard {
  isReversed: boolean;
  position?: string;
}

export const majorArcana: TarotCard[] = [
  { name: 'The Fool', arcana: 'major', number: 0, element: 'Air', keywords: { upright: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'], reversed: ['recklessness', 'risk-taking', 'naivety', 'holding back'] } },
  { name: 'The Magician', arcana: 'major', number: 1, element: 'Air', keywords: { upright: ['manifestation', 'resourcefulness', 'power', 'inspired action'], reversed: ['manipulation', 'poor planning', 'untapped talents', 'deception'] } },
  { name: 'The High Priestess', arcana: 'major', number: 2, element: 'Water', keywords: { upright: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious'], reversed: ['secrets', 'disconnection', 'withdrawal', 'silence'] } },
  { name: 'The Empress', arcana: 'major', number: 3, element: 'Earth', keywords: { upright: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'], reversed: ['creative block', 'dependence', 'emptiness', 'smothering'] } },
  { name: 'The Emperor', arcana: 'major', number: 4, element: 'Fire', keywords: { upright: ['authority', 'structure', 'control', 'fatherhood', 'stability'], reversed: ['tyranny', 'rigidity', 'coldness', 'domination'] } },
  { name: 'The Hierophant', arcana: 'major', number: 5, element: 'Earth', keywords: { upright: ['tradition', 'conformity', 'morality', 'ethics', 'spiritual wisdom'], reversed: ['rebellion', 'subversiveness', 'new approaches', 'freedom'] } },
  { name: 'The Lovers', arcana: 'major', number: 6, element: 'Air', keywords: { upright: ['love', 'harmony', 'relationships', 'values alignment', 'choices'], reversed: ['self-love', 'disharmony', 'imbalance', 'misalignment'] } },
  { name: 'The Chariot', arcana: 'major', number: 7, element: 'Water', keywords: { upright: ['control', 'willpower', 'success', 'action', 'determination'], reversed: ['self-discipline', 'opposition', 'lack of direction', 'aggression'] } },
  { name: 'Strength', arcana: 'major', number: 8, element: 'Fire', keywords: { upright: ['strength', 'courage', 'persuasion', 'influence', 'compassion'], reversed: ['inner strength', 'self-doubt', 'low energy', 'raw emotion'] } },
  { name: 'The Hermit', arcana: 'major', number: 9, element: 'Earth', keywords: { upright: ['soul-searching', 'introspection', 'being alone', 'inner guidance'], reversed: ['isolation', 'loneliness', 'withdrawal', 'lost your way'] } },
  { name: 'Wheel of Fortune', arcana: 'major', number: 10, element: 'Fire', keywords: { upright: ['good luck', 'karma', 'life cycles', 'destiny', 'turning point'], reversed: ['bad luck', 'resistance to change', 'breaking cycles', 'upheaval'] } },
  { name: 'Justice', arcana: 'major', number: 11, element: 'Air', keywords: { upright: ['justice', 'fairness', 'truth', 'cause and effect', 'law'], reversed: ['unfairness', 'lack of accountability', 'dishonesty', 'injustice'] } },
  { name: 'The Hanged Man', arcana: 'major', number: 12, element: 'Water', keywords: { upright: ['pause', 'surrender', 'letting go', 'new perspectives'], reversed: ['delays', 'resistance', 'stalling', 'indecision'] } },
  { name: 'Death', arcana: 'major', number: 13, element: 'Water', keywords: { upright: ['endings', 'change', 'transformation', 'transition', 'rebirth'], reversed: ['resistance to change', 'personal transformation', 'inner purging', 'fear'] } },
  { name: 'Temperance', arcana: 'major', number: 14, element: 'Fire', keywords: { upright: ['balance', 'moderation', 'patience', 'purpose', 'meaning'], reversed: ['imbalance', 'excess', 'self-healing', 'realignment'] } },
  { name: 'The Devil', arcana: 'major', number: 15, element: 'Earth', keywords: { upright: ['shadow self', 'attachment', 'addiction', 'restriction', 'sexuality'], reversed: ['releasing', 'exploring dark thoughts', 'detachment', 'freedom'] } },
  { name: 'The Tower', arcana: 'major', number: 16, element: 'Fire', keywords: { upright: ['sudden change', 'upheaval', 'chaos', 'revelation', 'awakening'], reversed: ['personal transformation', 'fear of change', 'averting disaster', 'delaying'] } },
  { name: 'The Star', arcana: 'major', number: 17, element: 'Air', keywords: { upright: ['hope', 'faith', 'purpose', 'renewal', 'spirituality'], reversed: ['lack of faith', 'despair', 'self-trust', 'disconnection'] } },
  { name: 'The Moon', arcana: 'major', number: 18, element: 'Water', keywords: { upright: ['illusion', 'fear', 'anxiety', 'subconscious', 'intuition'], reversed: ['release of fear', 'repressed emotions', 'inner confusion', 'clarity'] } },
  { name: 'The Sun', arcana: 'major', number: 19, element: 'Fire', keywords: { upright: ['positivity', 'fun', 'warmth', 'success', 'vitality'], reversed: ['inner child', 'feeling down', 'overly optimistic', 'temporary depression'] } },
  { name: 'Judgement', arcana: 'major', number: 20, element: 'Fire', keywords: { upright: ['judgement', 'rebirth', 'inner calling', 'absolution', 'reflection'], reversed: ['self-doubt', 'inner critic', 'ignoring the call', 'fear of death'] } },
  { name: 'The World', arcana: 'major', number: 21, element: 'Earth', keywords: { upright: ['completion', 'integration', 'accomplishment', 'travel', 'wholeness'], reversed: ['seeking personal closure', 'short-cuts', 'delays', 'emptiness'] } },
];

function createSuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles', element: string): TarotCard[] {
  const courtCards = ['Page', 'Knight', 'Queen', 'King'];
  const suitKeywords: Record<string, { upright: string[][]; reversed: string[][] }> = {
    wands: {
      upright: [
        ['inspiration', 'new opportunities', 'growth', 'potential'],
        ['planning', 'first steps', 'decisions', 'discovery'],
        ['expansion', 'foresight', 'overseas opportunities', 'progress'],
        ['celebration', 'harmony', 'homecoming', 'foundation'],
        ['competition', 'rivalry', 'conflict', 'diversity'],
        ['success', 'public recognition', 'progress', 'self-confidence'],
        ['challenge', 'competition', 'perseverance', 'defensive'],
        ['movement', 'fast paced change', 'action', 'alignment'],
        ['resilience', 'courage', 'persistence', 'boundaries'],
        ['burden', 'responsibility', 'hard work', 'stress'],
        ['adventure', 'fearlessness', 'free spirit', 'exploration'],
        ['energy', 'passion', 'action', 'adventure'],
        ['courage', 'determination', 'joy', 'enthusiasm'],
        ['vision', 'entrepreneur', 'honor', 'leadership'],
      ],
      reversed: [
        ['delays', 'lack of planning', 'hesitancy', 'creative blocks'],
        ['personal goals', 'inner alignment', 'fear of unknown', 'planning'],
        ['obstacles', 'delays', 'frustration', 'playing small'],
        ['lack of harmony', 'transition', 'feeling unwelcome', 'instability'],
        ['inner conflict', 'conflict avoidance', 'tension', 'diversity'],
        ['egotism', 'fall from grace', 'reputation', 'self-doubt'],
        ['giving up', 'overwhelmed', 'protective', 'exhausted'],
        ['delays', 'frustration', 'resisting change', 'internal alignment'],
        ['exhaustion', 'hesitation', 'defensive', 'paranoia'],
        ['doing it all', 'duty', 'overwhelm', 'release'],
        ['inner journey', 'personal growth', 'self-discovery', 'maturity'],
        ['delays', 'frustration', 'resisting change', 'internal changes'],
        ['self-assurance', 'inner focus', 'rebuilding energy', 'introspection'],
        ['impulsiveness', 'haste', 'ruthless', 'high expectations'],
      ],
    },
    cups: {
      upright: [
        ['new feelings', 'spirituality', 'intuition', 'creative opportunity'],
        ['unified love', 'partnership', 'mutual attraction', 'connection'],
        ['celebration', 'friendship', 'creativity', 'community'],
        ['apathy', 'contemplation', 'disconnection', 'meditation'],
        ['regret', 'failure', 'disappointment', 'pessimism'],
        ['reunion', 'nostalgia', 'childhood memories', 'innocence'],
        ['opportunities', 'choices', 'illusion', 'fantasy'],
        ['disappointment', 'abandonment', 'withdrawal', 'escapism'],
        ['contentment', 'satisfaction', 'gratitude', 'wish fulfilled'],
        ['harmony', 'alignment', 'family', 'home', 'happiness'],
        ['creative opportunities', 'curiosity', 'possibility', 'intuitive'],
        ['charm', 'romance', 'creativity', 'imaginative'],
        ['compassion', 'calm', 'comfort', 'intuitive', 'emotional security'],
        ['emotionally balanced', 'compassionate', 'diplomatic', 'generous'],
      ],
      reversed: [
        ['blocked creativity', 'emptiness', 'emotional loss', 'repressed emotions'],
        ['self-love', 'break-up', 'disharmony', 'distrust'],
        ['independence', 'alone time', 'hardcore partying', 'three is a crowd'],
        ['retreat', 'withdrawn', 'checking in', 'missed opportunity'],
        ['personal setbacks', 'self-forgiveness', 'moving on', 'acceptance'],
        ['independence', 'moving forward', 'living in the present', 'leaving home'],
        ['lack of purpose', 'diversion', 'confusion', 'alignment'],
        ['avoidance', 'fear of change', 'fear of loss', 'walking away'],
        ['inner happiness', 'materialism', 'dissatisfaction', 'indulgence'],
        ['dysfunction', 'misalignment', 'values', 'broken home'],
        ['creative blocks', 'emotional immaturity', 'insecurity', 'new ideas'],
        ['unrealistic', 'jealousy', 'moodiness', 'disappointment'],
        ['inner feelings', 'self-care', 'self-love', 'co-dependency'],
        ['self-compassion', 'inner feelings', 'moodiness', 'manipulation'],
      ],
    },
    swords: {
      upright: [
        ['breakthrough', 'clarity', 'sharp mind', 'new ideas'],
        ['difficult decisions', 'stalemate', 'denial', 'blocked emotions'],
        ['heartbreak', 'emotional pain', 'sorrow', 'grief'],
        ['rest', 'relaxation', 'meditation', 'contemplation'],
        ['conflict', 'disagreements', 'competition', 'defeat'],
        ['transition', 'change', 'rite of passage', 'releasing baggage'],
        ['betrayal', 'deception', 'getting away', 'strategic'],
        ['restriction', 'limitation', 'self-imposed restriction', 'imprisonment'],
        ['anxiety', 'worry', 'fear', 'depression', 'nightmares'],
        ['painful endings', 'deep wounds', 'betrayal', 'loss'],
        ['curiosity', 'restless energy', 'mental energy', 'thirst for knowledge'],
        ['assertive', 'direct', 'impatient', 'intellectual'],
        ['independent', 'unbiased judgment', 'clear boundaries', 'direct'],
        ['intellectual power', 'authority', 'truth', 'clear thinking'],
      ],
      reversed: [
        ['inner clarity', 're-thinking', 'new perspective', 'clouded judgment'],
        ['indecision', 'confusion', 'release', 'stagnation'],
        ['recovery', 'forgiveness', 'moving on', 'releasing pain'],
        ['restlessness', 'burnout', 'stress', 'lack of rest'],
        ['reconciliation', 'making amends', 'past resentment', 'resolution'],
        ['personal transition', 'resistance to change', 'unfinished business', 'baggage'],
        ['coming clean', 'rethinking', 'caught', 'mental challenges'],
        ['self-acceptance', 'new perspective', 'freedom', 'release'],
        ['inner turmoil', 'deep-seated fears', 'releasing worry', 'secrets'],
        ['recovery', 'regeneration', 'resisting an end', 'fear of change'],
        ['all talk', 'haste', 'scattered energy', 'cynical'],
        ['restless', 'unfocused', 'impulsive', 'burn-out'],
        ['overly emotional', 'easily influenced', 'bitchy', 'cold-hearted'],
        ['quiet power', 'inner truth', 'misuse of power', 'manipulative'],
      ],
    },
    pentacles: {
      upright: [
        ['manifestation', 'new opportunity', 'prosperity', 'new beginnings'],
        ['balance', 'adaptability', 'time management', 'prioritization'],
        ['teamwork', 'learning', 'implementation', 'collaboration'],
        ['conservation', 'security', 'frugality', 'saving'],
        ['financial loss', 'poverty', 'lack mindset', 'isolation'],
        ['giving', 'receiving', 'sharing', 'generosity', 'charity'],
        ['long-term view', 'perseverance', 'investment', 'reward'],
        ['apprenticeship', 'repetitive tasks', 'mastery', 'skill development'],
        ['abundance', 'luxury', 'self-sufficiency', 'financial independence'],
        ['wealth', 'financial security', 'family', 'long-term success'],
        ['manifestation', 'financial opportunity', 'skill development', 'ambition'],
        ['efficiency', 'routine', 'conservatism', 'methodical'],
        ['nurturing', 'practical', 'providing financially', 'working parent'],
        ['wealth', 'business', 'leadership', 'security', 'discipline'],
      ],
      reversed: [
        ['lost opportunity', 'lack of planning', 'instability', 'scarcity'],
        ['over-committed', 'disorganization', 'reprioritization', 'chaos'],
        ['lack of teamwork', 'disorganization', 'group conflict', 'competition'],
        ['over-spending', 'greed', 'self-protection', 'insecurity'],
        ['recovery', 'charity', 'improvement', 'spiritual poverty'],
        ['self-care', 'unpaid debts', 'one-sided charity', 'strings attached'],
        ['lack of growth', 'impatience', 'not seeing results', 'frustration'],
        ['self-development', 'perfectionism', 'misdirected activity', 'repetition'],
        ['self-reliance', 'over-investment', 'hustling', 'materialism'],
        ['financial failure', 'loneliness', 'loss', 'family disputes'],
        ['lack of commitment', 'greed', 'laziness', 'procrastination'],
        ['self-development', 'perfectionism', 'workaholic', 'impatience'],
        ['financial independence', 'self-care', 'work-home conflict', 'smothering'],
        ['financially inept', 'obsessed with wealth', 'stubborn', 'controlling'],
      ],
    },
  };

  const cards: TarotCard[] = [];

  // Ace through 10
  for (let i = 1; i <= 10; i++) {
    const name = i === 1 ? `Ace of ${capitalize(suit)}` : `${i} of ${capitalize(suit)}`;
    cards.push({
      name,
      arcana: 'minor',
      suit,
      number: i,
      element,
      keywords: {
        upright: suitKeywords[suit].upright[i - 1],
        reversed: suitKeywords[suit].reversed[i - 1],
      },
    });
  }

  // Court cards
  courtCards.forEach((court, index) => {
    cards.push({
      name: `${court} of ${capitalize(suit)}`,
      arcana: 'minor',
      suit,
      element,
      keywords: {
        upright: suitKeywords[suit].upright[10 + index],
        reversed: suitKeywords[suit].reversed[10 + index],
      },
    });
  });

  return cards;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const wands = createSuit('wands', 'Fire');
export const cups = createSuit('cups', 'Water');
export const swords = createSuit('swords', 'Air');
export const pentacles = createSuit('pentacles', 'Earth');

export const fullDeck: TarotCard[] = [
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles,
];

export function drawCards(count: number): DrawnCard[] {
  const shuffled = [...fullDeck].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() > 0.5,
  }));
}

export const spreadPositions = {
  single: ['Present Energy'],
  pastPresentFuture: ['Past', 'Present', 'Future'],
  celticCross: [
    'Present Situation',
    'Challenge/Obstacle',
    'Distant Past',
    'Recent Past',
    'Best Outcome',
    'Immediate Future',
    'Your Approach',
    'External Influences',
    'Hopes & Fears',
    'Final Outcome',
  ],
};
