'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

type Preset = 'slideUp' | 'fadeScale' | 'floatIn' | 'fade'

const variants: Record<Preset, Variants> = {
  slideUp:   { hidden: { y: 40,  opacity: 0 }, visible: { y: 0,  opacity: 1 } },
  fadeScale: { hidden: { scale: 0.92, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  floatIn:   { hidden: { y: 20,  opacity: 0 }, visible: { y: 0,  opacity: 1 } },
  fade:      { hidden: { opacity: 0 },          visible: { opacity: 1 } },
}

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  preset?: Preset
  duration?: number
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  preset = 'slideUp',
  duration = 0.8,
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[preset]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
