/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing:{
        '13': '3.25rem',
        '16.5': '4.125',
        '17': '4.25rem',
        '18': '4.5rem',
      },
      fontFamily:{
        plus_jakarta_sans: ['Plus Jakarta Sans'],
      },
      fontSize:{
        '2.5xl': '1.75rem',
      },
      colors:{
        black:{
          'title-rnm-and-title-card': '#0D121C'
        },
        grey:{
          'searchbar': '#E8EBF2'
        },
        blue:{
          'text-searchbar': '#4F6696',
          'text-title-characters': '#0D121C',
          'text-subtitle-card': '#4F6696',
          'status-unknown': '#90d5ff',
        },
        red:{
          'status-dead': '#fa7769',
        },
        green:{
          'status-alive': '#77AC7D',
        }
      }
    },
  },
  plugins: [],
}

