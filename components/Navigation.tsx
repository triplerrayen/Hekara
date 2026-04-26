'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ScrollText, Home, Crown } from 'lucide-react';
import { MoonPhase } from './MoonPhase';
import { useState } from 'react';
import { UpgradeModal } from './UpgradeModal';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/grimoire', label: 'Grimoire', icon: BookOpen },
  { href: '/tarot', label: 'Tarot', icon: Sparkles },
  { href: '/journal', label: 'Journal', icon: ScrollText },
];

export function Navigation() {
  const pathname = usePathname();
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-purple/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span className="font-heading text-xl text-gold">Hekara</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1 rounded-lg px-2 py-2 text-sm transition-colors sm:px-3 ${
                    isActive
                      ? 'text-gold'
                      : 'text-lavender/70 hover:text-lavender'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-lg bg-purple/20"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <MoonPhase />
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple/50 to-forest/50 px-3 py-1.5 text-xs text-gold transition-opacity hover:opacity-80"
            >
              <Crown className="h-3 w-3" />
              <span className="hidden sm:inline">Upgrade</span>
            </button>
          </div>
        </div>
      </nav>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </>
  );
}
