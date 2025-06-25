export const COLORS = {
  // Primary colors (Odoo-inspired)
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
};

export const SIZES = {
  // Font sizes - INCREASED for better readability
  xs: 14,        // Was 12 - increased by 2
  sm: 16,        // Was 14 - increased by 2
  md: 18,        // Was 16 - increased by 2
  lg: 20,        // Was 18 - increased by 2
  xl: 24,        // Was 20 - increased by 4
  xxl: 28,       // Was 24 - increased by 4
  xxxl: 36,      // Was 32 - increased by 4
  
  // Spacing - kept separate to avoid conflicts
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border radius
  radius: 8,
  radiusLg: 12,
  radiusXl: 16,
  
  // Shadows
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
  light: {
    fontFamily: 'System',
    fontWeight: '300',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const TEXT_STYLES = {
  // Text overflow handling
  textOverflow: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  
  // Single line text with ellipsis
  textSingleLine: {
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  
  // Multi-line text with ellipsis
  textMultiLine: (lines = 2) => ({
    numberOfLines: lines,
    ellipsizeMode: 'tail',
  }),
  
  // Container that prevents text overflow
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
}; 