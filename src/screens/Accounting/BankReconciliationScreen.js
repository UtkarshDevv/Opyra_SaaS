import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';
import { reconcileBank } from './accountingApi';

const BankReconciliationScreen = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState('main-account');
  const [reconciliationDate, setReconciliationDate] = useState('2024-01-15');
  const [bankBalance, setBankBalance] = useState('125,680.50');
  const [bookBalance, setBookBalance] = useState('123,450.75');
  const [difference, setDifference] = useState('2,229.75');

  const bankAccounts = [
    { id: 'main-account', name: 'Main Business Account', number: '****1234' },
    { id: 'savings-account', name: 'Savings Account', number: '****5678' },
    { id: 'payroll-account', name: 'Payroll Account', number: '****9012' }
  ];

  const bankTransactions = [
    {
      id: 'BT001',
      date: '2024-01-15',
      description: 'Deposit - Customer Payment',
      amount: 15000.00,
      type: 'credit',
      status: 'unreconciled',
      reference: 'INV-2024-001'
    },
    {
      id: 'BT002',
      date: '2024-01-14',
      description: 'Withdrawal - Office Rent',
      amount: -8500.00,
      type: 'debit',
      status: 'unreconciled',
      reference: 'EXP-2024-001'
    },
    {
      id: 'BT003',
      date: '2024-01-13',
      description: 'Deposit - Consulting Fee',
      amount: 12000.00,
      type: 'credit',
      status: 'reconciled',
      reference: 'INV-2024-002'
    },
    {
      id: 'BT004',
      date: '2024-01-12',
      description: 'Withdrawal - Utility Bills',
      amount: -3200.00,
      type: 'debit',
      status: 'reconciled',
      reference: 'EXP-2024-002'
    },
    {
      id: 'BT005',
      date: '2024-01-11',
      description: 'Bank Fee - Monthly Service',
      amount: -25.00,
      type: 'debit',
      status: 'unreconciled',
      reference: 'BANK-FEE-001'
    }
  ];

  const bookTransactions = [
    {
      id: 'BK001',
      date: '2024-01-15',
      description: 'Customer Payment - ABC Corp',
      amount: 15000.00,
      type: 'credit',
      status: 'unreconciled',
      reference: 'INV-2024-001'
    },
    {
      id: 'BK002',
      date: '2024-01-14',
      description: 'Office Rent Payment',
      amount: -8500.00,
      type: 'debit',
      status: 'unreconciled',
      reference: 'EXP-2024-001'
    },
    {
      id: 'BK003',
      date: '2024-01-13',
      description: 'Consulting Services - XYZ Ltd',
      amount: 12000.00,
      type: 'credit',
      status: 'reconciled',
      reference: 'INV-2024-002'
    },
    {
      id: 'BK004',
      date: '2024-01-12',
      description: 'Utility Bills Payment',
      amount: -3200.00,
      type: 'debit',
      status: 'reconciled',
      reference: 'EXP-2024-002'
    },
    {
      id: 'BK005',
      date: '2024-01-10',
      description: 'Equipment Purchase',
      amount: -2500.00,
      type: 'debit',
      status: 'unreconciled',
      reference: 'EXP-2024-003'
    }
  ];

  const reconciliationSummary = {
    bankBalance: 125680.50,
    bookBalance: 123450.75,
    outstandingDeposits: 15000.00,
    outstandingChecks: 2500.00,
    bankFees: 25.00,
    adjustedBankBalance: 123450.75,
    adjustedBookBalance: 123450.75,
    difference: 0.00
  };

  const handleReconcile = async () => {
    try {
      await reconcileBank({ account: selectedAccount, date: reconciliationDate });
      Alert.alert(
        'Reconciliation Complete',
        'Bank reconciliation has been completed successfully!',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to complete reconciliation.');
    }
  };

  const renderAccountSelector = () => (
    <Card style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Select Bank Account</Text>
      <View style={styles.accountSelector}>
        {bankAccounts.map(account => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.accountOption,
              selectedAccount === account.id && styles.selectedAccount
            ]}
            onPress={() => setSelectedAccount(account.id)}
          >
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountNumber}>{account.number}</Text>
            </View>
            {selectedAccount === account.id && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderBalanceSummary = () => (
    <Card style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Balance Summary</Text>
      
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Bank Statement Balance:</Text>
        <Text style={styles.balanceAmount}>${reconciliationSummary.bankBalance.toLocaleString()}</Text>
      </View>
      
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Book Balance:</Text>
        <Text style={styles.balanceAmount}>${reconciliationSummary.bookBalance.toLocaleString()}</Text>
      </View>
      
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Outstanding Deposits:</Text>
        <Text style={[styles.balanceAmount, styles.positiveAmount]}>
          +${reconciliationSummary.outstandingDeposits.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Outstanding Checks:</Text>
        <Text style={[styles.balanceAmount, styles.negativeAmount]}>
          -${reconciliationSummary.outstandingChecks.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Bank Fees:</Text>
        <Text style={[styles.balanceAmount, styles.negativeAmount]}>
          -${reconciliationSummary.bankFees.toLocaleString()}
        </Text>
      </View>
      
      <View style={[styles.balanceRow, styles.adjustedBalanceRow]}>
        <Text style={styles.adjustedBalanceLabel}>Adjusted Bank Balance:</Text>
        <Text style={styles.adjustedBalanceAmount}>
          ${reconciliationSummary.adjustedBankBalance.toLocaleString()}
        </Text>
      </View>
      
      <View style={[styles.balanceRow, styles.adjustedBalanceRow]}>
        <Text style={styles.adjustedBalanceLabel}>Adjusted Book Balance:</Text>
        <Text style={styles.adjustedBalanceAmount}>
          ${reconciliationSummary.adjustedBookBalance.toLocaleString()}
        </Text>
      </View>
      
      <View style={[styles.balanceRow, styles.differenceRow]}>
        <Text style={styles.differenceLabel}>Difference:</Text>
        <Text style={[
          styles.differenceAmount,
          reconciliationSummary.difference === 0 ? styles.balancedAmount : styles.unbalancedAmount
        ]}>
          ${reconciliationSummary.difference.toLocaleString()}
        </Text>
      </View>
    </Card>
  );

  const renderTransactionList = (title, transactions, type) => (
    <Card style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      {transactions.map(transaction => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionHeader}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionReference}>{transaction.reference}</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={[
                styles.transactionAmountText,
                transaction.type === 'credit' ? styles.positiveAmount : styles.negativeAmount
              ]}>
                {transaction.type === 'credit' ? '+' : ''}${transaction.amount.toLocaleString()}
              </Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: transaction.status === 'reconciled' ? COLORS.success : COLORS.warning }
              ]}>
                <Text style={styles.statusText}>{transaction.status}</Text>
              </View>
            </View>
          </View>
          
          {transaction.status === 'unreconciled' && (
            <View style={styles.transactionActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
                <Text style={styles.actionButtonText}>Mark Reconciled</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Bank Reconciliation"
        subtitle="Match bank transactions with book entries"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="refresh-outline"
        onRightPress={() => Alert.alert('Refresh', 'Refreshing reconciliation data...')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderAccountSelector()}
        
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reconciliation Date</Text>
          <TextInput
            style={styles.dateInput}
            value={reconciliationDate}
            onChangeText={setReconciliationDate}
            placeholder="YYYY-MM-DD"
          />
        </Card>

        {renderBalanceSummary()}
        
        {renderTransactionList('Bank Transactions', bankTransactions, 'bank')}
        {renderTransactionList('Book Transactions', bookTransactions, 'book')}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button 
            title="Auto Match" 
            onPress={() => Alert.alert('Auto Match', 'Auto-matching transactions...')}
            style={styles.autoMatchButton}
          />
          <Button 
            title="Complete Reconciliation" 
            onPress={handleReconcile}
            style={styles.reconcileButton}
          />
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
  sectionCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  accountSelector: {
    gap: SPACING.sm,
  },
  accountOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  selectedAccount: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  accountNumber: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  balanceLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  balanceAmount: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  positiveAmount: {
    color: COLORS.success,
  },
  negativeAmount: {
    color: COLORS.error,
  },
  adjustedBalanceRow: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  adjustedBalanceLabel: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  adjustedBalanceAmount: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  differenceRow: {
    borderBottomWidth: 0,
    paddingTop: SPACING.sm,
  },
  differenceLabel: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
  },
  differenceAmount: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
  },
  balancedAmount: {
    color: COLORS.success,
  },
  unbalancedAmount: {
    color: COLORS.error,
  },
  transactionItem: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  transactionDate: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  transactionReference: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.primary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    ...FONTS.bold,
    fontSize: SIZES.md,
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
  transactionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  autoMatchButton: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  reconcileButton: {
    flex: 1,
  },
});

export default BankReconciliationScreen; 