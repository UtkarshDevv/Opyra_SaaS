/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: '#714B67',
        primaryLight: '#8B6B7F',
        primaryDark: '#5A3D52',

        // Secondary colors
        secondary: '#00A09D',
        secondaryLight: '#33B3B0',
        secondaryDark: '#008A87',

        // Accent colors
        accent: '#FF6B35',
        accentLight: '#FF8A5C',
        accentDark: '#E55A2B',

        // Neutral colors
        white: '#FFFFFF',
        black: '#000000',
        gray: '#6C757D',
        lightGray: '#F8F9FA',
        darkGray: '#343A40',

        // Status colors
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',

        // Background colors
        background: '#F5F7FA',
        surface: '#FFFFFF',
        card: '#FFFFFF',

        // Text colors
        textPrimary: '#212529',
        textSecondary: '#6C757D',
        textLight: '#ADB5BD',

        // Border colors
        border: '#E9ECEF',
        borderLight: '#F1F3F4',
      },

      fontSize: {
        xs: '14px',
        sm: '16px',
        md: '18px',
        lg: '20px',
        xl: '24px',
        xxl: '28px',
        xxxl: '36px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
      },
      borderRadius: {
        sm: '8px',
        lg: '12px',
        xl: '16px',

  // radius: 8,
  // radiusLg: 12,
  // radiusXl: 16,
  
      },
      boxShadow: {
        custom: '0px 2px 3.84px rgba(0,0,0,0.1)',
        customLg: '0px 4px 6.27px rgba(0,0,0,0.15)',
      },
      fontFamily: {
        regular: ['System'],
        medium: ['System'],
        bold: ['System'],
        light: ['System'],
      },
    },
  },
  plugins: [],
}

// , "./components/**/*.{js,jsx,ts,tsx}"