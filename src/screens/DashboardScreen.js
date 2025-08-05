import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../constants/theme';

const DashboardScreen = ({ navigation }) => {
  const modules = [
    {
      id: 'finance',
      title: 'Finance',
      subtitle: 'Accounting & Invoicing',
      icon: 'wallet-outline',
      color: '#714B67',
      gradient: ['#714B67', '#8B6B7F'],
      apps: ['Accounting', 'Invoicing', 'Expenses', 'Spreadsheet']
    },
    {
      id: 'sales',
      title: 'Sales',
      subtitle: 'CRM & Point of Sale',
      icon: 'trending-up-outline',
      color: '#00A09D',
      gradient: ['#00A09D', '#33B3B0'],
      apps: ['CRM', 'Sales', 'POS Shop', 'Subscriptions']
    },
    {
      id: 'lms',
      title: 'Learning',
      subtitle: 'LMS & Education (Login Required)',
      icon: 'school-outline',
      color: '#9C27B0',
      gradient: ['#9C27B0', '#BA68C8'],
      apps: ['Courses', 'Quizzes', 'Live Classes', 'Progress']
    },
    {
      id: 'websites',
      title: 'Websites',
      subtitle: 'Website Builder & eCommerce',
      icon: 'globe-outline',
      color: '#FF6B35',
      gradient: ['#FF6B35', '#FF8A5C'],
      apps: ['Website Builder', 'eCommerce', 'Blog', 'Live Chat']
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain',
      subtitle: 'Inventory & Manufacturing',
      icon: 'cube-outline',
      color: '#28A745',
      gradient: ['#28A745', '#34CE57'],
      apps: ['Inventory', 'Manufacturing', 'Purchase', 'Quality']
    },
    {
      id: 'hr',
      title: 'Human Resources',
      subtitle: 'Employees & Recruitment',
      icon: 'people-outline',
      color: '#17A2B8',
      gradient: ['#17A2B8', '#39C0D3'],
      apps: ['Employees', 'Recruitment', 'Time Off', 'Appraisals']
    },
    {
      id: 'marketing',
      title: 'Marketing',
      subtitle: 'Social & Email Marketing',
      icon: 'megaphone-outline',
      color: '#FFC107',
      gradient: ['#FFC107', '#FFD54F'],
      apps: ['Social Marketing', 'Email Marketing', 'Events', 'Surveys']
    },
    {
      id: 'services',
      title: 'Services',
      subtitle: 'Project & Field Service',
      icon: 'briefcase-outline',
      color: '#6F42C1',
      gradient: ['#6F42C1', '#8E63CE'],
      apps: ['Project', 'Timesheets', 'Field Service', 'Helpdesk']
    },
    {
      id: 'productivity',
      title: 'Productivity',
      subtitle: 'Discuss & Approvals',
      icon: 'flash-outline',
      color: '#DC3545',
      gradient: ['#DC3545', '#E74C3C'],
      apps: ['Discuss', 'Approvals', 'IoT', 'VoIP']
    }
  ];

  const handleModulePress = (module) => {
    // Navigate to the appropriate module based on the module ID
    switch (module.id) {
      case 'finance':
        navigation.navigate('Finance');
        break;
      case 'sales':
        navigation.navigate('Sales');
        break;
      case 'lms':
        Alert.alert(
          'Access LMS',
          'Are you sure you want to access the LMS module?',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Access',
              onPress: () => {
                // Navigate to LMS stack first, then to LMSAuth
                navigation.navigate('LMS', { screen: 'LMSAuth' });
              },
            },
          ],
          { cancelable: false }
        );
        break;
      default:
        navigation.navigate('ModuleDetail', { module });
    }
  };

  const renderModuleCard = (module) => (
    <TouchableOpacity
      key={module.id}
      // style={styles.moduleCard}
      className="w-[48%] mb-md  overflow-hidden rounded-lg"
      onPress={() => handleModulePress(module)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={module.gradient}
        // style={styles.moduleGradient}
        className="p-md min-h-[140px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-row items-center mb-sm">
          <View className="w-[48] h-[48] rounded-[24px] bg-[rgba(255,255,255,0.2)] items-center justify-center mr-sm">
            <Ionicons name={module.icon} size={32} color={COLORS.white} />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-lg text-white mb-[2]">{module.title}</Text>
            <Text className="text-xs font-regular text-[rgba(255,255,255,0.8)]">{module.subtitle}</Text>
          </View>
          {/* Show lock icon for LMS module */}
          {module.id === 'lms' && (
            <View className="absolute top-sm right-sm bg-[rgba(0,0,0,0.3)] p-xs rounded-sm">
              <Ionicons name="lock-closed" size={16} color="rgba(255, 255, 255, 0.8)" />
            </View>
          )}
        </View>

        <View className="flex-row flex-wrap">
          {module.apps.slice(0, 2).map((app, index) => (
            <View key={index} className="bg-[rgba(255,255,255,0.2)] px-xs py-[2] rounded-[8px] mr-xs mb-xs">
              <Text className="font-regular text-xs text-white">{app}</Text>
            </View>
          ))}
          {module.apps.length > 2 && (
            <View className="bg-[rgba(255,255,255,0.2)] px-xs py-[2] rounded-[8px] mr-xs mb-xs">
              <Text className="font-regular text-xs text-white">+{module.apps.length - 2} more</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <Header 
        title="All your business on one platform"
        subtitle="Simple, efficient, yet affordable!"
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        rightIcon="notifications-outline"
        onRightPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        <View className="mb-lg">
          <Text className="font-bold text-xxl text-textPrimary mb-xs">Welcome back!</Text>
          <Text className="font-regular text-md text-textSecondary" >
            Choose a module to get started with your business operations
          </Text>
          {/* <Text className='text-lg text-red-500'>Hii this is below</Text> */}
        </View>

        <View className="flex-row flex-wrap justify-between mb-xl">
          {modules.map(renderModuleCard)}
        </View>

        <View className="mb-xl">
          <Card className="p-lg">
            <Text className="font-bold text-lg text-textPrimary mb-md">Quick Stats</Text>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="font-bold text-xxl text-primary mb-xs">12</Text>
                <Text className="font-regular text-sm text-textSecondary">Active Apps</Text>
              </View>
              <View className="items-center">
                <Text className="font-bold text-xxl text-primary mb-xs">8</Text>
                <Text className="font-regular text-sm text-textSecondary">Modules</Text>
              </View>
              <View className="items-center">
                <Text className="font-bold text-xxl text-primary mb-xs">24/7</Text>
                <Text className="font-regular text-sm text-textSecondary">Support</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DashboardScreen; 