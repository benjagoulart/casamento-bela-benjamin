'use client'

import { motion } from 'framer-motion'

interface Props {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: number
  delay?: number
  className?: string
}

export default function FloralDecoration({ position, size = 180, delay = 0, className = '' }: Props) {
  const rotations = {
    'top-left': 0, 'top-right': 90, 'bottom-right': 180, 'bottom-left': 270,
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          scale: [0.97, 1.03, 0.97],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6 + delay * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.8,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: `rotate(${rotations[position]}deg)`, transformOrigin: 'top left', opacity: 0.55 }}
        >
          {/* Ramo principal diagonal */}
          <path d="M5 5 C40 60, 90 100, 180 215" stroke="#8E98A1" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
          {/* Flor grande — pétalas */}
          <path d="M55 30 C50 15,40 8,35 18 C30 28,38 38,48 35 C44 45,38 52,45 55 C52 58,58 50,58 42 C65 50,70 55,75 50 C80 44,74 36,65 36 C70 27,72 18,65 15 C58 12,54 22,55 30Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          <circle cx="55" cy="36" r="5" fill="none" stroke="#8E98A1" strokeWidth="0.8"/>
          <circle cx="55" cy="36" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6"/>
          {/* Estames */}
          {[[55,31,55,28],[59,32,61,30],[60,36,63,36],[51,32,49,30],[50,36,47,36]].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8E98A1" strokeWidth="0.5"/>
          ))}
          {/* Folha superior */}
          <path d="M30 50 C20 35,15 20,25 12 C35 4,50 15,48 30 C46 42,38 50,30 50Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          <path d="M30 50 C35 35,38 22,25 12" stroke="#8E98A1" strokeWidth="0.4" fill="none" strokeDasharray="1,2"/>
          {/* Folha direita */}
          <path d="M65 75 C80 62,95 58,100 68 C105 78,95 90,80 88 C68 86,62 82,65 75Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          <path d="M65 75 C80 72,95 68,100 68" stroke="#8E98A1" strokeWidth="0.4" fill="none" strokeDasharray="1,2"/>
          {/* Segunda flor */}
          <path d="M90 105 C85 92,76 87,72 95 C68 103,75 112,84 110 C80 118,76 124,82 127 C88 130,94 122,93 115 C100 121,106 125,110 120 C114 114,108 107,100 107 C104 99,105 91,99 89 C93 87,89 97,90 105Z" stroke="#8E98A1" strokeWidth="0.75" fill="none"/>
          <circle cx="90" cy="107" r="4" fill="none" stroke="#8E98A1" strokeWidth="0.75"/>
          {/* Folhas tropicais */}
          <path d="M100 60 C118 45,135 42,140 55 C145 68,132 78,118 73 C106 68,98 66,100 60Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          <path d="M110 45 C125 28,145 22,152 35 C158 48,145 60,130 57 C116 53,108 51,110 45Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          {/* Brotos pequenos */}
          {[[125,138,2.5],[135,133,2],[142,130,2],[35,72,2.5],[42,68,2]].map(([cx,cy,r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#8E98A1" strokeWidth="0.7"/>
          ))}
          {/* Galho direito inferior */}
          <path d="M110 130 C130 118,150 112,165 120" stroke="#8E98A1" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
          <path d="M130 155 C148 138,168 132,175 145 C182 158,168 172,150 168 C136 164,127 162,130 155Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
          {/* Folha leque */}
          <path d="M150 175 C155 158,168 148,178 155" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
          <path d="M150 175 C160 162,175 156,178 155" stroke="#8E98A1" strokeWidth="0.6" fill="none"/>
          <path d="M150 175 C158 160,172 152,178 155" stroke="#8E98A1" strokeWidth="0.5" fill="none"/>
          {/* Detalhes sage */}
          <path d="M45 78 C55 68,70 65,78 72" stroke="#80864F" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          <ellipse cx="76" cy="70" rx="3.5" ry="5.5" transform="rotate(-30 76 70)" stroke="#80864F" strokeWidth="0.6" fill="none" opacity="0.5"/>
        </svg>
      </motion.div>
    </motion.div>
  )
}
