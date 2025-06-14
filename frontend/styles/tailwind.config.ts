import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-delay-1': 'fade-in 0.8s ease-out 0.3s forwards',
        'fade-in-delay-2': 'fade-in 0.8s ease-out 0.6s forwards',
        'fade-in-delay-3': 'fade-in 0.8s ease-out 0.9s forwards',
      },
    },
  },
  plugins: [],
};
export default config;
