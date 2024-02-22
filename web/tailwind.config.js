/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': 'rgba(var(--primary))',
        'primary-hover': 'rgba(var(--primary-hover))',
        'secondary-hover': 'rgba(var(--secondary-hover))',

        'input-background': 'rgba(var(--input-background))',
        'input-border': 'rgba(var(--input-border))',
        'input-border-focus': 'rgba(var(--input-border-focus))',

        'menu-background': 'rgba(var(--menu-background))',
        'menu-item-background-hover': 'rgba(var(--menu-item-background-hover))',
        'menu-item-background-focus': 'rgba(var(--menu-item-background-focus))',

        'footer-background': 'rgba(var(--footer-background))',

        'separator': 'rgba(var(--separator))',

      },
      fontFamily: {
        'sans': ['IBMPlexSans', 'sans'],
      },
    },
  },
  plugins: [],
}

