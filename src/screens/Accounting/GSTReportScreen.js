import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";

const GSTReportScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedGSTType, setSelectedGSTType] = useState("all");

  const periods = [
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
    { id: "year", label: "This Year" },
  ];

  const gstTypes = [
    { id: "all", label: "All GST", icon: "receipt-outline" },
    { id: "cgst", label: "CGST", icon: "flag-outline" },
    { id: "sgst", label: "SGST", icon: "location-outline" },
    { id: "igst", label: "IGST", icon: "globe-outline" },
  ];

  // GST Data
  const gstData = {
    summary: {
      totalSales: "₹1,24,56,800",
      totalPurchases: "₹78,94,200",
      taxableSales: "₹1,18,34,000",
      taxablePurchases: "₹75,12,000",
      exemptSales: "₹6,22,800",
      exemptPurchases: "₹3,82,200",
    },
    outputTax: {
      cgst: "₹6,22,800",
      sgst: "₹6,22,800",
      igst: "₹0",
      total: "₹12,45,600",
    },
    inputCredit: {
      cgst: "₹3,94,710",
      sgst: "₹3,94,710",
      igst: "₹0",
      total: "₹7,89,420",
    },
    netGST: {
      cgst: "₹2,28,090",
      sgst: "₹2,28,090",
      igst: "₹0",
      total: "₹4,56,180",
    },
    filingStatus: {
      gst1: { status: "Filed", dueDate: "2024-01-20", filedDate: "2024-01-18" },
      gst2: { status: "Filed", dueDate: "2024-01-20", filedDate: "2024-01-18" },
      gst3: { status: "Filed", dueDate: "2024-01-20", filedDate: "2024-01-18" },
      gst9: { status: "Pending", dueDate: "2024-01-31", filedDate: null },
    },
    monthlyBreakdown: [
      { month: "Jan", cgst: 622800, sgst: 622800, igst: 0, total: 1245600 },
      { month: "Feb", cgst: 589400, sgst: 589400, igst: 0, total: 1178800 },
      { month: "Mar", cgst: 612300, sgst: 612300, igst: 0, total: 1224600 },
      { month: "Apr", cgst: 598700, sgst: 598700, igst: 0, total: 1197400 },
      { month: "May", cgst: 634200, sgst: 634200, igst: 0, total: 1268400 },
      { month: "Jun", cgst: 651800, sgst: 651800, igst: 0, total: 1303600 },
    ],
  };

  const renderGSTTypeCard = (gstType) => {
    const isSelected = selectedGSTType === gstType.id;

    return (
      <TouchableOpacity
        key={gstType.id}
        style={[styles.gstTypeCard, isSelected && styles.gstTypeCardSelected]}
        className={`flex-1 items-center p-md rounded-sm shadow-s ${
          isSelected ? "bg-primary" : "bg-white"
        }`}
        onPress={() => setSelectedGSTType(gstType.id)}
      >
        <Ionicons
          name={gstType.icon}
          size={24}
          color={isSelected ? COLORS.white : COLORS.primary}
        />
        <Text
          className={`mt-xs font-medium text-sm ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          {gstType.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderGSTSummary = () => (
    <Card style={styles.summaryCard}>
      <Text className="text-lg font-bold text-gray-800 mb-md">GST Summary</Text>

      <View className="flex-row flex-wrap justify-between">
        <View className="w-[48%] bg-lightGray p-md mb-sm items-center rounded-sm">
          <Text className="text-sm mb-1 text-textSecondary">Total Sales</Text>
          <Text className="font-bold text-md text-textPrimary text-center">
            {gstData.summary.totalSales}
          </Text>
        </View>
        <View className="w-[48%] bg-lightGray p-md mb-sm items-center rounded-sm">
          <Text className="text-sm mb-1 text-textSecondary">
            Total Purchases
          </Text>
          <Text className="font-bold text-md text-textPrimary text-center">
            {gstData.summary.totalPurchases}
          </Text>
        </View>
        <View className="w-[48%] bg-lightGray p-md mb-sm items-center rounded-sm">
          <Text className="text-sm mb-1 text-textSecondary">Taxable Sales</Text>
          <Text className="font-bold text-md text-textPrimary text-center">
            {gstData.summary.taxableSales}
          </Text>
        </View>
        <View className="w-[48%] bg-lightGray p-md mb-sm items-center rounded-sm">
          <Text className="text-sm mb-1 text-textSecondary">
            Taxable Purchases
          </Text>
          <Text className="font-bold text-md text-textPrimary text-center">
            {gstData.summary.taxablePurchases}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderGSTBreakdown = () => (
    <Card className="bg-white p-lg rounded-radius shadow-s mb-lg">
      <Text className="text-lg font-bold text-gray-800 mb-md">
        GST Breakdown
      </Text>

      <View className="mb-lg">
        <Text className="font-medium text-md text-textPrimary mb-sm">
          Output Tax (GST Collected)
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              CGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.outputTax.cgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              SGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.outputTax.sgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              IGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.outputTax.igst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              Total
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.outputTax.total}
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-lg">
        <Text className="font-medium text-md text-textPrimary mb-sm">
          Input Credit (GST Paid)
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              CGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.inputCredit.cgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              SGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.inputCredit.sgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              IGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.inputCredit.igst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              Total
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.inputCredit.total}
            </Text>
          </View>
        </View>
      </View>

      <View className="mb-lg">
        <Text className="font-medium text-md text-textPrimary mb-sm">
          Net GST Payable
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              CGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.netGST.cgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              SGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.netGST.sgst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              IGST
            </Text>
            <Text className="font-bold text-sm text-textPrimary">
              {gstData.netGST.igst}
            </Text>
          </View>
          <View className="w-[48%] bg-lightGray p-sm rounded-sm items-center mb-sm">
            <Text className="font-medium text-sm text-textSecondary mb-xs">
              Total
            </Text>
            <Text className="font-bold text-sm mb-xs text-primary">
              {gstData.netGST.total}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderFilingStatus = () => (
    <Card className="mb-lg p-lg">
      <Text className="font-bold text-lg text-textPrimary mb-md">
        GST Filing Status
      </Text>

      <View className="gap-sm">
        {Object.entries(gstData.filingStatus).map(([form, data]) => (
          <View key={form} className="bg-lightGray p-md rounded-lg">
            <View className="flex-row justify-between items-center mb-xs">
              <Text className="font-bold text-md text-textPrimary">
                GST {form.toUpperCase()}
              </Text>
              <View
                className={`px-sm py-xs rounded-lg ${
                  data.status === "Filed" ? "bg-success" : "bg-warning"
                }`}
              >
                <Text className="font-medium text-xs text-white">
                  {data.status}
                </Text>
              </View>
            </View>

            <View className="gap-xs">
              <Text className="font-regular text-sm text-textSecondary">
                Due Date: {data.dueDate}
              </Text>
              {data.filedDate && (
                <Text className="font-regular text-sm text-textSecondary">
                  Filed: {data.filedDate}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderMonthlyChart = () => (
    <Card className="mb-lg p-lg">
      <Text className="font-bold text-lg text-textPrimary mb-md">
        Monthly GST Trend
      </Text>

      <View className="mt-md">
        {/* Chart Legend */}
        <View className="flex-row justify-center mb-md">
          <View className="flex-row items-center mx-md">
            <View className="w-[12px] h-[12px] rounded-[6px] mr-xs bg-success" />
            <Text className="font-regular text-sm text-textSecondary">
              CGST
            </Text>
          </View>
          <View className="flex-row items-center mx-md">
            <View className="w-[12px] h-[12px] rounded-[6px] mr-xs bg-info" />
            <Text className="font-regular text-sm text-textSecondary">
              SGST
            </Text>
          </View>
          <View className="flex-row items-center mx-md">
            <View className="w-[12px] h-[12px] rounded-[6px] mr-xs bg-accent" />
            <Text className="font-regular text-sm text-textSecondary">
              IGST
            </Text>
          </View>
        </View>

        {/* Chart Bars */}
        <View className="flex-row justify-around items-end h-[120px] px-sm">
          {gstData.monthlyBreakdown.map((month, index) => {
            const maxValue = Math.max(
              ...gstData.monthlyBreakdown.map((m) => m.total)
            );
            const cgstHeight = (month.cgst / maxValue) * 100;
            const sgstHeight = (month.sgst / maxValue) * 100;
            const igstHeight = (month.igst / maxValue) * 100;

            return (
              <View key={index} className="items-center flex-1">
                <View className="flex-row items-end h-[80px] mb-xs">
                  <View
                    className="w-[8px] bg-success mr-[2px] rounded-t-[4px]"
                    style={{ height: `${cgstHeight}%` }}
                  />
                  <View
                    className="w-[8px] bg-info mr-[2px] rounded-t-[4px]"
                    style={{ height: `${sgstHeight}%` }}
                  />
                  <View
                    className="w-[8px] bg-accent rounded-t-[4px]"
                    style={{ height: `${igstHeight}%` }}
                  />
                </View>
                <Text className="font-regular text-xs text-textSecondary">
                  {month.month}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="GST Report"
        subtitle="Indian GST Compliance & Analytics"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="download-outline"
        onRightPress={() => Alert.alert("Export", "Export GST report as PDF")}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View
          style={styles.periodSelector}
          className="flex-row bg-white rounded-sm p-xs mb-lg"
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              className={`flex-1 py-sm items-center rounded-sm ${
                selectedPeriod === period.id ? "bg-primary" : ""
              }`}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text
                className={`font-medium text-sm ${
                  selectedPeriod === period.id
                    ? "text-white"
                    : "text-textSecondary"
                }`}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* GST Type Selector */}
        <View className="flex-row justify-between mb-lg">
          {gstTypes.map(renderGSTTypeCard)}
        </View>

        <View className="flex-col gap-lg mb-lg">

        {/* GST Summary */}
        {renderGSTSummary()}

        {/* GST Breakdown */}
        {renderGSTBreakdown()}

        {/* Filing Status */}
        {renderFilingStatus()}

        {/* Monthly Chart */}
        {renderMonthlyChart()}

        </View>

        {/* Action Buttons */}
        <View className="flex-row flex-wrap gap-md justify-around mb-xl">
          <TouchableOpacity style={styles.actionButton} className="flex-row items-center p-md bg-white rounded-sm shadow">
            <Ionicons
              name="file-text-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text className="font-medium text-sm text-primary ml-xs">
              Generate GSTR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} className="flex-row items-center p-md bg-white rounded-sm">
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text className="font-medium text-sm text-primary ml-xs">
              File GST
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} className="flex-row items-center p-md bg-white rounded-sm">
            <Ionicons
              name="calculator-outline"
              size={20}
              color={COLORS.primary}
            />
            <Text className="font-medium text-sm text-primary ml-xs">
              GST Calculator
            </Text>
          </TouchableOpacity>
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
  gstTypeCard: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.xs,
    ...SIZES.shadow,
  },
  gstTypeCardSelected: {
    backgroundColor: COLORS.primary,
  },
  gstTypeLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  summaryCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SIZES.shadow,
  },
  
});

export default GSTReportScreen;
