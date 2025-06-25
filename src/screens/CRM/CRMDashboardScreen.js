import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const CRMDashboardScreen = ({ navigation }) => {
  const stats = {
    totalLeads: 156,
    newLeads: 23,
    totalContacts: 892,
    activeDeals: 45,
    wonDeals: 12,
    lostDeals: 8,
    revenue: '$125,430',
    conversionRate: '68%'
  };

  const recentLeads = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Solutions Inc',
      email: 'john@techsolutions.com',
      phone: '+1 (555) 123-4567',
      status: 'New',
      value: '$15,000',
      source: 'Website',
      lastContact: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Global Marketing',
      email: 'sarah@globalmarketing.com',
      phone: '+1 (555) 987-6543',
      status: 'Qualified',
      value: '$25,000',
      source: 'Referral',
      lastContact: '1 day ago'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      company: 'StartupXYZ',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 456-7890',
      status: 'Proposal',
      value: '$35,000',
      source: 'LinkedIn',
      lastContact: '3 days ago'
    }
  ];

  const pipelineStages = [
    { name: 'New', count: 23, color: '#FF6B35', percentage: 15 },
    { name: 'Qualified', count: 18, color: '#FFC107', percentage: 12 },
    { name: 'Proposal', count: 12, color: '#17A2B8', percentage: 8 },
    { name: 'Negotiation', count: 8, color: '#6F42C1', percentage: 5 },
    { name: 'Closed Won', count: 12, color: '#28A745', percentage: 8 },
    { name: 'Closed Lost', count: 8, color: '#DC3545', percentage: 5 }
  ];

  const renderLeadCard = (lead) => (
    <Card key={lead.id} style={styles.leadCard}>
      <View style={styles.leadHeader}>
        <View style={styles.leadInfo}>
          <Text style={styles.leadName}>{lead.name}</Text>
          <Text style={styles.leadCompany}>{lead.company}</Text>
        </View>
        <View style={styles.leadStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(lead.status) }
          ]}>
            <Text style={styles.statusText}>{lead.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.leadDetails}>
        <View style={styles.leadDetail}>
          <Ionicons name="mail-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.leadDetailText}>{lead.email}</Text>
        </View>
        <View style={styles.leadDetail}>
          <Ionicons name="call-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.leadDetailText}>{lead.phone}</Text>
        </View>
        <View style={styles.leadDetail}>
          <Ionicons name="cash-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.leadDetailText}>{lead.value}</Text>
        </View>
        <View style={styles.leadDetail}>
          <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.leadDetailText}>{lead.lastContact}</Text>
        </View>
      </View>
      
      <View style={styles.leadActions}>
        <Button
          title="View Details"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate('LeadDetail', { lead })}
        />
        <Button
          title="Contact"
          variant="primary"
          size="small"
          onPress={() => navigation.navigate('ContactLead', { lead })}
        />
      </View>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return COLORS.info;
      case 'Qualified': return COLORS.warning;
      case 'Proposal': return COLORS.secondary;
      case 'Negotiation': return COLORS.primary;
      case 'Closed Won': return COLORS.success;
      case 'Closed Lost': return COLORS.error;
      default: return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="CRM Dashboard"
        subtitle="Customer Relationship Management"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate('AddLead')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <LinearGradient
            colors={['#00A09D', '#33B3B0']}
            style={styles.statsGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.totalLeads}</Text>
                <Text style={styles.statLabel}>Total Leads</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.newLeads}</Text>
                <Text style={styles.statLabel}>New This Week</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.activeDeals}</Text>
                <Text style={styles.statLabel}>Active Deals</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.revenue}</Text>
                <Text style={styles.statLabel}>Revenue</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Pipeline Overview */}
        <View style={styles.pipelineSection}>
          <Card style={styles.pipelineCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sales Pipeline</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Pipeline')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.pipelineStages}>
              {pipelineStages.map((stage, index) => (
                <View key={index} style={styles.pipelineStage}>
                  <View style={styles.stageHeader}>
                    <View style={[styles.stageColor, { backgroundColor: stage.color }]} />
                    <Text style={styles.stageName}>{stage.name}</Text>
                    <Text style={styles.stageCount}>{stage.count}</Text>
                  </View>
                  <View style={styles.stageBar}>
                    <View 
                      style={[
                        styles.stageProgress, 
                        { 
                          backgroundColor: stage.color,
                          width: `${stage.percentage}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Recent Leads */}
        <View style={styles.leadsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Leads</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllLeads')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentLeads.map(renderLeadCard)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Card style={styles.quickActionsCard}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('AddLead')}
              >
                <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Add Lead</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('ImportContacts')}
              >
                <Ionicons name="cloud-upload-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Import Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('Reports')}
              >
                <Ionicons name="bar-chart-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('Settings')}
              >
                <Ionicons name="settings-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Settings</Text>
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
    padding: SPACING.md,
  },
  statsSection: {
    marginBottom: SPACING.lg,
  },
  statsGradient: {
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
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
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  pipelineSection: {
    marginBottom: SPACING.lg,
  },
  pipelineCard: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
  },
  viewAllText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
  },
  pipelineStages: {
    marginTop: SPACING.md,
  },
  pipelineStage: {
    marginBottom: SPACING.sm,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  stageColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  stageName: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  stageCount: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  stageBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  stageProgress: {
    height: '100%',
    borderRadius: 3,
  },
  leadsSection: {
    marginBottom: SPACING.lg,
  },
  leadCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  leadCompany: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  leadStatus: {
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
  leadDetails: {
    marginBottom: SPACING.md,
  },
  leadDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  leadDetailText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  leadActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActions: {
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

export default CRMDashboardScreen; 