import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import FeatureCard from '../component/FeatureCard';
import { useNavigation } from '@react-navigation/native';
import { features } from '../data/features';
import Footer from '../component/Footer';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    // <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    //   {/* Hero Section */}
    //   <View style={styles.heroSection}>
    //     <Text style={styles.heroTitle}>All your business on</Text>
    //     <View style={styles.highlightContainer}>
    //       <Text style={styles.highlightedText}>one platform.</Text>
    //     </View>
    //     <Text style={styles.heroSubtitle}>
    //       Start smarter. Work faster.{"\n"}
    //       <Text style={styles.underlinedText}>Scale better.</Text>
    //     </Text>

    //     {/* CTA Buttons */}
    //     <View style={styles.ctaContainer}>
    //       <TouchableOpacity style={styles.startButton}>
    //         <Text style={styles.startButtonText}>Start now</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.advisorButton}>
    //         <Text style={styles.advisorButtonText}>Meet an advisor ⌄</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>

    //   {/* Features Grid */}
    //   <View style={styles.featuresGrid}>
    //     {features.map((feature) => (
    //       <TouchableOpacity
    //         key={feature.id}
    //         style={styles.featureTouchable}
    //         onPress={() => navigation.navigate(feature.screen)}
    //       >
    //         <FeatureCard
    //           title={feature.title}
    //           icon={feature.icon}
    //           color={feature.color}
    //         />
    //       </TouchableOpacity>
    //     ))}
    //   </View>

    //   {/* Additional Content */}
    //   <View style={styles.additionalContent}>
    //     <Text style={styles.additionalTitle}>
    //       Picture an entire suite of business apps ready for you to explore. Want to{" "}
    //       <Text style={styles.highlightedOrange}>streamline a task or boost efficiency?</Text>
    //       {"\n"}There's an app for that.
    //     </Text>
    //   </View>

    //   {/* About Section */}
    //   <View style={styles.aboutSection}>
    //     <Text style={styles.aboutTitle}>About Opyra</Text>
    //     <Text style={styles.aboutDescription}>
    //       Opyra is a powerful SaaS platform designed to simplify and automate your business workflows. From learning management to customer engagement, we bring everything under one roof.
    //     </Text>
    //   </View>

    //   <Footer />
    // </ScrollView>
    <ScrollView className="flex-1 bg-[#F6F6F6]" showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View className="p-[20] items-center">
        <Text className="text-[28px] font-bold text-[#333] text-center">All your business on</Text>
        <View className="bg-[#FFB3BA] px-3 py-1 rounded-md mb-sm">
          <Text className="text-[28px] font-bold text-[#333]">one platform.</Text>
        </View>
        <Text className="text-[20px] font-medium text-[#333] my-5 text-center">
          Start smarter. Work faster.{"\n"}
          <Text className="underline">Scale better.</Text>
        </Text>

        {/* CTA Buttons */}
        <View className="flex-row justify-center gap-[15] flex-wrap">
          <TouchableOpacity className="bg-[#FF0000] py-[12] px-[28] rounded-[10]">
            <Text className="text-white font-semibold text-[16px]">Start now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#E0E0E0] py-3 px-5 rounded-[10]">
            <Text className="bg-[#E0E0E0] py-3 px-5 rounded-[10]">Meet an advisor ⌄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Grid */}
      <View className="flex-row flex-wrap justify-around p-5">
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            // style={styles.featureTouchable}
            className="mb-5"
            onPress={() => navigation.navigate(feature.screen)}
          >
            <FeatureCard
              title={feature.title}
              icon={feature.icon}
              color={feature.color}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Content */}
      <View className="p-5 items-center">
        <Text className="text-[18px] font-semibold text-[#333] text-center" style={styles.additionalTitle}>
          Picture an entire suite of business apps ready for you to explore. Want to{" "}
          <Text className="text-[#FF9800] font-bold">streamline a task or boost efficiency?</Text>
          {"\n"}There's an app for that.
        </Text>
      </View>

      {/* About Section */}
      <View className="p-5 items-center">
        <Text className="text-xl font-bold text-[#FF9800] mb-[10]">About Opyra</Text>
        <Text className="text-md italic  text-[#333] text-center leading-6">
          Opyra is a powerful SaaS platform designed to simplify and automate your business workflows. From learning management to customer engagement, we bring everything under one roof.
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // scrollView: {
  //   flex: 1,
  //   backgroundColor: '#F6F6F6',
  // },
  // heroSection: {
  //   padding: 20,
  //   alignItems: 'center',
  // },
  // heroTitle: {
  //   fontSize: 28,
  //   fontWeight: '700',
  //   color: '#333',
  //   textAlign: 'center',
  // },
  // highlightContainer: {
  //   backgroundColor: '#FFB3BA',
  //   paddingHorizontal: 12,
  //   paddingVertical: 4,
  //   borderRadius: 6,
  //   marginTop: 4,
  // },
  // highlightedText: {
  //   fontSize: 28,
  //   fontWeight: '700',
  //   color: '#333',
  // },
  // heroSubtitle: {
  //   fontSize: 20,
  //   fontWeight: '500',
  //   color: '#333',
  //   textAlign: 'center',
  //   marginVertical: 20,
  // },
  // underlinedText: {
  //   textDecorationLine: 'underline',
  // },
  // ctaContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   gap: 15,
  //   flexWrap: 'wrap',
  // },
  // startButton: {
  //   backgroundColor: '#FF0000',
  //   paddingVertical: 12,
  //   paddingHorizontal: 28,
  //   borderRadius: 10,
  // },
  // startButtonText: {
  //   color: '#fff',
  //   fontWeight: '600',
  //   fontSize: 16,
  // },
  // advisorButton: {
  //   backgroundColor: '#E0E0E0',
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 10,
  // },
  // advisorButtonText: {
  //   color: '#666',
  //   fontWeight: '500',
  //   fontSize: 16,
  // },
  // featuresGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   padding: 20,
  // },
  // featureTouchable: {
  //   marginBottom: 20,
  // },
  // additionalContent: {
  //   padding: 20,
  //   alignItems: 'center',
  // },
  // additionalTitle: {
  //   fontSize: 18,
  //   fontWeight: '600',
  //   color: '#333',
  //   textAlign: 'center',
  // },
  // highlightedOrange: {
  //   color: '#FF9800',
  //   fontWeight: '700',
  // },
  // aboutSection: {
  //   padding: 20,
  //   alignItems: 'center',
  // },
  // aboutTitle: {
  //   fontSize: 24,
  //   fontWeight: '700',
  //   color: '#FF9800',
  //   marginBottom: 10,
  // },
  // aboutDescription: {
  //   fontSize: 16,
  //   fontStyle: 'italic',
  //   color: '#333',
  //   textAlign: 'center',
  //   lineHeight: 24,
  // },
});

export default HomeScreen;
