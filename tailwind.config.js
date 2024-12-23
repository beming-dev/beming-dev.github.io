/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.25em", // 기본 크기보다 작은 크기
              fontWeight: "700", // 필요시 가중치 설정
              marginTop: "50px",
            },
            h2: {
              fontSize: "1.75em", // 기본 크기보다 작은 크기
              fontWeight: "600",
              marginTop: "30px",
            },
            h3: {
              fontSize: "1.5em", // 기본 크기보다 작은 크기
              fontWeight: "500",
            },
            h4: {
              fontSize: "1.25em", // 일반 텍스트와 비슷한 크기로 설정
              fontWeight: "500",
            },
          },
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      mobile: "640px",
      // => @media (min-width: 640px) { ... }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
