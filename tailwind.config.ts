import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'modal-entrance': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8) translateY(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'50%': {
						transform: 'translateY(-20px) rotate(180deg)'
					}
				},
				'float-slow': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'float-reverse': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(10px)'
					}
				},
				'wave': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'shimmer': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'shimmer-button': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'pulse-slow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.7'
					}
				},
				'scale-pulse': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.05)'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'icon-entrance': {
					'0%': {
						transform: 'scale(0) rotate(-180deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				},
				'ripple': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'sparkle': {
					'0%, 100%': {
						transform: 'scale(0) rotate(0deg)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1) rotate(180deg)',
						opacity: '1'
					}
				},
				'golden-glow': {
					'0%, 100%': {
						opacity: '0.4'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'golden-ring': {
					'0%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '0.3'
					},
					'100%': {
						transform: 'scale(1.2) rotate(360deg)',
						opacity: '0'
					}
				},
				'premium-glow': {
					'0%, 100%': {
						opacity: '0.3'
					},
					'50%': {
						opacity: '0.6'
					}
				},
				'premium-border': {
					'0%': {
						transform: 'scale(1)',
						opacity: '0.2'
					},
					'100%': {
						transform: 'scale(1.5)',
						opacity: '0'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'modal-entrance': 'modal-entrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float-slow 4s ease-in-out infinite',
				'float-reverse': 'float-reverse 5s ease-in-out infinite',
				'wave': 'wave 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s ease-in-out infinite',
				'shimmer-button': 'shimmer-button 0.8s ease-in-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 8s linear infinite',
				'icon-entrance': 'icon-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'ripple': 'ripple 2s ease-out infinite',
				'sparkle': 'sparkle 1.5s ease-in-out infinite',
				'golden-glow': 'golden-glow 2s ease-in-out infinite',
				'golden-ring': 'golden-ring 3s ease-out infinite',
				'premium-glow': 'premium-glow 3s ease-in-out infinite',
				'premium-border': 'premium-border 4s ease-out infinite',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
			}
		}
	},
	plugins: [],
} satisfies Config;