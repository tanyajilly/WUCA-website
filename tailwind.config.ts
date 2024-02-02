import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        'black-overlay': 'rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'scale-up': 'scaleUp 0.5s ease forwards',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
}
export default config
