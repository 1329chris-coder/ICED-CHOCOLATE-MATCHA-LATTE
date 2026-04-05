import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                matchaGreen: '#6A994E',
                matchaLight: '#88B04B',
                chocolateBrown: '#3D2817',
                chocolateDark: '#2A1810',
                cream: '#F5F5F5',
                warmWhite: '#FFFEF7',
                border: '#E5E7EB',        // ← ADDED
                input: '#F3F4F6',         // ← ADDED
                ring: '#6A994E',          // ← ADDED
            },
            fontFamily: {
                display: ['var(--font-display)', 'serif'],
                body: ['var(--font-body)', 'sans-serif'],
                accent: ['var(--font-accent)', 'sans-serif']
            },
            fontSize: {
                'display-xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'display-md': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }]
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'float': 'float 3s ease-in-out infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            }
        },
    },
    plugins: [],
};

export default config;
