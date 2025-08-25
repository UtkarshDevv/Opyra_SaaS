import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";
import { getInvoices } from "./accountingApi";

const { width } = Dimensions.get("window");

const AccountingDashboardScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInvoices()
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load invoices from backend. Showing demo data.");
        setInvoices([]); // fallback to demo data if needed
        setLoading(false);
      });
  }, []);

  // Financial Data in Indian Rupees
  const financialData = {
    totalRevenue: "₹1,24,56,800",
    totalExpenses: "₹78,94,200",
    netProfit: "₹45,62,600",
    outstandingInvoices: "₹13,24,500",
    overdueInvoices: "₹2,89,200",
    monthlyGrowth: "+15.5%",
    cashFlow: "+₹1,45,23,000",
    accountsReceivable: "₹89,34,000",
    accountsPayable: "₹67,89,000",
    gstPayable: "₹12,45,600",
    gstReceivable: "₹8,90,400",
  };

  // Chart Data (simplified for demo)
  const revenueData = [
    { month: "Jan", revenue: 850000, expenses: 650000 },
    { month: "Feb", revenue: 920000, expenses: 680000 },
    { month: "Mar", revenue: 880000, expenses: 720000 },
    { month: "Apr", revenue: 950000, expenses: 750000 },
    { month: "May", revenue: 1020000, expenses: 780000 },
    { month: "Jun", revenue: 1080000, expenses: 820000 },
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      type: "income",
      amount: "₹1,50,000",
      description: "Software Development Services",
      date: "2024-01-15",
      status: "completed",
      category: "Services",
      gstAmount: "₹27,000",
    },
    {
      id: "TXN-002",
      type: "expense",
      amount: "-₹85,000",
      description: "Office Rent Payment",
      date: "2024-01-14",
      status: "completed",
      category: "Rent",
      gstAmount: "₹15,300",
    },
    {
      id: "TXN-003",
      type: "income",
      amount: "₹1,20,000",
      description: "Consulting Services",
      date: "2024-01-13",
      status: "pending",
      category: "Services",
      gstAmount: "₹21,600",
    },
    {
      id: "TXN-004",
      type: "expense",
      amount: "-₹32,000",
      description: "Utility Bills",
      date: "2024-01-12",
      status: "completed",
      category: "Utilities",
      gstAmount: "₹5,760",
    },
  ];

  const expenseCategories = [
    {
      name: "Salaries",
      amount: "₹24,50,000",
      percentage: 31,
      color: "#714B67",
    },
    {
      name: "Office Rent",
      amount: "₹7,20,000",
      percentage: 9,
      color: "#00A09D",
    },
    { name: "Utilities", amount: "₹4,85,000", percentage: 6, color: "#FF6B35" },
    { name: "Marketing", amount: "₹6,72,000", percentage: 9, color: "#28A745" },
    { name: "Software", amount: "₹5,67,200", percentage: 7, color: "#17A2B8" },
    { name: "Other", amount: "₹30,00,000", percentage: 38, color: "#6C757D" },
  ];

  const gstSummary = {
    cgst: "₹6,22,800",
    sgst: "₹6,22,800",
    igst: "₹0",
    totalGst: "₹12,45,600",
    gstInput: "₹8,90,400",
    gstOutput: "₹12,45,600",
    netGst: "₹3,55,200",
  };

  const renderFinancialCard = (title, value, subtitle, color, icon) => (
    <Card style={styles.financialCard}>
      <View className="flex-row items-center">
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color={COLORS.white} />
        </View>
        <View className="flex-1">
          <Text className="font-medium text-sm text-textSecondary mb-xs">
            {title}
          </Text>
          <Text className="font-bold text-md text-textPrimary mb-xs">
            {value}
          </Text>
          <Text className="font-regular text-xs text-textSecondary">
            {subtitle}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderTransactionCard = (transaction) => (
    <Card key={transaction.id} className="mb-md p-lg">
      <View className="flex-row justify-between items-center mb-sm">
        <View className="flex-1">
          <Text className="font-medium text-md text-textPrimary mb-xs">
            {transaction.description}
          </Text>
          <Text className="font-regular text-sm text-textSecondary mb-xs">
            {transaction.category}
          </Text>
          <Text className="font-medium text-xs text-primary">
            GST: {transaction.gstAmount}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="font-bold text-lg mb-xs"
            style={[
              {
                color:
                  transaction.type === "income" ? COLORS.success : COLORS.error,
              },
            ]}
          >
            {transaction.amount}
          </Text>
          <View
            className="px-sm py-xs rounded-sm"
            style={[
              {
                backgroundColor:
                  transaction.status === "completed"
                    ? COLORS.success
                    : COLORS.warning,
              },
            ]}
          >
            <Text className="font-medium text-xs text-white">
              {transaction.status}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="font-regular text-xs text-textSecondary">
          {transaction.date}
        </Text>
        <Text className="font-medium text-xs text-primary">
          {transaction.id}
        </Text>
      </View>
    </Card>
  );

  const renderExpenseCategory = (category, index) => (
    <View key={index} className="mb-sm">
      <View className="flex-row items-center mb-xs">
        <View
          className="w-[12] h-[12] rounded-[6] mr-sm"
          style={[{ backgroundColor: category.color }]}
        />
        <Text className="flex-1 font-medium text-sm text-textPrimary">
          {category.name}
        </Text>
        <Text className="font-bold text-sm text-textPrimary">
          {category.amount}
        </Text>
      </View>
      <View className="h-[6] bg-lightGray rounded-[3] overflow-hidden mb-xs">
        <View
          className="h-[100%] rounded-[3]"
          style={[
            {
              backgroundColor: category.color,
              width: `${category.percentage}%`,
            },
          ]}
        />
      </View>
      <Text className="font-regular text-xs text-textSecondary text-right">
        {category.percentage}%
      </Text>
    </View>
  );

  const renderChartBar = (data, index) => {
    const maxValue = Math.max(...revenueData.map((d) => d.revenue));
    const revenueHeight = (data.revenue / maxValue) * 100;
    const expenseHeight = (data.expenses / maxValue) * 100;

    return (
      <View key={index} className="flex-1 items-center">
        <View className="flex-row items-end h-[80] mb-xs">
          <View
            className="w-[8] bg-success rounded-tr-[4] rounded-tl-[4] mr-[2]"
            style={[{ height: `${revenueHeight}%` }]}
          />
          <View
            className="w-[8] bg-error rounded-tr-[4] rounded-tl-[4]"
            style={[{ height: `${expenseHeight}%` }]}
          />
        </View>
        <Text className="font-regular text-xs text-textSecondary">
          {data.month}
        </Text>
      </View>
    );
  };

  const renderGSTSummary = () => (
    <Card style={styles.gstCard}>
      <View className="flex-row justify-between items-center mb-md">
        <Text className="font-bold text-lg text-textPrimary">GST Summary</Text>
        <TouchableOpacity onPress={() => navigation.navigate("GSTReport")}>
          <Text className="font-medium text-sm text-primary">View Details</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-between mb-md">
        <View className="w-[48%] items-center p-sm bg-lightGray rounded-sm mb-sm">
          <Text className="font-medium text-sm text-textPrimary mb-xs">
            CGST
          </Text>
          <Text className="font-bold text-md text-textPrimary">
            {gstSummary.cgst}
          </Text>
        </View>
        <View className="w-[48%] items-center p-sm bg-lightGray rounded-sm mb-sm">
          <Text className="font-medium text-sm text-textPrimary mb-xs">
            SGST
          </Text>
          <Text className="font-bold text-md text-textPrimary">
            {gstSummary.sgst}
          </Text>
        </View>
        <View className="w-[48%] items-center p-sm bg-lightGray rounded-sm mb-sm">
          <Text className="font-medium text-sm text-textPrimary mb-xs">
            IGST
          </Text>
          <Text className="font-bold text-md text-textPrimary">
            {gstSummary.igst}
          </Text>
        </View>
        <View className="w-[48%] items-center p-sm bg-lightGray rounded-sm mb-sm">
          <Text className="font-medium text-sm text-textPrimary mb-xs">
            Total GST
          </Text>
          <Text className="font-bold text-md text-textPrimary">
            {gstSummary.totalGst}
          </Text>
        </View>
      </View>

      <View className="border-t-0 border-t-border pt-md">
        <View className="flex-row justify-between items-center mb-sm">
          <Text className="font-medium text-sm text-textPrimary">
            GST Input Credit:
          </Text>
          <Text className="font-bold text-sm text-textPrimary">
            {gstSummary.gstInput}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mb-sm">
          <Text className="font-medium text-sm text-textPrimary">
            GST Output Tax:
          </Text>
          <Text className="font-bold text-sm text-textPrimary">
            {gstSummary.gstOutput}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mb-sm border-t border-t-border pt-sm">
          <Text className="font-bold text-md text-textPrimary">
            Net GST Payable:
          </Text>
          <Text className="font-bold text-primary text-md">
            {gstSummary.netGst}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Accounting Dashboard"
        subtitle="Indian Financial Management & GST Analytics"
        leftIcon="menu-outline"
        onLeftPress={() => navigation.openDrawer()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate("CreateTransaction")}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "week" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("week")}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === "week" && styles.periodButtonTextActive,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "month" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("month")}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === "month" && styles.periodButtonTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "quarter" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("quarter")}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === "quarter" && styles.periodButtonTextActive,
              ]}
            >
              Quarter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "year" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("year")}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === "year" && styles.periodButtonTextActive,
              ]}
            >
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Financial Overview */}
        {/* <View style={styles.financialOverview}>
          <LinearGradient
            colors={["#00A09D", "#33B3B0"]}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.overviewGrid}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Total Revenue</Text>
                <Text style={styles.overviewAmount}>
                  {financialData.totalRevenue}
                </Text>
                <Text style={styles.overviewGrowth}>
                  {financialData.monthlyGrowth}
                </Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Net Profit</Text>
                <Text style={styles.overviewAmount}>
                  {financialData.netProfit}
                </Text>
                <Text style={styles.overviewGrowth}>+18.2%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Cash Flow</Text>
                <Text style={styles.overviewAmount}>
                  {financialData.cashFlow}
                </Text>
                <Text style={styles.overviewGrowth}>+25.1%</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>Outstanding</Text>
                <Text style={styles.overviewAmount}>
                  {financialData.outstandingInvoices}
                </Text>
                <Text style={styles.overviewGrowth}>-5.2%</Text>
              </View>
            </View>
          </LinearGradient>
        </View> */}
        <View className="mb-4">
          <LinearGradient
            colors={["#00A09D", "#33B3B0"]}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row flex-wrap justify-between">
              <View className="w-[48%] mb-4">
                <Text className="text-white text-[12px] font-medium mb-1">
                  Total Revenue
                </Text>
                <Text className="text-white text-[20px] font-bold">
                  {financialData.totalRevenue}
                </Text>
                <Text className="text-white text-[12px] mt-1">
                  {financialData.monthlyGrowth}
                </Text>
              </View>

              <View className="w-[48%] mb-4">
                <Text className="text-white text-[12px] font-medium mb-1">
                  Net Profit
                </Text>
                <Text className="text-white text-[20px] font-bold">
                  {financialData.netProfit}
                </Text>
                <Text className="text-white text-[12px] mt-1">+18.2%</Text>
              </View>

              <View className="w-[48%] mb-4">
                <Text className="text-white text-[12px] font-medium mb-1">
                  Cash Flow
                </Text>
                <Text className="text-white text-[20px] font-bold">
                  {financialData.cashFlow}
                </Text>
                <Text className="text-white text-[12px] mt-1">+25.1%</Text>
              </View>

              <View className="w-[48%] mb-4">
                <Text className="text-white text-[12px] font-medium mb-1">
                  Outstanding
                </Text>
                <Text className="text-white text-[20px] font-bold">
                  {financialData.outstandingInvoices}
                </Text>
                <Text className="text-white text-[12px] mt-1">-5.2%</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Financial Cards */}
        {/* <View style={styles.financialCards}>
          <View style={styles.financialCardsRow}>
            {renderFinancialCard(
              "Accounts Receivable",
              financialData.accountsReceivable,
              "Money owed to you",
              COLORS.success,
              "arrow-up-circle-outline"
            )}
            {renderFinancialCard(
              "Accounts Payable",
              financialData.accountsPayable,
              "Money you owe",
              COLORS.error,
              "arrow-down-circle-outline"
            )}
          </View>
          <View style={styles.financialCardsRow}>
            {renderFinancialCard(
              "GST Receivable",
              financialData.gstReceivable,
              "GST Input Credit",
              "#28A745",
              "receipt-outline"
            )}
            {renderFinancialCard(
              "GST Payable",
              financialData.gstPayable,
              "GST Output Tax",
              "#DC3545",
              "card-outline"
            )}
          </View>
        </View> */}
        <View className="mt-4">
          <View className="flex-row justify-between mb-4">
            {renderFinancialCard(
              "Accounts Receivable",
              financialData.accountsReceivable,
              "Money owed to you",
              COLORS.success,
              "arrow-up-circle-outline"
            )}
            {renderFinancialCard(
              "Accounts Payable",
              financialData.accountsPayable,
              "Money you owe",
              COLORS.error,
              "arrow-down-circle-outline"
            )}
          </View>

          <View className="flex-row justify-between mb-4">
            {renderFinancialCard(
              "GST Receivable",
              financialData.gstReceivable,
              "GST Input Credit",
              "#28A745",
              "receipt-outline"
            )}
            {renderFinancialCard(
              "GST Payable",
              financialData.gstPayable,
              "GST Output Tax",
              "#DC3545",
              "card-outline"
            )}
          </View>
        </View>

        {/* GST Summary */}
        {renderGSTSummary()}

        {/* Revenue vs Expenses Chart */}
        <View className="mb-lg">
          <Card className="p-lg">
            <View className="flex-row justify-between items-center mb-md">
              <Text className="font-bold text-lg text-textPrimary">
                Revenue vs Expenses
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("DetailedReports")}
              >
                <Text className="font-medium text-sm text-primary">
                  View Details
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-md">
              <View className="flex-row justify-center mb-md">
                <View className="flex-row items-center mx-md">
                  <View className="w-[12] h-[12] rounded-[6] mr-xs bg-success" />
                  <Text className="font-regular text-sm text-textSecondary">
                    Revenue
                  </Text>
                </View>
                <View className="flex-row items-center mx-md">
                  <View className="w-[12] h-[12] rounded-[6] mr-xs bg-error" />
                  <Text className="font-regular text-sm text-textSecondary">
                    Expenses
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-around items-end h-[120] px-sm">
                {revenueData.map(renderChartBar)}
              </View>
            </View>
          </Card>
        </View>

        {/* Expense Breakdown */}
        <View className="mb-lg">
          <Card style={styles.expenseCard}>
            <View className="flex-row justify-between items-center mb-md">
              <Text className="font-bold text-lg text-textPrimary">
                Expense Breakdown
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ExpenseReport")}
              >
                <Text className="font-medium text-sm text-primary">
                  View Report
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-md">
              {expenseCategories.map(renderExpenseCategory)}
            </View>
          </Card>
        </View>

        {/* Recent Transactions */}
        <View className="mb-md">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="font-bold text-lg text-textPrimary">
              Recent Transactions
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllTransactions")}
            >
              <Text className="font-medium text-sm text-primary">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-lg">
            {recentTransactions.map(renderTransactionCard)}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-xl">
          <Card className="p-lg">
            <Text className="font-bold text-lg text-textPrimary mb-md">
              Quick Actions
            </Text>
            <View className="flex-row flex-wrap justify-between">
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("CreateInvoice")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  Create Invoice
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("RecordExpense")}
              >
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  Record Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("BankReconciliation")}
              >
                <Ionicons
                  name="sync-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  Bank Reconciliation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("FinancialReports")}
                // onPress={() => {
                //   navigation.navigate("Accounting", {
                //     screen: "FinancialReports",
                //   });
                // }}
              >
                <Ionicons
                  name="bar-chart-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  Reports
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("GSTReport")}
              >
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  GST Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded-sm"
                onPress={() => navigation.navigate("TDSReport")}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm ml-xs text-textPrimary">
                  TDS Report
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SPACING.xs,
    marginBottom: SPACING.lg,
    ...SIZES.shadow,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
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
  overviewGradient: {
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
  },
  financialCard: {
    width: "48%",
    padding: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  gstCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  gstNetTotalLabel: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  expenseCard: {
    padding: SPACING.lg,
  },
  quickActions: {
    marginBottom: SPACING.xl,
  },
});

export default AccountingDashboardScreen;
