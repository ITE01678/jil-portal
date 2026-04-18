export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Override indigo → JIL Blue (#0061AF) ────────────────
           Every component using indigo-* classes automatically
           picks up the JIL corporate blue from the logo.        */
        indigo: {
          50:  '#e6f1fa',
          100: '#c0d8f2',
          200: '#8cb5e6',
          300: '#5592d9',
          400: '#2d74cc',
          500: '#0061AF',
          600: '#004f8e',
          700: '#003d6e',
          800: '#002b4e',
          900: '#001a2f',
          950: '#000d1a',
        },
        /* ── Override purple → JIL Green (#A6CE39) ───────────────
           Components pairing indigo+purple will now show the two
           logo colours side by side.                            */
        purple: {
          50:  '#f4fbea',
          100: '#e5f5c4',
          200: '#ccec90',
          300: '#b3e25b',
          400: '#A6CE39',
          500: '#8ab52e',
          600: '#6f9224',
          700: '#52701a',
          800: '#3a5113',
          900: '#26350b',
          950: '#192309',
        },
        /* ── JIL brand aliases (explicit usage) ──────────────────── */
        jilGreen: {
          50:  '#f4fbea',
          100: '#e5f5c4',
          200: '#ccec90',
          300: '#b3e25b',
          400: '#A6CE39',
          500: '#8ab52e',
          600: '#6f9224',
          700: '#52701a',
          800: '#3a5113',
          900: '#26350b',
        },
        jilBlue: {
          50:  '#e6f1fa',
          100: '#c0d8f2',
          200: '#8cb5e6',
          300: '#5592d9',
          400: '#2d74cc',
          500: '#0061AF',
          600: '#004f8e',
          700: '#003d6e',
          800: '#002b4e',
          900: '#001a2f',
        },
        /* ── Solar accent (sun/amber highlights) ────────────────── */
        solar: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        /* ── Navy (deep backgrounds, hero) ──────────────────────── */
        navy: {
          50:  '#e8edf5',
          100: '#c5d0e4',
          200: '#8fa4cb',
          400: '#4a6fa5',
          500: '#2d5a9e',
          600: '#1e3a5f',
          700: '#162c4a',
          800: '#0e1f35',
          900: '#0a1628',
          950: '#050a14',
        },
        /* ── Leaf/eco green ──────────────────────────────────────── */
        leaf: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        /* ── brand → JIL Blue (legacy alias) ────────────────────── */
        brand: {
          50:  '#e6f1fa',
          100: '#c0d8f2',
          400: '#2d74cc',
          500: '#0061AF',
          600: '#004f8e',
          700: '#003d6e',
          900: '#001a2f',
        },
      },
      animation: {
        'fade-up':       'fadeUp 0.5s ease-out both',
        'fade-in':       'fadeIn 0.4s ease-out both',
        'slide-in-left': 'slideInLeft 0.35s ease-out both',
        'float':         'float 4s ease-in-out infinite',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 8s linear infinite',
        'solar-rotate':  'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34,1.56,0.64,1)',
      },
      boxShadow: {
        'glow-solar':   '0 0 30px rgba(245,158,11,0.4)',
        'glow-leaf':    '0 0 30px rgba(16,185,129,0.35)',
        'glow-navy':    '0 0 30px rgba(30,58,95,0.4)',
        'glow-indigo':  '0 0 24px rgba(0,97,175,0.30)',
        'glow-purple':  '0 0 24px rgba(166,206,57,0.35)',
        'glow-jilBlue': '0 0 24px rgba(0,97,175,0.30)',
        'card':         '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover':   '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
