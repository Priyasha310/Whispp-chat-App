/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.{svg,png,jpg,jpeg}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xxs: '360px',
        xs: '480px',
        sm: '600px',
        md: '768px',
        lg: '976px',
        xl: '1440px'
      },
      colors: {
        transparent: 'transparent',
        'bg-color': '#131324',
        'light-text': '#f0ecf9',
        'heading-color': '#6f42c1',
        'btn-color': '#4e0eff',
        'hover-btn-color': '#6531f7',
        'contact':'#080420',
        'light-bg': '#9a86f3',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '5_100': '5%',
        '10_100': '10%',
        '12_100': '12%',
        '15_100': '15%',
        '20_100': '20%',
        '25_100': '25%',
        '30_100': '30%',
        '35_100': '35%',
        '40_100': '40%',
        '45_100': '45%',
        '50_100': '50%',
        '55_100': '55%',
        '60_100': '60%',
        '65_100': '65%',
        '70_100': '70%',
        '75_100': '75%',
        '80_100': '80%',
        '85_100': '85%',
        '90_100': '90%',
        '95_100': '95%',
        'inherit': 'inherit',
        'initial': 'initial'
      },
    },
    plugins: [],
  },
}
