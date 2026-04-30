/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light Mode (Beach/Earthy)
                'cream': '#FDFBF7',
                'charcoal': '#1A1A1A',
                'beige': '#D4C4B7',
                'brown': '#4A3B32',
                'light-brown': '#8C7B70',

                // Dark Mode (Cyan/Black)
                'primary-cyan': '#00F0FF', // renamed visually to Cyan
                'dark-bg': '#0a0a0a',
                'card-dark': '#171717',
                'gray-text': '#a3a3a3',
            },
            animation: {
                scroll: 'scroll 20s linear infinite',
                'bounce-x': 'bounce-x 1s infinite',
                'blink-cyan': 'blink-cyan 4s infinite ease-in-out',
                'blink': 'blink 4s infinite ease-in-out',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'bounce-x': {
                    '0%, 100%': {
                        transform: 'translateX(0)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                    '50%': {
                        transform: 'translateX(25%)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
                    },
                },
                'blink-cyan': {
                    '0%, 100%': { opacity: '0.2', color: '#00C2FF' },
                    '50%': { opacity: '1', color: '#00C2FF' }
                },
                'blink': {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '1' }
                }
            }
        },
    },
    plugins: [],
}
