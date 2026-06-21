type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface FloralCornerProps {
  position: Position
  className?: string
  size?: number
}

export default function FloralCorner({ position, className = '', size = 200 }: FloralCornerProps) {
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
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotations[position]})`, transformOrigin: 'top left' }}
        className="opacity-50"
      >
        {/* Main diagonal branch */}
        <path d="M2 2 C40 60, 90 100, 180 215" stroke="#8E98A1" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

        {/* Large hibiscus/magnolia flower - top left area */}
        <path d="M55 30 C50 15, 40 8, 35 18 C30 28, 38 38, 48 35 C44 45, 38 52, 45 55 C52 58, 58 50, 58 42 C65 50, 70 55, 75 50 C80 44, 74 36, 65 36 C70 27, 72 18, 65 15 C58 12, 54 22, 55 30Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        {/* Flower center */}
        <circle cx="55" cy="36" r="5" fill="none" stroke="#8E98A1" strokeWidth="0.8"/>
        <circle cx="55" cy="36" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6"/>
        {/* Stamen lines */}
        <line x1="55" y1="31" x2="55" y2="28" stroke="#8E98A1" strokeWidth="0.6"/>
        <line x1="59" y1="32" x2="61" y2="30" stroke="#8E98A1" strokeWidth="0.6"/>
        <line x1="60" y1="36" x2="63" y2="36" stroke="#8E98A1" strokeWidth="0.6"/>
        <line x1="51" y1="32" x2="49" y2="30" stroke="#8E98A1" strokeWidth="0.6"/>
        <line x1="50" y1="36" x2="47" y2="36" stroke="#8E98A1" strokeWidth="0.6"/>

        {/* Large leaf from branch - upper */}
        <path d="M30 50 C20 35, 15 20, 25 12 C35 4, 50 15, 48 30 C46 42, 38 50, 30 50Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M30 50 C35 35, 38 22, 25 12" stroke="#8E98A1" strokeWidth="0.5" fill="none" strokeDasharray="1,2"/>

        {/* Medium leaf right side of branch */}
        <path d="M65 75 C80 62, 95 58, 100 68 C105 78, 95 90, 80 88 C68 86, 62 82, 65 75Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M65 75 C80 72, 95 68, 100 68" stroke="#8E98A1" strokeWidth="0.5" fill="none" strokeDasharray="1,2"/>

        {/* Second flower - mid branch */}
        <path d="M90 105 C85 92, 76 87, 72 95 C68 103, 75 112, 84 110 C80 118, 76 124, 82 127 C88 130, 94 122, 93 115 C100 121, 106 125, 110 120 C114 114, 108 107, 100 107 C104 99, 105 91, 99 89 C93 87, 89 97, 90 105Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <circle cx="90" cy="107" r="5" fill="none" stroke="#8E98A1" strokeWidth="0.8"/>
        <circle cx="90" cy="107" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.6"/>

        {/* Tropical leaves cluster */}
        <path d="M100 60 C118 45, 135 42, 140 55 C145 68, 132 78, 118 73 C106 68, 98 66, 100 60Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M100 60 C115 57, 132 55, 140 55" stroke="#8E98A1" strokeWidth="0.5" fill="none" strokeDasharray="1,2"/>

        <path d="M110 45 C125 28, 145 22, 152 35 C158 48, 145 60, 130 57 C116 53, 108 51, 110 45Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M110 45 C126 42, 143 38, 152 35" stroke="#8E98A1" strokeWidth="0.5" fill="none" strokeDasharray="1,2"/>

        {/* Thin branches */}
        <path d="M45 78 C55 68, 70 65, 78 72" stroke="#8E98A1" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
        <path d="M78 72 C84 65, 92 62, 95 68" stroke="#8E98A1" strokeWidth="0.6" fill="none" strokeLinecap="round"/>

        {/* Small buds on branches */}
        <ellipse cx="76" cy="70" rx="4" ry="6" transform="rotate(-30 76 70)" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <ellipse cx="95" cy="66" rx="3" ry="5" transform="rotate(20 95 66)" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>

        {/* Branch going right-bottom */}
        <path d="M110 130 C130 118, 150 112, 165 120" stroke="#8E98A1" strokeWidth="0.7" fill="none" strokeLinecap="round"/>

        {/* Large palm/tropical leaf lower */}
        <path d="M130 155 C148 138, 168 132, 175 145 C182 158, 168 172, 150 168 C136 164, 127 162, 130 155Z" stroke="#8E98A1" strokeWidth="0.8" fill="none"/>
        <path d="M130 155 C150 150, 168 145, 175 145" stroke="#8E98A1" strokeWidth="0.5" fill="none" strokeDasharray="1,2"/>

        {/* Fan leaf */}
        <path d="M150 175 C155 158, 168 148, 178 155" stroke="#8E98A1" strokeWidth="0.7" fill="none"/>
        <path d="M150 175 C158 160, 172 152, 178 155" stroke="#8E98A1" strokeWidth="0.6" fill="none"/>
        <path d="M150 175 C160 162, 175 156, 178 155" stroke="#8E98A1" strokeWidth="0.5" fill="none"/>

        {/* Small decorative circles/berries */}
        <circle cx="35" cy="72" r="2.5" fill="none" stroke="#8E98A1" strokeWidth="0.7"/>
        <circle cx="42" cy="68" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.7"/>
        <circle cx="125" cy="138" r="2.5" fill="none" stroke="#8E98A1" strokeWidth="0.7"/>
        <circle cx="135" cy="133" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.7"/>
        <circle cx="142" cy="130" r="2" fill="none" stroke="#8E98A1" strokeWidth="0.7"/>

        {/* Fine detail lines on main flower petals */}
        <path d="M55 20 C52 26, 50 32, 55 30" stroke="#8E98A1" strokeWidth="0.4" fill="none"/>
        <path d="M65 20 C65 26, 62 31, 58 32" stroke="#8E98A1" strokeWidth="0.4" fill="none"/>
      </svg>
    </div>
  )
}
