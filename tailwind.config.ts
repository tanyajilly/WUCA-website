import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
                serif: ["var(--font-serif)", ...defaultTheme.fontFamily.serif],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "slide-overlay":
                    "linear-gradient(0deg, rgba(20, 22, 36, 0.50) 0%, rgba(20, 22, 36, 0.20) 100%)",
            },
            aspectRatio: {
                "4/3": "4 / 3",
            },
            colors: {
                link: "#0284c7",
                "black-overlay": "rgba(0, 0, 0, 0.5)",
            },
            keyframes: {
                scaleUp: {
                    "0%": { transform: "scale(0.5)" },
                    "100%": { transform: "scale(1)" },
                },
            },
            animation: {
                "scale-up": "scaleUp 0.5s ease forwards",
            },
            typography: {
                DEFAULT: {
                    css: {
                        p: {
                            fontFamily: "var(--font-serif), serif",
                            lineHeight: "1.5",
                        },
                        img: {
                            margin: "0 0 0.5rem",
                        },
                        a: {
                            color: "#0284c7",
                            textDecoration: "none",
                            fontWeight: "normal",
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms")({ strategy: "class" }),
    ],
};
export default config;
