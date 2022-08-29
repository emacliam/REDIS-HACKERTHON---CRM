module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx,html}',
        './pages/**/*.{vue,js,ts,jsx,tsx,html}',
        './components/**/*.{vue,js,ts,jsx,tsx,html}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#DB2C3B',
                'primary-light': '#F9474F',
                'secondary-dark': '#161B1C',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
