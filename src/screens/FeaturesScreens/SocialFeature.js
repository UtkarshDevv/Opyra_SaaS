import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

const SocialFeature = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Header 
    //     title="Social Planner"
    //     subtitle="Plan and schedule your social media posts"
    //     showBack={true}
    //     onBackPress={() => navigation.goBack()}
    //   />
    //   <View style={styles.content}>
    //     <Text style={styles.title}>Social Planner Feature</Text>
    //     <Text style={styles.subtitle}>This is a placeholder for the Social Planner module. Add your social planner UI here.</Text>
    //   </View>
    // </View>
    <View className="flex-1 bg-background">
      <Header 
        title="Social Planner"
        subtitle="Plan and schedule your social media posts"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <View className="flex-1 justify-center items-center p-lg">
        <Text className="font-bold text-xl text-primary mb-md">Social Planner Feature</Text>
        <Text className="font-regular text-md text-textSecondary text-center">This is a placeholder for the Social Planner module. Add your social planner UI here.</Text>
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

export default SocialFeature; 