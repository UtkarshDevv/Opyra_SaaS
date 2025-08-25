import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

const EmailFeature = ({ navigation }) => {
  return (
    <View className="flex-1 bg-background">
      <Header 
        title="Email Marketing"
        subtitle="Automate and track your email campaigns"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <View className="flex-1 justify-center items-center p-lg">
        <Text className="font-bold text-xl text-primary mb-md">Email Marketing Feature</Text>
        <Text className="font-regular text-md text-textSecondary text-center">This is a placeholder for the Email Marketing module. Add your email marketing UI here.</Text>
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