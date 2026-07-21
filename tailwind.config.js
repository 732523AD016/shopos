module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50:'#eff6ff', 500:'#3b82f6', 900:'#1e3a8a' },
        cyan:  { 400:'#22d3ee', 500:'#06b6d4' },
        em:    { 400:'#34d399', 500:'#10b981' },
      },
      fontFamily: { display: ['Inter','sans-serif'] },
      backdropBlur: { xs: '2px' },
    }
  },
  plugins: [],
}