'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Status = 'checking' | 'valid' | 'invalid' | 'error'

export function ApiStatus() {
  const [status, setStatus] = useState<Status>('checking')
  const [message, setMessage] = useState('')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    async function checkKey() {
      try {
        const res = await fetch('/api/validate-key')
        const data = await res.json()
        
        if (data.valid) {
          setStatus('valid')
          setMessage(data.message)
        } else {
          setStatus('invalid')
          setMessage(data.message)
        }
      } catch {
        setStatus('error')
        setMessage('Could not check API key status')
      }
    }

    checkKey()
  }, [])

  const statusColors = {
    checking: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    valid: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    invalid: 'bg-red-500/20 text-red-400 border-red-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const statusIcons = {
    checking: (
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    ),
    valid: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    invalid: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }

  const statusLabels = {
    checking: 'Checking API...',
    valid: 'API Connected',
    invalid: 'API Key Invalid',
    error: 'Connection Error'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-colors ${statusColors[status]}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {statusIcons[status]}
        <span className="text-sm font-medium">{statusLabels[status]}</span>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-2 p-4 w-72 rounded-lg border border-muted bg-card/95 backdrop-blur-sm shadow-xl"
          >
            <h4 className="font-semibold text-foreground mb-2">Anthropic API Status</h4>
            <p className="text-sm text-muted-foreground mb-3">{message}</p>
            
            {status === 'invalid' && (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>To add your API key:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Click the gear icon (top right)</li>
                  <li>Go to &quot;Vars&quot; section</li>
                  <li>Add ANTHROPIC_API_KEY</li>
                </ol>
              </div>
            )}

            {status === 'valid' && (
              <p className="text-xs text-emerald-400">
                All AI features are ready to use
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
