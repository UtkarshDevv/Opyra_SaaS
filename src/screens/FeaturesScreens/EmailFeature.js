import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

const EmailFeature = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header 
        title="Email Marketing"
        subtitle="Automate and track your email campaigns"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Email Marketing Feature</Text>
        <Text style={styles.subtitle}>This is a placeholder for the Email Marketing module. Add your email marketing UI here.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default EmailFeature; 