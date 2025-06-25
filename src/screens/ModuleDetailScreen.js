import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../constants/theme';

const ModuleDetailScreen = ({ route, navigation }) => {
  const { module } = route.params;

  const appDetails = {
    'Accounting': {
      icon: 'calculator-outline',
      description: 'Complete accounting solution with automated entries',
      features: ['Chart of Accounts', 'Journal Entries', 'Financial Reports', 'Tax Management'],
      status: 'active'
    },
    'Invoicing': {
      icon: 'receipt-outline',
      description: 'Create and manage professional invoices',
      features: ['Invoice Templates', 'Payment Tracking', 'Recurring Invoices', 'Multi-currency'],
      status: 'active'
    },
    'Expenses': {
      icon: 'card-outline',
      description: 'Track and manage business expenses',
      features: ['Expense Reports', 'Receipt Scanning', 'Approval Workflow', 'Reimbursement'],
      status: 'active'
    },
    'Spreadsheet': {
      icon: 'grid-outline',
      description: 'Advanced spreadsheet and BI capabilities',
      features: ['Data Analysis', 'Charts & Graphs', 'Real-time Collaboration', 'Custom Reports'],
      status: 'coming-soon'
    },
    'CRM': {
      icon: 'people-circle-outline',
      description: 'Customer relationship management system',
      features: ['Lead Management', 'Contact Database', 'Sales Pipeline', 'Activity Tracking'],
      status: 'active'
    },
    'Sales': {
      icon: 'trending-up-outline',
      description: 'Complete sales management solution',
      features: ['Sales Orders', 'Quotations', 'Commission Tracking', 'Sales Analytics'],
      status: 'active'
    },
    'POS Shop': {
      icon: 'storefront-outline',
      description: 'Point of sale for retail businesses',
      features: ['Barcode Scanning', 'Payment Processing', 'Inventory Sync', 'Receipt Printing'],
      status: 'active'
    },
    'Subscriptions': {
      icon: 'repeat-outline',
      description: 'Manage recurring billing and subscriptions',
      features: ['Recurring Billing', 'Subscription Plans', 'Usage Tracking', 'Dunning Management'],
      status: 'active'
    }
  };

  const renderAppCard = (appName) => {
    const app = appDetails[appName];
    if (!app) return null;

    return (
      <Card key={appName} style={styles.appCard}>
        <View style={styles.appHeader}>
          <View style={styles.appIconContainer}>
            <Ionicons name={app.icon} size={24} color={COLORS.primary} />
          </View>
          <View style={styles.appInfo}>
            <Text style={styles.appName}>{appName}</Text>
            <Text style={styles.appDescription}>{app.description}</Text>
          </View>
          <View style={styles.appStatus}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: app.status === 'active' ? COLORS.success : COLORS.warning }
            ]}>
              <Text style={styles.statusText}>
                {app.status === 'active' ? 'Active' : 'Coming Soon'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          {app.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.appActions}>
          <Button
            title={app.status === 'active' ? 'Open App' : 'Notify Me'}
            variant={app.status === 'active' ? 'primary' : 'outline'}
            size="small"
            onPress={() => {
              if (app.status === 'active') {
                navigation.navigate('AppDetail', { appName, app });
              }
            }}
          />
          {app.status === 'active' && (
            <Button
              title="Settings"
              variant="ghost"
              size="small"
              onPress={() => navigation.navigate('AppSettings', { appName })}
            />
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title={module.title}
        subtitle={module.subtitle}
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="settings-outline"
        onRightPress={() => navigation.navigate('ModuleSettings', { module })}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={module.gradient}
          style={styles.moduleHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.moduleInfo}>
            <View style={styles.moduleIconContainer}>
              <Ionicons name={module.icon} size={48} color={COLORS.white} />
            </View>
            <View style={styles.moduleText}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
            </View>
          </View>
          
          <View style={styles.moduleStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{module.apps.length}</Text>
              <Text style={styles.statLabel}>Apps</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {module.apps.filter(app => appDetails[app]?.status === 'active').length}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.appsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Applications</Text>
            <Text style={styles.sectionSubtitle}>
              Choose from our comprehensive suite of business applications
            </Text>
          </View>

          {module.apps.map(renderAppCard)}
        </View>

        <View style={styles.quickActions}>
          <Card style={styles.quickActionsCard}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickAction}>
                <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Install New App</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Module Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Get Help</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAction}>
                <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Documentation</Text>
              </TouchableOpacity>
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
  },
  moduleHeader: {
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  moduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  moduleIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  moduleText: {
    flex: 1,
  },
  moduleTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  moduleSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  moduleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...FONTS.bold,
    fontSize: SIZES.xxl,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  appsSection: {
    padding: SPACING.md,
  },
  sectionHeader: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  appCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  appDescription: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  appStatus: {
    marginLeft: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  featuresContainer: {
    marginBottom: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  featureText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  appActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActions: {
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  quickActionsCard: {
    padding: SPACING.lg,
  },
  quickActionsTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
  },
  quickActionText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
});

export default ModuleDetailScreen; 