module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'hero-pattern': "url('https://i.ibb.co/wKFPJwc/slider-1.webp')",
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffd73c",
          secondary: "#000000",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}