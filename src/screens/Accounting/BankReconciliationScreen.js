import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";
import { reconcileBank } from "./accountingApi";

const BankReconciliationScreen = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState("main-account");
  const [reconciliationDate, setReconciliationDate] = useState("2024-01-15");
  const [bankBalance, setBankBalance] = useState("125,680.50");
  const [bookBalance, setBookBalance] = useState("123,450.75");
  const [difference, setDifference] = useState("2,229.75");

  const bankAccounts = [
    { id: "main-account", name: "Main Business Account", number: "****1234" },
    { id: "savings-account", name: "Savings Account", number: "****5678" },
    { id: "payroll-account", name: "Payroll Account", number: "****9012" },
  ];

  const bankTransactions = [
    {
      id: "BT001",
      date: "2024-01-15",
      description: "Deposit - Customer Payment",
      amount: 15000.0,
      type: "credit",
      status: "unreconciled",
      reference: "INV-2024-001",
    },
    {
      id: "BT002",
      date: "2024-01-14",
      description: "Withdrawal - Office Rent",
      amount: -8500.0,
      type: "debit",
      status: "unreconciled",
      reference: "EXP-2024-001",
    },
    {
      id: "BT003",
      date: "2024-01-13",
      description: "Deposit - Consulting Fee",
      amount: 12000.0,
      type: "credit",
      status: "reconciled",
      reference: "INV-2024-002",
    },
    {
      id: "BT004",
      date: "2024-01-12",
      description: "Withdrawal - Utility Bills",
      amount: -3200.0,
      type: "debit",
      status: "reconciled",
      reference: "EXP-2024-002",
    },
    {
      id: "BT005",
      date: "2024-01-11",
      description: "Bank Fee - Monthly Service",
      amount: -25.0,
      type: "debit",
      status: "unreconciled",
      reference: "BANK-FEE-001",
    },
  ];

  const bookTransactions = [
    {
      id: "BK001",
      date: "2024-01-15",
      description: "Customer Payment - ABC Corp",
      amount: 15000.0,
      type: "credit",
      status: "unreconciled",
      reference: "INV-2024-001",
    },
    {
      id: "BK002",
      date: "2024-01-14",
      description: "Office Rent Payment",
      amount: -8500.0,
      type: "debit",
      status: "unreconciled",
      reference: "EXP-2024-001",
    },
    {
      id: "BK003",
      date: "2024-01-13",
      description: "Consulting Services - XYZ Ltd",
      amount: 12000.0,
      type: "credit",
      status: "reconciled",
      reference: "INV-2024-002",
    },
    {
      id: "BK004",
      date: "2024-01-12",
      description: "Utility Bills Payment",
      amount: -3200.0,
      type: "debit",
      status: "reconciled",
      reference: "EXP-2024-002",
    },
    {
      id: "BK005",
      date: "2024-01-10",
      description: "Equipment Purchase",
      amount: -2500.0,
      type: "debit",
      status: "unreconciled",
      reference: "EXP-2024-003",
    },
  ];

  const reconciliationSummary = {
    bankBalance: 125680.5,
    bookBalance: 123450.75,
    outstandingDeposits: 15000.0,
    outstandingChecks: 2500.0,
    bankFees: 25.0,
    adjustedBankBalance: 123450.75,
    adjustedBookBalance: 123450.75,
    difference: 0.0,
  };

  const handleReconcile = async () => {
    try {
      await reconcileBank({
        account: selectedAccount,
        date: reconciliationDate,
      });
      Alert.alert(
        "Reconciliation Complete",
        "Bank reconciliation has been completed successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert("Error", "Failed to complete reconciliation.");
    }
  };

  const renderAccountSelector = () => (
    <Card style={styles.sectionCard}>
      <Text className="font-bold text-lg text-textPrimary mb-md">
        Select Bank Account
      </Text>
      <View className="gap-sm">
        {bankAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            className={`flex-row justify-between items-center p-md border border-border rounded-sm bg-white 
            ${
              selectedAccount === account.id
                ? "border-primary bg-lightGray"
                : ""
            }`}
            onPress={() => setSelectedAccount(account.id)}
          >
            <View className="flex-1">
              <Text className="font-medium text-md text-textPrimary mb-xs">
                {account.name}
              </Text>
              <Text className="font-regular text-sm text-textSecondary">
                {account.number}
              </Text>
            </View>
            {selectedAccount === account.id && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.primary}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderBalanceSummary = () => (
    <Card style={styles.sectionCard} className="mb-lg p-lg">
      <Text className="font-bold text-lg text-textPrimary mb-md">
        Balance Summary
      </Text>

      {/* Bank Statement Balance */}
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-md text-textSecondary">
          Bank Statement Balance:
        </Text>
        <Text className="text-md font-medium text-textPrimary">
          ${reconciliationSummary.bankBalance.toLocaleString()}
        </Text>
      </View>

      {/* Book Balance */}
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-md text-textSecondary">Book Balance:</Text>
        <Text className="text-md font-medium text-textPrimary">
          ${reconciliationSummary.bookBalance.toLocaleString()}
        </Text>
      </View>

      {/* Outstanding Deposits */}
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-md text-textSecondary">
          Outstanding Deposits:
        </Text>
        <Text className="text-md font-medium text-success">
          +${reconciliationSummary.outstandingDeposits.toLocaleString()}
        </Text>
      </View>

      {/* Outstanding Checks */}
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-md text-textSecondary">Outstanding Checks:</Text>
        <Text className="text-md font-medium text-error">
          -${reconciliationSummary.outstandingChecks.toLocaleString()}
        </Text>
      </View>

      {/* Bank Fees */}
      <View className="flex-row justify-between items-center mb-sm">
        <Text className="text-md text-textSecondary">Bank Fees:</Text>
        <Text className="text-md font-medium text-error">
          -${reconciliationSummary.bankFees.toLocaleString()}
        </Text>
      </View>

      {/* Adjusted Bank Balance */}
      <View className="flex-row justify-between items-center border-t border-border pt-sm mt-sm">
        <Text className="font-bold text-md text-textPrimary">
          Adjusted Bank Balance:
        </Text>
        <Text className="font-bold text-md text-textPrimary">
          ${reconciliationSummary.adjustedBankBalance.toLocaleString()}
        </Text>
      </View>

      {/* Adjusted Book Balance */}
      <View className="flex-row justify-between items-center border-t border-border pt-sm mt-sm">
        <Text className="font-bold text-md text-textPrimary">
          Adjusted Book Balance:
        </Text>
        <Text className="font-bold text-md text-textPrimary">
          ${reconciliationSummary.adjustedBookBalance.toLocaleString()}
        </Text>
      </View>

      {/* Difference */}
      <View className="flex-row justify-between items-center border-t border-border pt-sm mt-sm">
        <Text className="font-bold text-md text-textPrimary">Difference:</Text>
        <Text
          className={`font-bold text-md ${
            reconciliationSummary.difference === 0
              ? "text-success"
              : "text-error"
          }`}
        >
          ${reconciliationSummary.difference.toLocaleString()}
        </Text>
      </View>
    </Card>
  );

  const renderTransactionList = (title, transactions, type) => (
    <Card style={styles.sectionCard}>
      <Text className="font-bold text-lg text-textPrimary mb-md">{title}</Text>

      {transactions.map((transaction) => (
        <View
          key={transaction.id}
          className="border border-border p-md rounded-sm mb-md"
        >
          {/* Transaction Header */}
          <View className="flex-row justify-between items-start">
            {/* Transaction Info */}
            <View className="flex-1 gap-1">
              <Text className="text-md font-medium text-textPrimary">
                {transaction.description}
              </Text>
              <Text className="text-sm text-textSecondary">
                {transaction.date}
              </Text>
              <Text className="text-sm text-textSecondary">
                {transaction.reference}
              </Text>
            </View>

            {/* Amount & Status */}
            <View className="items-end">
              <Text
                className={`text-md mb-xs font-bold ${
                  transaction.type === "credit" ? "text-success" : "text-error"
                }`}
              >
                {transaction.type === "credit" ? "+" : ""}$
                {transaction.amount.toLocaleString()}
              </Text>
              <View
                className={`px-sm py-xs rounded-full ${
                  transaction.status === "reconciled"
                    ? "bg-success"
                    : "bg-warning"
                }`}
              >
                <Text className="text-white text-xs capitalize">
                  {transaction.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Actions for unreconciled */}
          {transaction.status === "unreconciled" && (
            <View className="flex-row justify-between mt-sm">
              <TouchableOpacity className="flex-row items-center space-x-xs">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={COLORS.success}
                />
                <Text className="text-sm text-textPrimary">
                  Mark Reconciled
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center space-x-xs">
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <Text className="text-sm text-textPrimary">Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Bank Reconciliation"
        subtitle="Match bank transactions with book entries"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="refresh-outline"
        onRightPress={() =>
          Alert.alert("Refresh", "Refreshing reconciliation data...")
        }
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {renderAccountSelector()}

        <Card style={styles.sectionCard} className="mb-lg p-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Reconciliation Date
          </Text>
          <TextInput
            className="border border-border rounded-radius p-sm text-md text-textPrimary bg-white"
            value={reconciliationDate}
            onChangeText={setReconciliationDate}
            placeholder="YYYY-MM-DD"
          />
        </Card>

        {renderBalanceSummary()}

        {renderTransactionList("Bank Transactions", bankTransactions, "bank")}
        {renderTransactionList("Book Transactions", bookTransactions, "book")}

        {/* Action Buttons */}
        <View className="flex-row justify-between gap-md mb-xl">
          <Button
            title="Auto Match"
            onPress={() =>
              Alert.alert("Auto Match", "Auto-matching transactions...")
            }
            textStyle={styles.textInButton}
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
  sectionCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  textInButton : {
    color : COLORS.textPrimary,
    ...FONTS
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
