import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          light: '#6EE7B7', // Emerald 300
          DEFAULT: '#10B981', // Emerald 500
          dark: '#059669',  // Emerald 600
        },
        'brand-white': '#F9FAFB', // Gray 50
      },
    },
  },
  plugins: [],
}
export default config