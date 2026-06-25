interface Props {
  className?: string
  color?: string
}

export default function FloralDivider({ className = '', color = '#8E98A1' }: Props) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      <svg
        width="380"
        height="48"
        viewBox="0 0 380 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xs opacity-50"
      >
        {/* Ramo esquerdo */}
        <path
          d="M0 24 C30 20, 60 28, 90 24 C110 21, 125 24, 142 24"
          stroke={color} strokeWidth="0.75" strokeLinecap="round"
        />
        {/* Folha esquerda 1 */}
        <path
          d="M55 24 C50 14, 44 11, 40 17 C44 19, 51 20, 55 24Z"
          stroke={color} strokeWidth="0.6" fill="none"
        />
        <path d="M55 24 C53 14, 62 10, 66 16 C62 19, 56 21, 55 24Z"
          stroke={color} strokeWidth="0.6" fill="none"
        />
        {/* Nervura folha esquerda */}
        <path d="M48 16 C51 19, 53 21, 55 24" stroke={color} strokeWidth="0.4" strokeLinecap="round"/>
        <path d="M62 14 C60 18, 58 21, 55 24" stroke={color} strokeWidth="0.4" strokeLinecap="round"/>

        {/* Flor central */}
        <circle cx="190" cy="24" r="5.5" stroke={color} strokeWidth="0.8" fill="none"/>
        <circle cx="190" cy="24" r="2"   stroke={color} strokeWidth="0.6" fill="none"/>
        {/* Pétalas */}
        <ellipse cx="190" cy="15" rx="2"   ry="4.5" stroke={color} strokeWidth="0.6" fill="none"/>
        <ellipse cx="190" cy="33" rx="2"   ry="4.5" stroke={color} strokeWidth="0.6" fill="none"/>
        <ellipse cx="181" cy="24" rx="4.5" ry="2"   stroke={color} strokeWidth="0.6" fill="none"/>
        <ellipse cx="199" cy="24" rx="4.5" ry="2"   stroke={color} strokeWidth="0.6" fill="none"/>
        {/* Pétalas diagonais */}
        <ellipse cx="183.5" cy="16.5" rx="2" ry="4" transform="rotate(-45 183.5 16.5)" stroke={color} strokeWidth="0.5" fill="none"/>
        <ellipse cx="196.5" cy="31.5" rx="2" ry="4" transform="rotate(-45 196.5 31.5)" stroke={color} strokeWidth="0.5" fill="none"/>
        <ellipse cx="196.5" cy="16.5" rx="2" ry="4" transform="rotate(45 196.5 16.5)"  stroke={color} strokeWidth="0.5" fill="none"/>
        <ellipse cx="183.5" cy="31.5" rx="2" ry="4" transform="rotate(45 183.5 31.5)"  stroke={color} strokeWidth="0.5" fill="none"/>

        {/* Botão pequeno esquerdo */}
        <circle cx="160" cy="24" r="1.5" stroke={color} strokeWidth="0.7" fill="none"/>
        <path d="M156 20 L160 24" stroke={color} strokeWidth="0.5" strokeLinecap="round"/>
        <path d="M164 20 L160 24" stroke={color} strokeWidth="0.5" strokeLinecap="round"/>

        {/* Botão pequeno direito */}
        <circle cx="220" cy="24" r="1.5" stroke={color} strokeWidth="0.7" fill="none"/>
        <path d="M216 20 L220 24" stroke={color} strokeWidth="0.5" strokeLinecap="round"/>
        <path d="M224 20 L220 24" stroke={color} strokeWidth="0.5" strokeLinecap="round"/>

        {/* Ramo direito */}
        <path
          d="M238 24 C255 24, 270 21, 290 24 C320 28, 350 20, 380 24"
          stroke={color} strokeWidth="0.75" strokeLinecap="round"
        />
        {/* Folha direita */}
        <path
          d="M325 24 C320 14, 314 11, 310 17 C314 19, 321 20, 325 24Z"
          stroke={color} strokeWidth="0.6" fill="none"
        />
        <path d="M325 24 C323 14, 332 10, 336 16 C332 19, 326 21, 325 24Z"
          stroke={color} strokeWidth="0.6" fill="none"
        />
        <path d="M318 16 C321 19, 323 21, 325 24" stroke={color} strokeWidth="0.4" strokeLinecap="round"/>
        <path d="M332 14 C330 18, 328 21, 325 24" stroke={color} strokeWidth="0.4" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
