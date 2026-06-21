export default function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      <svg
        width="400"
        height="40"
        viewBox="0 0 400 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-sm opacity-60"
      >
        {/* Left line */}
        <line x1="0" y1="20" x2="140" y2="20" stroke="#D4CBC7" strokeWidth="0.8" />
        {/* Left leaf */}
        <path d="M140 20 C148 12, 156 12, 160 20 C156 28, 148 28, 140 20Z" stroke="#8E98A1" strokeWidth="0.8" fill="none" />
        {/* Left small flower */}
        <circle cx="125" cy="20" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.8" />
        <line x1="125" y1="14" x2="125" y2="18" stroke="#8E98A1" strokeWidth="0.6" />
        <line x1="119" y1="17" x2="122" y2="19" stroke="#8E98A1" strokeWidth="0.6" />
        <line x1="119" y1="23" x2="122" y2="21" stroke="#8E98A1" strokeWidth="0.6" />
        {/* Center ornament */}
        <path d="M175 20 C180 10, 190 8, 200 20 C210 8, 220 10, 225 20 C220 32, 210 30, 200 20 C190 30, 180 32, 175 20Z" stroke="#8E98A1" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="20" r="2.5" fill="none" stroke="#BA908B" strokeWidth="0.8" />
        {/* Right leaf */}
        <path d="M260 20 C252 12, 244 12, 240 20 C244 28, 252 28, 260 20Z" stroke="#8E98A1" strokeWidth="0.8" fill="none" />
        {/* Right small flower */}
        <circle cx="275" cy="20" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.8" />
        <line x1="275" y1="14" x2="275" y2="18" stroke="#8E98A1" strokeWidth="0.6" />
        <line x1="281" y1="17" x2="278" y2="19" stroke="#8E98A1" strokeWidth="0.6" />
        <line x1="281" y1="23" x2="278" y2="21" stroke="#8E98A1" strokeWidth="0.6" />
        {/* Right line */}
        <line x1="260" y1="20" x2="400" y2="20" stroke="#D4CBC7" strokeWidth="0.8" />
      </svg>
    </div>
  )
}
