import { getAnthropicClient, TAROT_SYSTEM_PROMPT } from '@/lib/anthropic';
import type { DrawnCard } from '@/lib/tarotDeck';

export async function POST(request: Request) {
  try {
    const { question, cards } = await request.json() as { 
      question: string; 
      cards: DrawnCard[];
    };

    if (!question || !cards || !cards.length) {
      return new Response('Missing required fields', { status: 400 });
    }

    const anthropic = getAnthropicClient();

    const cardsDescription = cards.map((card, i) => {
      const orientation = card.isReversed ? 'Reversed' : 'Upright';
      const position = card.position || `Card ${i + 1}`;
      const keywords = card.isReversed ? card.keywords.reversed : card.keywords.upright;
      return `Position: ${position}
Card: ${card.name} (${orientation})
Arcana: ${card.arcana}${card.suit ? `, Suit of ${card.suit}` : ''}
Keywords: ${keywords.join(', ')}`;
    }).join('\n\n');

    const userPrompt = `The querent asks: "${question}"

Cards drawn:
${cardsDescription}

Please provide a warm, insightful interpretation of this reading. Connect the cards to each other and weave them into a coherent narrative that addresses the querent's question. Be specific about the card imagery and symbolism. Offer practical wisdom and guidance.`;

    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: TAROT_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const encoder = new TextEncoder();
    
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Tarot API error:', error);
    return new Response('Failed to get interpretation', { status: 500 });
  }
}
