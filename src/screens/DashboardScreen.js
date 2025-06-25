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
      style={styles.moduleCard}
      onPress={() => handleModulePress(module)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={module.gradient}
        style={styles.moduleGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.moduleHeader}>
          <View style={styles.moduleIconContainer}>
            <Ionicons name={module.icon} size={32} color={COLORS.white} />
          </View>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
          </View>
          {/* Show lock icon for LMS module */}
          {module.id === 'lms' && (
            <View style={styles.authIndicator}>
              <Ionicons name="lock-closed" size={16} color="rgba(255, 255, 255, 0.8)" />
            </View>
          )}
        </View>
        
        <View style={styles.moduleApps}>
          {module.apps.slice(0, 2).map((app, index) => (
            <View key={index} style={styles.appTag}>
              <Text style={styles.appTagText}>{app}</Text>
            </View>
          ))}
          {module.apps.length > 2 && (
            <View style={styles.appTag}>
              <Text style={styles.appTagText}>+{module.apps.length - 2} more</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="All your business on one platform"
        subtitle="Simple, efficient, yet affordable!"
        showDrawer={true}
        onDrawerPress={() => navigation.openDrawer()}
        rightIcon="notifications-outline"
        onRightPress={() => navigation.navigate('Notifications')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back!</Text>
          <Text style={styles.welcomeSubtitle}>
            Choose a module to get started with your business operations
          </Text>
        </View>

        <View style={styles.modulesGrid}>
          {modules.map(renderModuleCard)}
        </View>

        <View style={styles.statsSection}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Quick Stats</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Active Apps</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Modules</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
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
    padding: SPACING.md,
  },
  welcomeSection: {
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  moduleCard: {
    width: '48%',
    marginBottom: SPACING.md,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
  },
  moduleGradient: {
    padding: SPACING.md,
    minHeight: 140,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  moduleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
    marginBottom: 2,
  },
  moduleSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  moduleApps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  appTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: SIZES.radius,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  appTagText: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  statsSection: {
    marginBottom: SPACING.xl,
  },
  statsCard: {
    padding: SPACING.lg,
  },
  statsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  authIndicator: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: SPACING.xs,
    borderRadius: SIZES.radius,
  },
});

export default DashboardScreen; 