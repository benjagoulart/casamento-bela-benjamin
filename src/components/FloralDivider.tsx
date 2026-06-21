interface FloralDividerProps {
  className?: string
  color?: string
  variant?: 'floral' | 'diamond' | 'simple'
}

export default function FloralDivider({
  className = '',
  color = '#BA908B',
  variant = 'diamond',
}: FloralDividerProps) {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center py-4 ${className}`} aria-hidden="true">
        <div className="h-px w-16" style={{ backgroundColor: color }} />
      </div>
    )
  }

  if (variant === 'diamond') {
    return (
      <div className={`flex items-center justify-center gap-3 py-5 ${className}`} aria-hidden="true">
        <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: color, opacity: 0.5 }} />
        <div
          className="w-2 h-2 rotate-45"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
        <div
          className="w-1 h-1 rotate-45"
          style={{ backgroundColor: color, opacity: 0.4 }}
        />
        <div
          className="w-2.5 h-2.5 rotate-45 border"
          style={{ borderColor: color, opacity: 0.8 }}
        />
        <div
          className="w-1 h-1 rotate-45"
          style={{ backgroundColor: color, opacity: 0.4 }}
        />
        <div
          className="w-2 h-2 rotate-45"
          style={{ backgroundColor: color, opacity: 0.7 }}
        />
        <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: color, opacity: 0.5 }} />
      </div>
    )
  }

  // floral variant
  return (
    <div className={`flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      <svg
        width="360"
        height="36"
        viewBox="0 0 360 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xs opacity-70"
      >
        <line x1="0" y1="18" x2="130" y2="18" stroke="#D4CBC7" strokeWidth="0.8" />
        <path d="M130 18 C138 10, 146 10, 150 18 C146 26, 138 26, 130 18Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M162 12 C166 6, 174 6, 178 12" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <path d="M162 24 C166 30, 174 30, 178 24" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <circle cx="180" cy="18" r="6" fill="none" stroke="#BA908B" strokeWidth="0.9"/>
        <circle cx="180" cy="18" r="2.5" fill="none" stroke="#BA908B" strokeWidth="0.7"/>
        <path d="M182 12 C186 6, 194 6, 198 12" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <path d="M182 24 C186 30, 194 30, 198 24" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <path d="M210 18 C214 10, 222 10, 230 18 C222 26, 214 26, 210 18Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <line x1="230" y1="18" x2="360" y2="18" stroke="#D4CBC7" strokeWidth="0.8" />
      </svg>
    </div>
  )
}
