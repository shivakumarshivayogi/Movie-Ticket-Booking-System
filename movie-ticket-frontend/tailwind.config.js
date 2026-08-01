/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#0F172A',
        primaryred: '#DC2626',
        secondarygold: '#FACC15',
        cardbg: '#1E293B',
        actionblue: '#2563EB',
      },
    },
  },
  plugins: [],
};
