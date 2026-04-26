import { getAnthropicClient, SPELL_SYSTEM_PROMPT } from '@/lib/anthropic';

export async function POST(request: Request) {
  try {
    const { path, intention, moonPhase } = await request.json();

    if (!path || !intention || !moonPhase) {
      return new Response('Missing required fields', { status: 400 });
    }

    const anthropic = getAnthropicClient();

    const userPrompt = `Create a personalized spell for a ${path} witch.

Moon Phase: ${moonPhase}
Intention: ${intention}

Please craft a complete spell including:
- A poetic title
- Optimal timing
- Candle colors with meanings
- Herbs and their properties
- Crystals and their correspondences
- Detailed step-by-step ritual
- An original incantation
- Aftercare and manifestation tips

Make it specific to my intention and aligned with the current moon phase energy.`;

    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: SPELL_SYSTEM_PROMPT,
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
    console.error('Spell API error:', error);
    return new Response('Failed to generate spell', { status: 500 });
  }
}
