'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Moon, Star, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Starfield } from '@/components/Starfield';
import { MoonPhase } from '@/components/MoonPhase';

const features = [
  {
    icon: BookOpen,
    title: 'AI Grimoire',
    description: 'Craft personalized spells tailored to your witchy path, intention, and the current moon phase.',
    href: '/grimoire',
    gradient: 'from-forest to-purple',
  },
  {
    icon: Sparkles,
    title: 'AI Tarot Reader',
    description: 'Draw cards and receive insightful interpretations from a gifted seer who speaks directly to your soul.',
    href: '/tarot',
    gradient: 'from-purple to-forest',
  },
  {
    icon: ScrollText,
    title: 'Magickal Journal',
    description: 'Save your spells and readings in your personal Book of Shadows, accessible anytime.',
    href: '/journal',
    gradient: 'from-forest to-purple',
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Starfield />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Moon phase indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-6 right-6"
        >
          <MoonPhase showDetails />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative text-7xl sm:text-8xl"
          >
            <span className="relative z-10">✨</span>
            <motion.div
              className="absolute inset-0 blur-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
            />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-4xl text-gold sm:text-6xl lg:text-7xl"
        >
          Hekara
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 max-w-2xl text-lg text-lavender/80 sm:text-xl"
        >
          Where ancient wisdom meets modern magic. Craft personalized spells, 
          divine your path through tarot, and keep your sacred knowledge safe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Link href="/grimoire">
            <Button size="lg" className="bg-gradient-to-r from-purple to-forest text-white hover:opacity-90">
              <BookOpen className="mr-2 h-5 w-5" />
              Open Grimoire
            </Button>
          </Link>
          <Link href="/tarot">
            <Button size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
              <Sparkles className="mr-2 h-5 w-5" />
              Draw Cards
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 text-lavender/50"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Moon className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-heading text-3xl text-gold sm:text-4xl">
              Your Magickal Toolkit
            </h2>
            <p className="mt-4 text-lavender/70">
              Everything you need for your spiritual practice, guided by AI wisdom
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={feature.href}>
                  <motion.div
                    className="group relative h-full rounded-2xl border border-purple/30 bg-gradient-to-br from-purple/10 to-forest/10 p-6 transition-all hover:border-gold/50"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${feature.gradient} p-3`}>
                      <feature.icon className="h-6 w-6 text-lavender" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl text-gold">
                      {feature.title}
                    </h3>
                    <p className="text-lavender/70">
                      {feature.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gold/70 transition-colors group-hover:text-gold">
                      <span>Explore</span>
                      <Star className="ml-1 h-4 w-4" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Moon Phase Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-purple/30 bg-purple/10 p-8 text-center"
          >
            <h2 className="mb-4 font-heading text-2xl text-gold sm:text-3xl">
              Work with Lunar Energy
            </h2>
            <p className="mb-6 text-lavender/70">
              Our spell weaver automatically detects the current moon phase and tailors 
              every spell to harness the most potent celestial energies available.
            </p>
            <div className="flex justify-center">
              <MoonPhase showDetails />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-4 font-heading text-3xl text-gold sm:text-4xl">
            Begin Your Journey
          </h2>
          <p className="mb-8 text-lavender/70">
            The veil between worlds grows thin. Step through and discover what awaits.
          </p>
          <Link href="/grimoire">
            <Button size="lg" className="bg-gradient-to-r from-purple to-forest text-white hover:opacity-90">
              Enter the Sacred Space
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple/20 px-4 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-lavender/50">
          <p>Blessed be your practice. Made with magic and intention.</p>
        </div>
      </footer>
    </main>
  );
}
