/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red-darker': '#750005',
        'custom-purple': '#664EFF',
        'custom-purple-darker': '#302D96',
        'custom-purple-2': '#5541d6',
        'custom-gray': '#303030',
        'custom-gray-darker': '#242424',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
});
