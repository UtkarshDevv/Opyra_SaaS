import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const ProfileScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'student',
    avatar: 'https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=JD',
    joinDate: 'January 2024',
    coursesEnrolled: 3,
    lessonsCompleted: 24,
    quizzesTaken: 8,
    averageScore: 85
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const renderProfileHeader = () => (
    <Card style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={[styles.roleBadge, { backgroundColor: user.role === 'instructor' ? COLORS.primary : COLORS.success }]}>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.coursesEnrolled}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.lessonsCompleted}</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.quizzesTaken}</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.averageScore}%</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
      </View>
    </Card>
  );

  const renderSettingItem = ({ icon, title, subtitle, onPress, showSwitch, switchValue, onSwitchChange, showArrow = true }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      ) : showArrow ? (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Profile"
        subtitle="Manage your account settings"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="settings-outline"
        onRightPress={() => console.log('Settings')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}

        {/* Personal Information */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {renderSettingItem({
            icon: 'person-outline',
            title: 'Edit Profile',
            subtitle: 'Update your personal information',
            onPress: () => console.log('Edit Profile')
          })}
          {renderSettingItem({
            icon: 'mail-outline',
            title: 'Email',
            subtitle: user.email,
            onPress: () => console.log('Change Email')
          })}
          {renderSettingItem({
            icon: 'call-outline',
            title: 'Phone',
            subtitle: user.phone,
            onPress: () => console.log('Change Phone')
          })}
          {renderSettingItem({
            icon: 'lock-closed-outline',
            title: 'Change Password',
            subtitle: 'Update your password',
            onPress: () => console.log('Change Password')
          })}
        </Card>

        {/* Preferences */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingItem({
            icon: 'moon-outline',
            title: 'Dark Mode',
            subtitle: 'Switch between light and dark themes',
            showSwitch: true,
            switchValue: isDarkMode,
            onSwitchChange: setIsDarkMode,
            showArrow: false
          })}
          {renderSettingItem({
            icon: 'notifications-outline',
            title: 'Push Notifications',
            subtitle: 'Receive notifications about courses and updates',
            showSwitch: true,
            switchValue: notifications,
            onSwitchChange: setNotifications,
            showArrow: false
          })}
          {renderSettingItem({
            icon: 'mail-unread-outline',
            title: 'Email Updates',
            subtitle: 'Receive email notifications',
            showSwitch: true,
            switchValue: emailUpdates,
            onSwitchChange: setEmailUpdates,
            showArrow: false
          })}
        </Card>

        {/* Language */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Language</Text>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={styles.languageItem}
              onPress={() => setSelectedLanguage(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text style={styles.languageName}>{language.name}</Text>
              </View>
              {selectedLanguage === language.code && (
                <Ionicons name="checkmark" size={20} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Card>

        {/* Support */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderSettingItem({
            icon: 'help-circle-outline',
            title: 'Help Center',
            subtitle: 'Get help and find answers',
            onPress: () => console.log('Help Center')
          })}
          {renderSettingItem({
            icon: 'chatbubble-outline',
            title: 'Contact Support',
            subtitle: 'Get in touch with our team',
            onPress: () => console.log('Contact Support')
          })}
          {renderSettingItem({
            icon: 'document-text-outline',
            title: 'Terms of Service',
            subtitle: 'Read our terms and conditions',
            onPress: () => console.log('Terms of Service')
          })}
          {renderSettingItem({
            icon: 'shield-checkmark-outline',
            title: 'Privacy Policy',
            subtitle: 'Learn about our privacy practices',
            onPress: () => console.log('Privacy Policy')
          })}
        </Card>

        {/* Account Actions */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          {renderSettingItem({
            icon: 'download-outline',
            title: 'Export Data',
            subtitle: 'Download your learning data',
            onPress: () => console.log('Export Data')
          })}
          {renderSettingItem({
            icon: 'log-out-outline',
            title: 'Sign Out',
            subtitle: 'Sign out of your account',
            onPress: () => console.log('Sign Out')
          })}
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </Card>
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
  profileCard: {
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  roleText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.white,
  },
  editButton: {
    padding: SPACING.sm,
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
    fontSize: SIZES.lg,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  settingSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: SIZES.lg,
    marginRight: SPACING.sm,
  },
  languageName: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: SIZES.radius,
  },
  deleteAccountText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
});

export default ProfileScreen; 