/* eslint-disable unicorn/prefer-module */
/* eslint-disable prettier/prettier */
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/themes/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	fontFamily: {
  		sans: ["var(--font-inter)"],
  		hammah: ["var(--font-hammah)"],
  		noto: ["var(--font-noto)"]
  	},
  	extend: {
  		typography: {
  			DEFAULT: {
  				css: {}
  			}
  		},
  		aspectRatio: {
  			'4/3': '4 / 3',
  			'21/9': '21 / 9'
  		},
  		colors: {
  			darkblue: {
  				'50': '#dfebf1',
  				'100': '#cbd7df',
  				'200': '#b7c3cd',
  				'300': '#a4b0bc',
  				'400': '#909caa',
  				'500': '#7c8898',
  				'600': '#697484',
  				'700': '#565f6f',
  				'800': '#424b5b',
  				'900': '#2f3646',
  				'950': '#1c2232'
  			},
  			beige: {
  				'50': '#e5d3a5',
  				'100': '#ddc89e',
  				'200': '#d5bd97',
  				'300': '#ceb290',
  				'400': '#c6a789',
  				'500': '#be9c82',
  				'600': '#b6917b',
  				'700': '#ae8674',
  				'800': '#a77b6d',
  				'900': '#9f7066',
  				'950': '#97655f'
  			},
  			red2: {
  				'50': '#f1d5d2',
  				'100': '#edc5c1',
  				'200': '#eab6b0',
  				'300': '#e6a69f',
  				'400': '#e2968e',
  				'500': '#df877d',
  				'600': '#db776b',
  				'700': '#d7675a',
  				'800': '#d35749',
  				'900': '#d04838',
  				'950': '#cc3827'
  			},
  			turqoi: {
  				'50': '#cff2f8',
  				'100': '#c9eff3',
  				'200': '#c2ebed',
  				'300': '#bce8e8',
  				'400': '#b5e5e2',
  				'500': '#afe2dd',
  				'600': '#a9ded7',
  				'700': '#a2dbd2',
  				'800': '#9cd8cc',
  				'900': '#95d4c7',
  				'950': '#8fd1c1'
  			},
  			text: {
  				DEFAULT: colors.slate[900],
  				'50': colors.slate[50],
  				'100': colors.slate[100],
  				'200': colors.slate[200],
  				'300': colors.slate[300],
  				'400': colors.slate[400],
  				'500': colors.slate[500],
  				'600': colors.slate[600],
  				'700': colors.slate[700],
  				'800': colors.slate[800],
  				'900': colors.slate[900],
  				'950': colors.slate[950]
  			},
  			body: {
  				DEFAULT: colors.white,
  				'50': colors.slate[950],
  				'100': colors.slate[900],
  				'200': colors.slate[800],
  				'300': colors.slate[700],
  				'400': colors.slate[600],
  				'500': colors.slate[500],
  				'600': colors.slate[400],
  				'700': colors.slate[300],
  				'800': colors.slate[200],
  				'900': colors.slate[100],
  				'950': colors.slate[50]
  			},
  			foreground: 'hsl(var(--foreground))',
  			background: 'hsl(var(--background))',
  			primary: {
  				'50': colors.violet[50],
  				'100': colors.violet[100],
  				'200': colors.violet[200],
  				'300': colors.violet[300],
  				'400': colors.violet[400],
  				'500': colors.violet[500],
  				'600': colors.violet[600],
  				'700': colors.violet[700],
  				'800': colors.violet[800],
  				'900': colors.violet[900],
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  			}
  		},
  		borderRadius: {
  			'7xl': 'calc(var(--radius) + 2.5rem)',
  			'6xl': 'calc(var(--radius) + 2rem)',
  			'5xl': 'calc(var(--radius) + 1.5rem)',
  			'4xl': 'calc(var(--radius) + 1rem)',
  			'3xl': 'calc(var(--radius) + 0.5rem)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xs: 'calc(var(--radius) - 6px)',
  			xxs: 'calc(var(--radius) - 8px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		height: {
  			'screen-25': '25vh',
  			'screen-33': '33.333vh',
  			'screen-50': '50vh',
  			'screen-60': '60vh',
  			'screen-80': '80vh',
  			'screen-90': '90vh',
  			'screen-desktop-without-header': 'calc(100vh - 57px)',
  			'screen-desktop-with-subheader': 'calc(100vh - 93px)',
  			'notification-container': 'calc(100vh - 300px)',
  			'notification-content': 'calc(100vh - 360px)',
  			'notification-footer': '60px'
  		},
  		minHeight: {
  			sm: '8px',
  			md: '16px',
  			lg: '24px',
  			xl: '48px',
  			'screen-25': '25vh',
  			'screen-33': '33.333vh',
  			'screen-50': '50vh',
  			'screen-60': '60vh',
  			'screen-80': '80vh',
  			'screen-90': '90vh',
  			'screen-desktop-without-header': 'calc(100vh - 57px)',
  			'screen-desktop-with-subheader': 'calc(100vh - 93px)',
  			'notification-container': 'calc(100vh - 300px)',
  			'notification-content': 'calc(100vh - 360px)',
  			'notification-footer': '60px'
  		},
  		maxHeight: {
  			sm: '8px',
  			md: '16px',
  			lg: '24px',
  			xl: '48px',
  			'screen-25': '25vh',
  			'screen-33': '33.333vh',
  			'screen-50': '50vh',
  			'screen-60': '60vh',
  			'screen-80': '80vh',
  			'screen-90': '90vh',
  			'notification-container': 'calc(100vh - 200px)',
  			'notification-content': 'calc(100vh - 260px)',
  			'notification-footer': '60px'
  		},
  		transitionDuration: {
  			'2000': '2000ms',
  			'3000': '3000ms',
  			'4000': '4000ms',
  			'5000': '5000ms'
  		}
  	}
  },
  plugins: [
    require("tailwindcss"),
    require("@tailwindcss/typography"),
    require("tailwindcss-rtl"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({
      nocompatible: true,
    }),
    require("precss"),
    require("autoprefixer"),
    function ({ addVariant, addUtilities, matchUtilities, theme }: any) {
      addVariant("hocus", [
        "&:focus",
        "&:hover",
        "&:active",
        "&:focus-within",
        "&:focus-visible",
      ]);
      addVariant("group-hocus", [
        ":merge(.group):focus &",
        ":merge(.group):hover &",
      ]);
      matchUtilities(
        {
          density: (padding: number) => {
            return {
              "& > *": {
                padding,
              },
            };
          },
          "density-x": (padding: number) => {
            return {
              "& > *": {
                paddingLeft: padding,
                paddingRight: padding,
              },
            };
          },
          "density-y": (padding: number) => {
            return {
              "& > *": {
                paddingTop: padding,
                paddingBottom: padding,
              },
            };
          },
          "space-x": (margin: number) => {
            return {
              "& > * + *": {
                "--tw-space-x-reverse": "0",
                marginRight: `calc(${margin} * var(--tw-space-x-reverse))`,
                marginLeft: `calc(${margin} * calc(1 - var(--tw-space-x-reverse)))`,
              },
            };
          },
          "space-y": (margin: number) => {
            return {
              "& > * + *": {
                "--tw-space-y-reverse": "0",
                marginTop: `calc(${margin} * calc(1 - var(--tw-space-y-reverse)))`,
                marginBottom: `calc(${margin} * var(--tw-space-y-reverse))`,
              },
            };
          },
        },
        {
          values: theme("space", {}),
          type: "any",
        },
      );

      addUtilities({
        ".space-y-reverse > * + *": {
          "--tw-space-y-reverse": "1",
        },
        ".space-x-reverse > * + *": {
          "--tw-space-x-reverse": "1",
        },
      });
    },
  ],
};
export default config;
