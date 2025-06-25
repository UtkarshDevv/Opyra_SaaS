import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../../screens/DashboardScreen';
import ModuleDetailScreen from '../../screens/ModuleDetailScreen';
import CRMDashboardScreen from '../../screens/CRM/CRMDashboardScreen';
import FinanceDashboardScreen from '../../screens/Finance/FinanceDashboardScreen';
import AccountingDashboardScreen from '../../screens/Accounting/AccountingDashboardScreen';
import CreateInvoiceScreen from '../../screens/Accounting/CreateInvoiceScreen';
import FinancialReportsScreen from '../../screens/Accounting/FinancialReportsScreen';
import BankReconciliationScreen from '../../screens/Accounting/BankReconciliationScreen';
import GSTReportScreen from '../../screens/Accounting/GSTReportScreen';
import AuthScreen from '../../screens/LMS/AuthScreen';
import LMSDashboardScreen from '../../screens/LMS/LMSDashboardScreen';
import UserManagementScreen from '../../screens/LMS/UserManagementScreen';
import CourseManagementScreen from '../../screens/LMS/CourseManagementScreen';
import CourseDetailsScreen from '../../screens/LMS/CourseDetailsScreen';
import LessonPlayerScreen from '../../screens/LMS/LessonPlayerScreen';
import QuizScreen from '../../screens/LMS/QuizScreen';
import LiveClassScreen from '../../screens/LMS/LiveClassScreen';
import ProfileScreen from '../../screens/LMS/ProfileScreen';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Accounting Stack Navigator
const AccountingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountingDashboard" component={AccountingDashboardScreen} />
    <Stack.Screen name="CreateInvoice" component={CreateInvoiceScreen} />
    <Stack.Screen name="FinancialReports" component={FinancialReportsScreen} />
    <Stack.Screen name="BankReconciliation" component={BankReconciliationScreen} />
    <Stack.Screen name="GSTReport" component={GSTReportScreen} />
    <Stack.Screen name="CreateTransaction" component={AccountingDashboardScreen} />
    <Stack.Screen name="RecordExpense" component={AccountingDashboardScreen} />
    <Stack.Screen name="DetailedReports" component={FinancialReportsScreen} />
    <Stack.Screen name="ExpenseReport" component={FinancialReportsScreen} />
    <Stack.Screen name="AllTransactions" component={AccountingDashboardScreen} />
    <Stack.Screen name="ExportReport" component={FinancialReportsScreen} />
    <Stack.Screen name="TDSReport" component={FinancialReportsScreen} />
  </Stack.Navigator>
);

// LMS Stack Navigator
const LMSStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LMSAuth" component={AuthScreen} />
    <Stack.Screen name="LMSDashboard" component={LMSDashboardScreen} />
    <Stack.Screen name="UserManagement" component={UserManagementScreen} />
    <Stack.Screen name="CourseManagement" component={CourseManagementScreen} />
    <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
    <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} />
    <Stack.Screen name="QuizScreen" component={QuizScreen} />
    <Stack.Screen name="LiveClass" component={LiveClassScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="AddUser" component={UserManagementScreen} />
    <Stack.Screen name="EditUser" component={UserManagementScreen} />
    <Stack.Screen name="EditCourse" component={CourseManagementScreen} />
    <Stack.Screen name="CreateCourse" component={CourseManagementScreen} />
    <Stack.Screen name="ScheduleClass" component={LMSDashboardScreen} />
    <Stack.Screen name="StudentPerformance" component={LMSDashboardScreen} />
    <Stack.Screen name="Analytics" component={LMSDashboardScreen} />
  </Stack.Navigator>
);

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'grid-outline',
      screen: 'Dashboard',
      color: COLORS.primary
    },
    {
      id: 'finance',
      title: 'Finance',
      icon: 'wallet-outline',
      screen: 'Finance',
      color: '#714B67',
      subtitle: 'Accounting & Invoicing'
    },
    {
      id: 'accounting',
      title: 'Accounting',
      icon: 'calculator-outline',
      screen: 'Accounting',
      color: '#00A09D',
      subtitle: 'Advanced Accounting'
    },
    {
      id: 'crm',
      title: 'CRM',
      icon: 'people-outline',
      screen: 'CRM',
      color: '#FF6B35',
      subtitle: 'Customer Management'
    },
    {
      id: 'lms',
      title: 'Learning',
      icon: 'school-outline',
      screen: 'LMS',
      color: '#9C27B0',
      subtitle: 'LMS & Education'
    },
    {
      id: 'sales',
      title: 'Sales',
      icon: 'trending-up-outline',
      screen: 'Sales',
      color: '#28A745',
      subtitle: 'Sales & Pipeline'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      icon: 'cube-outline',
      screen: 'Inventory',
      color: '#17A2B8',
      subtitle: 'Stock Management'
    },
    {
      id: 'hr',
      title: 'Human Resources',
      icon: 'people-circle-outline',
      screen: 'HR',
      color: '#6F42C1',
      subtitle: 'Employees & Payroll'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: 'megaphone-outline',
      screen: 'Marketing',
      color: '#FFC107',
      subtitle: 'Campaigns & Analytics'
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: 'briefcase-outline',
      screen: 'Projects',
      color: '#DC3545',
      subtitle: 'Project Management'
    }
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        props.navigation.navigate(item.screen);
        props.navigation.closeDrawer();
      }}
    >
      <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={20} color={COLORS.white} />
      </View>
      <View style={styles.menuText}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        {item.subtitle && (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.drawerContainer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Ionicons name="business-outline" size={32} color={COLORS.primary} />
          <Text style={styles.logoText}>OpyraSaaS</Text>
        </View>
        <Text style={styles.headerSubtitle}>Business Management Platform</Text>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map(renderMenuItem)}
      </ScrollView>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="settings-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="help-circle-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.footerText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerType: 'slide',
      drawerStyle: { width: 280 },
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    }}
  >
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Finance" component={FinanceDashboardScreen} />
    <Drawer.Screen name="Accounting" component={AccountingStack} />
    <Drawer.Screen name="CRM" component={CRMDashboardScreen} />
    <Drawer.Screen name="LMS" component={LMSStack} />
    <Drawer.Screen name="Sales" component={DashboardScreen} />
    <Drawer.Screen name="Inventory" component={DashboardScreen} />
    <Drawer.Screen name="HR" component={DashboardScreen} />
    <Drawer.Screen name="Marketing" component={DashboardScreen} />
    <Drawer.Screen name="Projects" component={DashboardScreen} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  drawerHeader: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  logoText: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  headerSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  menuContainer: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  drawerFooter: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  footerText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
});

export default DrawerNavigator; 