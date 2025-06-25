import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';
import { getReports } from './accountingApi';

const { width } = Dimensions.get('window');

const FinancialReportsScreen = ({ navigation }) => {
  const [selectedReport, setSelectedReport] = useState('gst');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReports()
      .then(data => {
        setReportData(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load reports from backend. Showing demo data.');
        setReportData(null); // fallback to demo data below
        setLoading(false);
      });
  }, []);

  // Demo data fallback
  const fallbackReportData = {
    gst: {
      title: 'GST Report',
      subtitle: 'Goods and Services Tax Summary',
      icon: 'receipt-outline',
      color: '#28A745',
      gradient: ['#28A745', '#34CE57'],
      data: {
        totalSales: '₹1,24,56,800',
        totalPurchases: '₹78,94,200',
        cgstPayable: '₹6,22,800',
        sgstPayable: '₹6,22,800',
        igstPayable: '₹0',
        cgstReceivable: '₹3,94,710',
        sgstReceivable: '₹3,94,710',
        igstReceivable: '₹0',
        netGstPayable: '₹4,56,180',
        gstInputCredit: '₹7,89,420',
        gstOutputTax: '₹12,45,600'
      }
    },
    tds: {
      title: 'TDS Report',
      subtitle: 'Tax Deducted at Source Summary',
      icon: 'document-text-outline',
      color: '#17A2B8',
      gradient: ['#17A2B8', '#39C0D3'],
      data: {
        totalTdsDeducted: '₹12,45,600',
        tdsOnServices: '₹8,90,400',
        tdsOnRent: '₹2,45,600',
        tdsOnSalary: '₹1,09,600',
        tdsOnInterest: '₹0',
        tdsOnCommission: '₹0',
        tdsPaid: '₹11,23,040',
        tdsPayable: '₹1,22,560',
        tdsChallan: '₹1,22,560'
      }
    },
    income: {
      title: 'Income Statement',
      subtitle: 'Profit & Loss Statement',
      icon: 'trending-up-outline',
      color: '#00A09D',
      gradient: ['#00A09D', '#33B3B0'],
      data: {
        totalRevenue: '₹1,24,56,800',
        costOfGoods: '₹45,67,200',
        grossProfit: '₹78,89,600',
        operatingExpenses: '₹33,27,000',
        operatingIncome: '₹45,62,600',
        otherIncome: '₹2,34,000',
        otherExpenses: '₹1,23,400',
        netIncome: '₹46,73,200',
        ebitda: '₹52,34,600'
      }
    },
    balance: {
      title: 'Balance Sheet',
      subtitle: 'Financial Position Statement',
      icon: 'scale-outline',
      color: '#6F42C1',
      gradient: ['#6F42C1', '#8E63CE'],
      data: {
        assets: {
          currentAssets: '₹89,34,000',
          fixedAssets: '₹1,23,45,600',
          totalAssets: '₹2,12,79,600'
        },
        liabilities: {
          currentLiabilities: '₹67,89,000',
          longTermDebt: '₹45,67,200',
          totalLiabilities: '₹1,13,56,200'
        },
        equity: {
          shareCapital: '₹50,00,000',
          retainedEarnings: '₹49,23,400',
          totalEquity: '₹99,23,400'
        }
      }
    },
    cashflow: {
      title: 'Cash Flow Statement',
      subtitle: 'Cash Movement Analysis',
      icon: 'cash-outline',
      color: '#FF6B35',
      gradient: ['#FF6B35', '#FF8A5C'],
      data: {
        operatingCashFlow: '₹45,62,600',
        investingCashFlow: '-₹12,34,500',
        financingCashFlow: '-₹8,90,400',
        netCashFlow: '₹24,37,700',
        openingBalance: '₹67,89,000',
        closingBalance: '₹92,26,700'
      }
    },
    compliance: {
      title: 'Compliance Report',
      subtitle: 'Tax & Regulatory Compliance',
      icon: 'shield-checkmark-outline',
      color: '#DC3545',
      gradient: ['#DC3545', '#E74C3C'],
      data: {
        gstReturns: 'Filed',
        tdsReturns: 'Filed',
        incomeTaxReturns: 'Filed',
        pfReturns: 'Filed',
        esiReturns: 'Filed',
        rocCompliance: 'Compliant',
        lastAuditDate: '2023-09-30',
        nextAuditDate: '2024-09-30'
      }
    }
  };

  const data = reportData || fallbackReportData;

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const renderReportCard = (reportKey) => {
    const report = data[reportKey];
    const isSelected = selectedReport === reportKey;

    return (
      <TouchableOpacity
        key={reportKey}
        style={[styles.reportCard, isSelected && styles.reportCardSelected]}
        onPress={() => setSelectedReport(reportKey)}
      >
        <LinearGradient
          colors={report.gradient}
          style={styles.reportCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.reportCardContent}>
            <View style={styles.reportCardHeader}>
              <View style={styles.reportIconContainer}>
                <Ionicons name={report.icon} size={24} color={COLORS.white} />
              </View>
              <View style={styles.reportCardInfo}>
                <Text style={styles.reportCardTitle}>{report.title}</Text>
                <Text style={styles.reportCardSubtitle}>{report.subtitle}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderGSTReport = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>GST Output Tax</Text>
        <View style={styles.reportGrid}>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>CGST Payable</Text>
            <Text style={styles.reportItemValue}>{data.gst.data.cgstPayable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>SGST Payable</Text>
            <Text style={styles.reportItemValue}>{data.gst.data.sgstPayable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>IGST Payable</Text>
            <Text style={styles.reportItemValue}>{data.gst.data.igstPayable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>Total Output Tax</Text>
            <Text style={styles.reportItemValue}>{reportData.gst.data.gstOutputTax}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>GST Input Credit</Text>
        <View style={styles.reportGrid}>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>CGST Receivable</Text>
            <Text style={styles.reportItemValue}>{reportData.gst.data.cgstReceivable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>SGST Receivable</Text>
            <Text style={styles.reportItemValue}>{reportData.gst.data.sgstReceivable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>IGST Receivable</Text>
            <Text style={styles.reportItemValue}>{reportData.gst.data.igstReceivable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>Total Input Credit</Text>
            <Text style={styles.reportItemValue}>{reportData.gst.data.gstInputCredit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Net GST Summary</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Net GST Payable:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.gst.data.netGstPayable}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderTDSReport = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>TDS Deducted</Text>
        <View style={styles.reportGrid}>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS on Services</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsOnServices}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS on Rent</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsOnRent}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS on Salary</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsOnSalary}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>Total TDS Deducted</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.totalTdsDeducted}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>TDS Payment Status</Text>
        <View style={styles.reportGrid}>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS Paid</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsPaid}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS Payable</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsPayable}</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportItemLabel}>TDS Challan</Text>
            <Text style={styles.reportItemValue}>{reportData.tds.data.tdsChallan}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderIncomeStatement = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Revenue</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Total Revenue:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.totalRevenue}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Cost of Goods Sold</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Cost of Goods:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.costOfGoods}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Gross Profit:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.grossProfit}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Operating Expenses</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Operating Expenses:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.operatingExpenses}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Operating Income:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.operatingIncome}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Net Income</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Other Income:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.otherIncome}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Other Expenses:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.income.data.otherExpenses}</Text>
          </View>
          <View style={[styles.reportSummaryRow, styles.netIncomeRow]}>
            <Text style={styles.netIncomeLabel}>Net Income:</Text>
            <Text style={styles.netIncomeValue}>{reportData.income.data.netIncome}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderBalanceSheet = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Assets</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Current Assets:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.assets.currentAssets}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Fixed Assets:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.assets.fixedAssets}</Text>
          </View>
          <View style={[styles.reportSummaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Assets:</Text>
            <Text style={styles.totalValue}>{reportData.balance.data.assets.totalAssets}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Liabilities</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Current Liabilities:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.liabilities.currentLiabilities}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Long Term Debt:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.liabilities.longTermDebt}</Text>
          </View>
          <View style={[styles.reportSummaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Liabilities:</Text>
            <Text style={styles.totalValue}>{reportData.balance.data.liabilities.totalLiabilities}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Equity</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Share Capital:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.equity.shareCapital}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Retained Earnings:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.balance.data.equity.retainedEarnings}</Text>
          </View>
          <View style={[styles.reportSummaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Equity:</Text>
            <Text style={styles.totalValue}>{reportData.balance.data.equity.totalEquity}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderCashFlow = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Cash Flow Activities</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Operating Cash Flow:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.cashflow.data.operatingCashFlow}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Investing Cash Flow:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.cashflow.data.investingCashFlow}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Financing Cash Flow:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.cashflow.data.financingCashFlow}</Text>
          </View>
          <View style={[styles.reportSummaryRow, styles.netIncomeRow]}>
            <Text style={styles.netIncomeLabel}>Net Cash Flow:</Text>
            <Text style={styles.netIncomeValue}>{reportData.cashflow.data.netCashFlow}</Text>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Cash Balance</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Opening Balance:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.cashflow.data.openingBalance}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Closing Balance:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.cashflow.data.closingBalance}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderComplianceReport = () => (
    <Card style={styles.reportContentCard}>
      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Tax Returns Status</Text>
        <View style={styles.complianceGrid}>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>GST Returns</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.gstReturns}</Text>
            </View>
          </View>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>TDS Returns</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.tdsReturns}</Text>
            </View>
          </View>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>Income Tax Returns</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.incomeTaxReturns}</Text>
            </View>
          </View>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>PF Returns</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.pfReturns}</Text>
            </View>
          </View>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>ESI Returns</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.esiReturns}</Text>
            </View>
          </View>
          <View style={styles.complianceItem}>
            <Text style={styles.complianceLabel}>ROC Compliance</Text>
            <View style={[styles.statusBadge, { backgroundColor: COLORS.success }]}>
              <Text style={styles.statusText}>{reportData.compliance.data.rocCompliance}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.reportSection}>
        <Text style={styles.reportSectionTitle}>Audit Information</Text>
        <View style={styles.reportSummary}>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Last Audit Date:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.compliance.data.lastAuditDate}</Text>
          </View>
          <View style={styles.reportSummaryRow}>
            <Text style={styles.reportSummaryLabel}>Next Audit Date:</Text>
            <Text style={styles.reportSummaryValue}>{reportData.compliance.data.nextAuditDate}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'gst':
        return renderGSTReport();
      case 'tds':
        return renderTDSReport();
      case 'income':
        return renderIncomeStatement();
      case 'balance':
        return renderBalanceSheet();
      case 'cashflow':
        return renderCashFlow();
      case 'compliance':
        return renderComplianceReport();
      default:
        return renderGSTReport();
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Financial Reports"
        subtitle="Indian Tax & Financial Compliance Reports"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="download-outline"
        onRightPress={() => Alert.alert('Export', 'Export report as PDF')}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map(period => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Report Type Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.reportSelector}
          contentContainerStyle={styles.reportSelectorContent}
        >
          {Object.keys(reportData).map(renderReportCard)}
        </ScrollView>

        {/* Report Content */}
        {renderReportContent()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Export PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Share Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="print-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Print</Text>
          </TouchableOpacity>
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
  reportSelector: {
    marginBottom: SPACING.lg,
  },
  reportSelectorContent: {
    paddingHorizontal: SPACING.xs,
  },
  reportCard: {
    width: 200,
    marginHorizontal: SPACING.xs,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SIZES.shadow,
  },
  reportCardSelected: {
    transform: [{ scale: 1.05 }],
  },
  reportCardGradient: {
    padding: SPACING.lg,
  },
  reportCardContent: {
    flex: 1,
  },
  reportCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  reportCardInfo: {
    flex: 1,
  },
  reportCardTitle: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  reportCardSubtitle: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  reportContentCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  reportSection: {
    marginBottom: SPACING.lg,
  },
  reportSectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reportItem: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  reportItemLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  reportItemValue: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  reportSummary: {
    backgroundColor: COLORS.lightGray,
    padding: SPACING.lg,
    borderRadius: SIZES.radius,
  },
  reportSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reportSummaryLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  reportSummaryValue: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  netIncomeRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  netIncomeLabel: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
  },
  netIncomeValue: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
  },
  totalValue: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.primary,
  },
  complianceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  complianceItem: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  complianceLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    ...SIZES.shadow,
  },
  actionButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
});

export default FinancialReportsScreen; 