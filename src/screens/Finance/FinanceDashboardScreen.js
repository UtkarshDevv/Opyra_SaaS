import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const FinanceDashboardScreen = ({ navigation }) => {
  const financialStats = {
    totalRevenue: "$245,680",
    totalExpenses: "$89,420",
    netProfit: "$156,260",
    outstandingInvoices: "$32,450",
    overdueInvoices: "$8,920",
    monthlyGrowth: "+12.5%",
    cashFlow: "+$45,230",
  };

  const recentInvoices = [
    {
      id: "INV-001",
      customer: "Tech Solutions Inc",
      amount: "$15,000",
      status: "Paid",
      dueDate: "2024-01-15",
      issueDate: "2024-01-01",
      description: "Software Development Services",
    },
    {
      id: "INV-002",
      customer: "Global Marketing",
      amount: "$8,500",
      status: "Pending",
      dueDate: "2024-01-20",
      issueDate: "2024-01-05",
      description: "Marketing Campaign Services",
    },
    {
      id: "INV-003",
      customer: "StartupXYZ",
      amount: "$12,000",
      status: "Overdue",
      dueDate: "2024-01-10",
      issueDate: "2023-12-20",
      description: "Consulting Services",
    },
  ];

  const expenseCategories = [
    { name: "Salaries", amount: "$45,000", percentage: 50, color: "#714B67" },
    {
      name: "Office Rent",
      amount: "$12,000",
      percentage: 13,
      color: "#00A09D",
    },
    { name: "Utilities", amount: "$8,500", percentage: 10, color: "#FF6B35" },
    { name: "Marketing", amount: "$7,200", percentage: 8, color: "#28A745" },
    { name: "Software", amount: "$6,720", percentage: 8, color: "#17A2B8" },
    { name: "Other", amount: "$10,000", percentage: 11, color: "#6C757D" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return COLORS.success;
      case "Pending":
        return COLORS.warning;
      case "Overdue":
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const renderInvoiceCard = (invoice) => (
    <Card key={invoice.id} className="mb-md p-lg">
      <View className="flex-row justify-between items-center mb-md">
        <View className="flex-1">
          <Text className="font-bold text-lg text-textPrimary mb-xs">
            {invoice.id}
          </Text>
          <Text className="font-regular text-sm text-textSecondary">
            {invoice.customer}
          </Text>
        </View>
        <View className="ml-sm">
          <View
            style={{ backgroundColor: getStatusColor(invoice.status) }}
            className="px-sm py-xs rounded"
          >
            <Text className="font-medium text-xs text-white">
              {invoice.status}
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-md">
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="cash-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">
            {invoice.amount}
          </Text>
        </View>
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="calendar-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">
            Due: {invoice.dueDate}
          </Text>
        </View>
        <View className="flex-row items-center mb-xs">
          <Ionicons
            name="document-text-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text className="font-regular text-sm text-textSecondary ml-xs">
            {invoice.description}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <Button
          title="View Details"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate("InvoiceDetail", { invoice })}
        />
        <Button
          title={invoice.status === "Paid" ? "Download" : "Send Reminder"}
          variant={invoice.status === "Paid" ? "secondary" : "primary"}
          size="small"
          onPress={() => {
            if (invoice.status === "Paid") {
              navigation.navigate("DownloadInvoice", { invoice });
            } else {
              navigation.navigate("SendReminder", { invoice });
            }
          }}
        />
      </View>
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Finance Dashboard"
        subtitle="Accounting & Financial Management"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="add-outline"
        onRightPress={() => navigation.navigate("CreateInvoice")}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {/* Financial Overview */}
        <View className="mb-lg">
          <LinearGradient
            colors={["#714B67", "#8B6B7F"]}
            style={styles.overviewGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View className="flex-row flex-wrap justify-between">
              <View className="mb-md w-[48%]">
                <Text className="font-regular text-sm text-[rgba(225,225,225,0.8)] mb-xs">
                  Total Revenue
                </Text>
                <Text className="font-bold text-lg text-white mb-xs">
                  {financialStats.totalRevenue}
                </Text>
                <Text className="font-medium text-xs text-[rgba(225,225,225,0.9)]">
                  {financialStats.monthlyGrowth}
                </Text>
              </View>
              <View className="mb-md w-[48%]">
                <Text className="font-regular text-sm text-[rgba(225,225,225,0.8)] mb-xs">
                  Net Profit
                </Text>
                <Text className="font-bold text-lg text-white mb-xs">
                  {financialStats.netProfit}
                </Text>
                <Text className="font-medium text-xs text-[rgba(225,225,225,0.9)]">
                  +18.2%
                </Text>
              </View>
              <View className="mb-md w-[48%]">
                <Text className="font-regular text-sm text-[rgba(225,225,225,0.8)] mb-xs">
                  Cash Flow
                </Text>
                <Text className="font-bold text-lg text-white mb-xs">
                  {financialStats.cashFlow}
                </Text>
                <Text className="font-medium text-xs text-[rgba(225,225,225,0.9)]">
                  +25.1%
                </Text>
              </View>
              <View className="mb-md w-[48%]">
                <Text className="font-regular text-sm text-[rgba(225,225,225,0.8)] mb-xs">
                  Outstanding
                </Text>
                <Text className="font-bold text-lg text-white mb-xs">
                  {financialStats.outstandingInvoices}
                </Text>
                <Text className="font-medium text-xs text-[rgba(225,225,225,0.9)]">
                  -5.2%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Expense Breakdown */}
        <View className="mb-lg">
          <Card className="p-lg">
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
              {expenseCategories.map((category, index) => (
                <View key={index} className="mb-sm">
                  <View className="flex-row items-center mb-xs">
                    <View
                      style={[
                        styles.categoryColor,
                        { backgroundColor: category.color },
                      ]}
                    />
                    <Text className="font-medium text-sm flex-1 text-textPrimary">
                      {category.name}
                    </Text>
                    <Text className="font-bold text-sm text-textPrimary">
                      {category.amount}
                    </Text>
                  </View>
                  <View className="h-[6] bg-lightGray overflow-hidden rounded-[3] mb-xs">
                    <View
                      style={[
                        styles.categoryProgress,
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
              ))}
            </View>
          </Card>
        </View>

        {/* Recent Invoices */}
        <View className="mb-lg">
          <View className="flex-row justify-between items-center mb-md">
            <Text className="font-bold text-lg text-textPrimary">
              Recent Invoices
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllInvoices")}
            >
              <Text className="font-medium text-sm text-primary">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-lg">
            {recentInvoices.map(renderInvoiceCard)}
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
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded"
                onPress={() => navigation.navigate("CreateInvoice")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">
                  Create Invoice
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded"
                onPress={() => navigation.navigate("RecordExpense")}
              >
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">
                  Record Expense
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded"
                onPress={() => navigation.navigate("FinancialReports")}
              >
                <Ionicons
                  name="bar-chart-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">
                  Reports
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-[48%] flex-row items-center p-sm mb-sm bg-lightGray rounded"
                onPress={() => navigation.navigate("BankReconciliation")}
              >
                <Ionicons
                  name="sync-outline"
                  size={24}
                  color={COLORS.primary}
                />
                <Text className="font-medium text-sm text-textPrimary ml-xs">
                  Reconciliation
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
  overviewGradient: {
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  categoryProgress: {
    height: "100%",
    borderRadius: 3,
  },
});

export default FinanceDashboardScreen;
