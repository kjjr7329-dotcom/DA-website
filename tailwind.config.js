/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",   // 짙은 네이비 (DA기술사 메인 컬러)
        secondary: "#fbbf24", // 골드 옐로우 (포인트 컬러)
        accent: "#2563eb",    // 밝은 블루
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // 깔끔한 폰트 적용 (시스템 기본)
      }
    },
  },
  plugins: [],
}