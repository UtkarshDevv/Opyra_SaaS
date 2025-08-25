import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

const SurveyFeature = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Header 
    //     title="Survey Automation"
    //     subtitle="Automate and analyze your surveys"
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //   />
    //   <View style={styles.content}>
    //     <Text style={styles.title}>Survey Automation Feature</Text>
    //     <Text style={styles.subtitle}>This is a placeholder for the Survey Automation module. Add your survey UI here.</Text>
    //   </View>
    // </View>
    <View className="flex-1 bg-background">
      <Header 
        title="Survey Automation"
        subtitle="Automate and analyze your surveys"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <View className="flex-1 justify-center items-center p-lg">
        <Text className="font-bold text-xl text-primary mb-md">Survey Automation Feature</Text>
        <Text className="font-regular text-md text-textSecondary text-center">This is a placeholder for the Survey Automation module. Add your survey UI here.</Text>
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

export default SurveyFeature; 