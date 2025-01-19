/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.html', // Look for HTML files at the root level
        './src/js/**/*.js', // Look for JS files in src/js
        './src/js/**/*.mjs', // Look for mjs files in src/js
        './src/**/*.js', // Look for JS files in src/
        './src/**/*.mjs', // Look for mjs files in src/
    ],
    theme: {
        extend: {
            fontFamily: {
                'irish-grover': ['"Irish Grover"', 'sans-serif'], // Irish Grover font
                'istok-web': ['"Istok Web"', 'sans-serif'], // Istok Web font
            },
            colors: {
                primary: '#E11D48', // Primary rose
                secondary: '#EA580C', // Secondary orange
                fadedOrange: '#FFF7ED', // Faded orange
                hoverColour: '#D81B40 ',
                darkGray: '#37333D', // Dark gray
                gray: '#4B5563', // Gray
                black: '#000000', // Black
                white: '#FFFFFF', // White
                linearRorangeStart: '#EA580C', // 100% stop color (secondary orange)
                linearRorangeEnd: '#E11D48', // 90% stop color (primary rose)
            },
            backgroundImage: {
                'linear-rorange': 'linear-gradient(90deg, #EA580C 10%, #E11D48 90%)',
            },
            boxShadow: {
                inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)', // Creates the recessed shadow
            },
        },
    },
    plugins: [],
};
