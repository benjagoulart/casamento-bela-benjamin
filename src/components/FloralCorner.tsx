type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface FloralCornerProps {
  position: Position
  className?: string
  size?: number
}

export default function FloralCorner({ position, className = '', size = 120 }: FloralCornerProps) {
  const rotations: Record<Position, string> = {
    'top-left': '0deg',
    'top-right': '90deg',
    'bottom-right': '180deg',
    'bottom-left': '270deg',
  }

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotations[position]})`, transformOrigin: 'center' }}
        className="opacity-40"
      >
        {/* Main branch */}
        <path d="M5 5 C20 30, 50 50, 115 115" stroke="#8E98A1" strokeWidth="0.8" fill="none" />
        {/* Branch 1 */}
        <path d="M25 30 C35 20, 50 18, 55 25" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
        {/* Leaf on branch 1 */}
        <path d="M45 20 C52 14, 60 16, 58 23 C54 28, 46 26, 45 20Z" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
        {/* Flower on branch 1 */}
        <circle cx="55" cy="25" r="3" fill="none" stroke="#BA908B" strokeWidth="0.8" />
        <circle cx="55" cy="19" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="61" cy="23" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="61" cy="30" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="55" cy="32" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="49" cy="29" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6" />
        {/* Branch 2 */}
        <path d="M55 55 C65 45, 80 43, 82 50" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
        {/* Leaf on branch 2 */}
        <path d="M70 44 C78 38, 86 40, 84 47 C80 52, 72 50, 70 44Z" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
        {/* Small buds */}
        <circle cx="30" cy="40" r="1.5" fill="#D4CBC7" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="40" cy="55" r="1.5" fill="#D4CBC7" stroke="#8E98A1" strokeWidth="0.6" />
        <circle cx="65" cy="70" r="1.5" fill="#D4CBC7" stroke="#8E98A1" strokeWidth="0.6" />
        {/* Branch 3 */}
        <path d="M75 78 C80 68, 90 65, 95 70" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
        {/* Leaf 3 */}
        <path d="M88 64 C95 59, 102 62, 100 68 C97 73, 89 71, 88 64Z" stroke="#8E98A1" strokeWidth="0.7" fill="none" />
      </svg>
    </div>
  )
}
