import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const Card = ({ 
  children, 
  style, 
  padding = SPACING.md,
  margin,
  elevation = 'normal',
  borderRadius = SIZES.radius,
  backgroundColor = COLORS.white 
}) => {
  const getShadowStyle = () => {
    switch (elevation) {
      case 'high':
        return SIZES.shadowLg;
      case 'low':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        };
      default:
        return SIZES.shadow;
    }
  };

  return (
    <View 
      style={[
        styles.container,
        {
          padding,
          margin,
          borderRadius,
          backgroundColor,
          ...getShadowStyle(),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default Card; 