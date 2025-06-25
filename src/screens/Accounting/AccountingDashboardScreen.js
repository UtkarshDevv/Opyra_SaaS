import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';
import { getInvoices } from './accountingApi';

const { width } = Dimensions.get('window');

const AccountingDashboardScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then(data => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load invoices from backend. Showing demo data.');
        setInvoices([]); // fallback to demo data if needed
        setLoading(false);
      });
  }, []);

  // Financial Data in Indian Rupees
  const financialData = {
    totalRevenue: '₹1,24,56,800',
    totalExpenses: '₹78,94,200',
    netProfit: '₹45,62,600',
    outstandingInvoices: '₹13,24,500',
    overdueInvoices: '₹2,89,200',
    monthlyGrowth: '+15.5%',
    cashFlow: '+₹1,45,23,000',
    accountsReceivable: '₹89,34,000',
    accountsPayable: '₹67,89,000',
    gstPayable: '₹12,45,600',
    gstReceivable: '₹8,90,400'
  };

  // Chart Data (simplified for demo)
  const revenueData = [
    { month: 'Jan', revenue: 850000, expenses: 650000 },
    { month: 'Feb', revenue: 920000, expenses: 680000 },
    { month: 'Mar', revenue: 880000, expenses: 720000 },
    { month: 'Apr', revenue: 950000, expenses: 750000 },
    { month: 'May', revenue: 1020000, expenses: 780000 },
    { month: 'Jun', revenue: 1080000, expenses: 820000 },
  ];

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'income',
      amount: '₹1,50,000',
      description: 'Software Development Services',
      date: '2024-01-15',
      status: 'completed',
      category: 'Services',
      gstAmount: '₹27,000'
    },
    {
      id: 'TXN-002',
      type: 'expense',
      amount: '-₹85,000',
      description: 'Office Rent Payment',
      date: '2024-01-14',
      status: 'completed',
      category: 'Rent',
      gstAmount: '₹15,300'
    },
    {
      id: 'TXN-003',
      type: 'income',
      amount: '₹1,20,000',
      description: 'Consulting Services',
      date: '2024-01-13',
      status: 'pending',
      category: 'Services',
      gstAmount: '₹21,600'
    },
    {
      id: 'TXN-004',
      type: 'expense',
      amount: '-₹32,000',
      description: 'Utility Bills',
      date: '2024-01-12',
      status: 'completed',
      category: 'Utilities',
      gstAmount: '₹5,760'
    }
  ];

  const expenseCategories = [
    { name: 'Salaries', amount: '₹24,50,000', percentage: 31, color: '#714B67' },
    { name: 'Office Rent', amount: '₹7,20,000', percentage: 9, color: '#00A09D' },
    { name: 'Utilities', amount: '₹4,85,000', percentage: 6, color: '#FF6B35' },
    { name: 'Marketing', amount: '₹6,72,000', percentage: 9, color: '#28A745' },
    { name: 'Software', amount: '₹5,67,200', percentage: 7, color: '#17A2B8' },
    { name: 'Other', amount: '₹30,00,000', percentage: 38, color: '#6C757D' }
  ];

  const gstSummary = {
    cgst: '₹6,22,800',
    sgst: '₹6,22,800',
    igst: '₹0',
    totalGst: '₹12,45,600',
    gstInput: '₹8,90,400',
    gstOutput: '₹12,45,600',
    netGst: '₹3,55,200'
  };

  const renderFinancialCard = (title, value, subtitle, color, icon) => (
    <Card style={styles.financialCard}>
      <View style={styles.financialCardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color={COLORS.white} />
        </View>
        <View style={styles.financialCardContent}>
          <Text style={styles.financialCardTitle}>{title}</Text>
          <Text style={styles.financialCardValue}>{value}</Text>
          <Text style={styles.financialCardSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </Card>
  );

  const renderTransactionCard = (transaction) => (
    <Card key={transaction.id} style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
          <Text style={styles.transactionCategory}>{transaction.category}</Text>
          <Text style={styles.gstInfo}>GST: {transaction.gstAmount}</Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.transactionAmountText,
            { color: transaction.type === 'income' ? COLORS.success : COLORS.error }
          ]}>
            {transaction.amount}
          </Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: transaction.status === 'completed' ? COLORS.success : COLORS.warning }
          ]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
        <Text style={styles.transactionId}>{transaction.id}</Text>
      </View>
    </Card>
  );

  const renderExpenseCategory = (category, index) => (
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
  );

  const renderChartBar = (data, index) => {
    const maxValue = Math.max(...revenueData.map(d => d.revenue));
    const revenueHeight = (data.revenue / maxValue) * 100;
    const expenseHeight = (data.expenses / maxValue) * 100;

    return (
      <View key={index} style={styles.chartBar}>
        <View style={styles.chartBarContainer}>
          <View style={[styles.revenueBar, { height: `${revenueHeight}%` }]} />
          <View style={[styles.expenseBar, { height: `${expenseHeight}%` }]} />
        </View>
        <Text style={styles.chartLabel}>{data.month}</Text>
      </View>
    );
  };

  const renderGSTSummary = () => (
    <Card style={styles.gstCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>GST Summary</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GSTReport')}>
          <Text style={styles.viewAllText}>View Details</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.gstGrid}>
        <View style={styles.gstItem}>
          <Text style={styles.gstLabel}>CGST</Text>
          <Text style={styles.gstAmount}>{gstSummary.cgst}</Text>
        </View>
        <View style={styles.gstItem}>
          <Text style={styles.gstLabel}>SGST</Text>
          <Text style={styles.gstAmount}>{gstSummary.sgst}</Text>
        </View>
        <View style={styles.gstItem}>
          <Text style={styles.gstLabel}>IGST</Text>
          <Text style={styles.gstAmount}>{gstSummary.igst}</Text>
        </View>
        <View style={styles.gstItem}>
          <Text style={styles.gstLabel}>Total GST</Text>
          <Text style={styles.gstAmount}>{gstSummary.totalGst}</Text>
        </View>
      </View>
      
      <View style={styles.gstNetSection}>
        <View style={styles.gstNetRow}>
          <Text style={styles.gstNetLabel}>GST Input Credit:</Text>
          <Text style={styles.gstNetAmount}>{gstSummary.gstInput}</Text>
        </View>
        <View style={styles.gstNetRow}>
          <Text style={styles.gstNetLabel}>GST Output Tax:</Text>
          <Text style={styles.gstNetAmount}>{gstSummary.gstOutput}</Text>
        </View>
        <View style={[styles.gstNetRow, styles.gstNetTotalRow]}>
          <Text style={styles.gstNetTotalLabel}>Net GST Payable:</Text>
          <Text style={styles.gstNetTotalAmount}>{gstSummary.netGst}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Accounting Dashboard"
        subtitle="Indian Financial Management & GST Analytics"
        leftIcon="menu-outline"
        onLeftPress={() => navigation.openDrawer()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate('CreateTransaction')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'quarter' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('quarter')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'quarter' && styles.periodButtonTextActive]}>
              Quarter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'year' && styles.periodButtonTextActive]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Financial Overview */}
        <View style={styles.financialOverview}>
          <LinearGradient
            colors={['#00A09D', '#33B3B0']}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.overviewGrid}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Total Revenue</Text>
                <Text style={styles.overviewAmount}>{financialData.totalRevenue}</Text>
                <Text style={styles.overviewGrowth}>{financialData.monthlyGrowth}</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Net Profit</Text>
                <Text style={styles.overviewAmount}>{financialData.netProfit}</Text>
                <Text style={styles.overviewGrowth}>+18.2%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Cash Flow</Text>
                <Text style={styles.overviewAmount}>{financialData.cashFlow}</Text>
                <Text style={styles.overviewGrowth}>+25.1%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Outstanding</Text>
                <Text style={styles.overviewAmount}>{financialData.outstandingInvoices}</Text>
                <Text style={styles.overviewGrowth}>-5.2%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Financial Cards */}
        <View style={styles.financialCards}>
          <View style={styles.financialCardsRow}>
            {renderFinancialCard(
              'Accounts Receivable',
              financialData.accountsReceivable,
              'Money owed to you',
              COLORS.success,
              'arrow-up-circle-outline'
            )}
            {renderFinancialCard(
              'Accounts Payable',
              financialData.accountsPayable,
              'Money you owe',
              COLORS.error,
              'arrow-down-circle-outline'
            )}
          </View>
          <View style={styles.financialCardsRow}>
            {renderFinancialCard(
              'GST Receivable',
              financialData.gstReceivable,
              'GST Input Credit',
              '#28A745',
              'receipt-outline'
            )}
            {renderFinancialCard(
              'GST Payable',
              financialData.gstPayable,
              'GST Output Tax',
              '#DC3545',
              'card-outline'
            )}
          </View>
        </View>

        {/* GST Summary */}
        {renderGSTSummary()}

        {/* Revenue vs Expenses Chart */}
        <View style={styles.chartSection}>
          <Card style={styles.chartCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Revenue vs Expenses</Text>
              <TouchableOpacity onPress={() => navigation.navigate('DetailedReports')}>
                <Text style={styles.viewAllText}>View Details</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.chartContainer}>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: COLORS.success }]} />
                  <Text style={styles.legendText}>Revenue</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: COLORS.error }]} />
                  <Text style={styles.legendText}>Expenses</Text>
                </View>
              </View>
              
              <View style={styles.chartBars}>
                {revenueData.map(renderChartBar)}
              </View>
            </View>
          </Card>
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
              {expenseCategories.map(renderExpenseCategory)}
            </View>
          </Card>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllTransactions')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map(renderTransactionCard)}
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
                onPress={() => navigation.navigate('BankReconciliation')}
              >
                <Ionicons name="sync-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>Bank Reconciliation</Text>
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
                onPress={() => navigation.navigate('GSTReport')}
              >
                <Ionicons name="receipt-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>GST Report</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickAction}
                onPress={() => navigation.navigate('TDSReport')}
              >
                <Ionicons name="document-text-outline" size={24} color={COLORS.primary} />
                <Text style={styles.quickActionText}>TDS Report</Text>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.xs,
    marginBottom: SPACING.lg,
    ...SIZES.shadow,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  periodButtonTextActive: {
    color: COLORS.white,
  },
  financialOverview: {
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
  financialCards: {
    marginBottom: SPACING.lg,
  },
  financialCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  financialCard: {
    width: '48%',
    padding: SPACING.md,
  },
  financialCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  financialCardContent: {
    flex: 1,
  },
  financialCardTitle: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  financialCardValue: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  financialCardSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  gstCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  gstGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  gstItem: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
  },
  gstLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  gstAmount: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  gstNetSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  gstNetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  gstNetLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  gstNetAmount: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  gstNetTotalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  gstNetTotalLabel: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  gstNetTotalAmount: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.primary,
  },
  chartSection: {
    marginBottom: SPACING.lg,
  },
  chartCard: {
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
  chartContainer: {
    marginTop: SPACING.md,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  legendText: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: SPACING.sm,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: SPACING.xs,
  },
  revenueBar: {
    width: 8,
    backgroundColor: COLORS.success,
    marginRight: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  expenseBar: {
    width: 8,
    backgroundColor: COLORS.error,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  expenseSection: {
    marginBottom: SPACING.lg,
  },
  expenseCard: {
    padding: SPACING.lg,
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
  transactionsSection: {
    marginBottom: SPACING.lg,
  },
  transactionCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  transactionCategory: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  gstInfo: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    marginBottom: SPACING.xs,
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
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  transactionId: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
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

export default AccountingDashboardScreen; 