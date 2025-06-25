import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const FinanceDashboardScreen = ({ navigation }) => {
  const financialStats = {
    totalRevenue: '$245,680',
    totalExpenses: '$89,420',
    netProfit: '$156,260',
    outstandingInvoices: '$32,450',
    overdueInvoices: '$8,920',
    monthlyGrowth: '+12.5%',
    cashFlow: '+$45,230'
  };

  const recentInvoices = [
    {
      id: 'INV-001',
      customer: 'Tech Solutions Inc',
      amount: '$15,000',
      status: 'Paid',
      dueDate: '2024-01-15',
      issueDate: '2024-01-01',
      description: 'Software Development Services'
    },
    {
      id: 'INV-002',
      customer: 'Global Marketing',
      amount: '$8,500',
      status: 'Pending',
      dueDate: '2024-01-20',
      issueDate: '2024-01-05',
      description: 'Marketing Campaign Services'
    },
    {
      id: 'INV-003',
      customer: 'StartupXYZ',
      amount: '$12,000',
      status: 'Overdue',
      dueDate: '2024-01-10',
      issueDate: '2023-12-20',
      description: 'Consulting Services'
    }
  ];

  const expenseCategories = [
    { name: 'Salaries', amount: '$45,000', percentage: 50, color: '#714B67' },
    { name: 'Office Rent', amount: '$12,000', percentage: 13, color: '#00A09D' },
    { name: 'Utilities', amount: '$8,500', percentage: 10, color: '#FF6B35' },
    { name: 'Marketing', amount: '$7,200', percentage: 8, color: '#28A745' },
    { name: 'Software', amount: '$6,720', percentage: 8, color: '#17A2B8' },
    { name: 'Other', amount: '$10,000', percentage: 11, color: '#6C757D' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return COLORS.success;
      case 'Pending': return COLORS.warning;
      case 'Overdue': return COLORS.error;
      default: return COLORS.gray;
    }
  };

  const renderInvoiceCard = (invoice) => (
    <Card key={invoice.id} style={styles.invoiceCard}>
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceId}>{invoice.id}</Text>
          <Text style={styles.invoiceCustomer}>{invoice.customer}</Text>
        </View>
        <View style={styles.invoiceStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(invoice.status) }
          ]}>
            <Text style={styles.statusText}>{invoice.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.invoiceDetails}>
        <View style={styles.invoiceDetail}>
          <Ionicons name="cash-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.invoiceDetailText}>{invoice.amount}</Text>
        </View>
        <View style={styles.invoiceDetail}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.invoiceDetailText}>Due: {invoice.dueDate}</Text>
        </View>
        <View style={styles.invoiceDetail}>
          <Ionicons name="document-text-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.invoiceDetailText}>{invoice.description}</Text>
        </View>
      </View>
      
      <View style={styles.invoiceActions}>
        <Button
          title="View Details"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate('InvoiceDetail', { invoice })}
        />
        <Button
          title={invoice.status === 'Paid' ? 'Download' : 'Send Reminder'}
          variant={invoice.status === 'Paid' ? 'secondary' : 'primary'}
          size="small"
          onPress={() => {
            if (invoice.status === 'Paid') {
              navigation.navigate('DownloadInvoice', { invoice });
            } else {
              navigation.navigate('SendReminder', { invoice });
            }
          }}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Finance Dashboard"
        subtitle="Accounting & Financial Management"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate('CreateInvoice')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Financial Overview */}
        <View style={styles.overviewSection}>
          <LinearGradient
            colors={['#714B67', '#8B6B7F']}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.overviewGrid}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Total Revenue</Text>
                <Text style={styles.overviewAmount}>{financialStats.totalRevenue}</Text>
                <Text style={styles.overviewGrowth}>{financialStats.monthlyGrowth}</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Net Profit</Text>
                <Text style={styles.overviewAmount}>{financialStats.netProfit}</Text>
                <Text style={styles.overviewGrowth}>+18.2%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Cash Flow</Text>
                <Text style={styles.overviewAmount}>{financialStats.cashFlow}</Text>
                <Text style={styles.overviewGrowth}>+25.1%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Outstanding</Text>
                <Text style={styles.overviewAmount}>{financialStats.outstandingInvoices}</Text>
                <Text style={styles.overviewGrowth}>-5.2%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Expense Breakdown */}
        <View style={styles.expenseSection}>
          <Card style={styles.expenseCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Expense Breakdown</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ExpenseReport')}>
                <Text style={styles.viewAllText}>View Report</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.expenseCategories}>
              {expenseCategories.map((category, index) => (
                <View key={index} style={styles.expenseCategory}>
                  <View style={styles.categoryHeader}>
                    <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>{category.amount}</Text>
                  </View>
                  <View style={styles.categoryBar}>
                    <View 
                      style={[
                        styles.categoryProgress, 
                        { 
                          backgroundColor: category.color,
                          width: `${category.percentage}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Recent Invoices */}
        <View style={styles.invoicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Invoices</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllInvoices')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentInvoices.map(renderInvoiceCard)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Card style={styles.quickActionsCard}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('CreateInvoice')}
              >
                <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Create Invoice</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('RecordExpense')}
              >
                <Ionicons name="card-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Record Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('FinancialReports')}
              >
                <Ionicons name="bar-chart-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('BankReconciliation')}
              >
                <Ionicons name="sync-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Reconciliation</Text>
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
  overviewSection: {
    marginBottom: SPACING.lg,
  },
  overviewGradient: {
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  overviewLabel: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: SPACING.xs,
  },
  overviewAmount: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  overviewGrowth: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  expenseSection: {
    marginBottom: SPACING.lg,
  },
  expenseCard: {
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
  expenseCategories: {
    marginTop: SPACING.md,
  },
  expenseCategory: {
    marginBottom: SPACING.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  categoryName: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  categoryAmount: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  categoryBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  categoryProgress: {
    height: '100%',
    borderRadius: 3,
  },
  categoryPercentage: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  invoicesSection: {
    marginBottom: SPACING.lg,
  },
  invoiceCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceId: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  invoiceCustomer: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  invoiceStatus: {
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
  invoiceDetails: {
    marginBottom: SPACING.md,
  },
  invoiceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  invoiceDetailText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  invoiceActions: {
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

export default FinanceDashboardScreen; 