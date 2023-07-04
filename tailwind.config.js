import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "red-dark": "#8B0000",
        navbar: "#3490dc",
      },
    },
  },
  plugins: [],
});
