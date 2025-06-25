import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const Header = ({ 
  title, 
  leftIcon, 
  rightIcon, 
  onLeftPress, 
  onRightPress, 
  subtitle,
  showBack = false,
  showDrawer = false,
  onBackPress,
  onDrawerPress,
  rightIconStyle
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.leftSection}>
          {showDrawer && (
            <TouchableOpacity style={styles.drawerButton} onPress={onDrawerPress}>
              <Ionicons name="menu-outline" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          )}
          {showBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          )}
          {leftIcon && !showDrawer && !showBack && (
            <TouchableOpacity style={styles.iconButton} onPress={onLeftPress}>
              <Ionicons name={leftIcon} size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        
        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity style={styles.iconButton} onPress={onRightPress}>
              <Ionicons 
                name={rightIcon} 
                size={24} 
                color={rightIconStyle?.color || COLORS.textPrimary} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SIZES.shadow,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 60,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  drawerButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  backButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  iconButton: {
    padding: SPACING.xs,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Header; 