import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      valid: false,
      error: 'ANTHROPIC_API_KEY not configured',
      message: 'Please add your API key in Settings > Vars'
    })
  }

  try {
    const client = new Anthropic({ apiKey })
    
    // Make a minimal request to verify the key works
    await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'Hi' }]
    })

    return NextResponse.json({
      valid: true,
      message: 'API key is valid and working'
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    let userMessage = 'API key validation failed'
    if (errorMessage.includes('401') || errorMessage.includes('authentication')) {
      userMessage = 'Invalid API key - please check your key is correct'
    } else if (errorMessage.includes('429')) {
      userMessage = 'Rate limited - but key appears valid'
      return NextResponse.json({ valid: true, message: userMessage })
    } else if (errorMessage.includes('insufficient')) {
      userMessage = 'API key valid but has insufficient credits'
    }

    return NextResponse.json({
      valid: false,
      error: errorMessage,
      message: userMessage
    })
  }
}
