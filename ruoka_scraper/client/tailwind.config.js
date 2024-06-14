/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "bg-coral": "oklch(var(--bg-coral) / 1",
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "bg-coral": "oklch(var(--bg-coral) / 1)",
          // Add other theme extensions here
        },
      },
    ],
  }
}

