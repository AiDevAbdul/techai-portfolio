import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#1A0E2E',
          section: '#2D1A52',
          action: '#7C3AED',
          hover: '#A855F7',
        },
        accent: {
          cyan: '#06B6D4',
          pink: '#F472B6',
        },
        text: {
          primary: '#FAFAFA',
          muted: '#94A3B8',
        },
        tag: {
          light: '#E9D5FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
