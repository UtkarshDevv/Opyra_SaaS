import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';

const GSTReportScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedGSTType, setSelectedGSTType] = useState('all');

  const periods = [
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const gstTypes = [
    { id: 'all', label: 'All GST', icon: 'receipt-outline' },
    { id: 'cgst', label: 'CGST', icon: 'flag-outline' },
    { id: 'sgst', label: 'SGST', icon: 'location-outline' },
    { id: 'igst', label: 'IGST', icon: 'globe-outline' }
  ];

  // GST Data
  const gstData = {
    summary: {
      totalSales: '₹1,24,56,800',
      totalPurchases: '₹78,94,200',
      taxableSales: '₹1,18,34,000',
      taxablePurchases: '₹75,12,000',
      exemptSales: '₹6,22,800',
      exemptPurchases: '₹3,82,200'
    },
    outputTax: {
      cgst: '₹6,22,800',
      sgst: '₹6,22,800',
      igst: '₹0',
      total: '₹12,45,600'
    },
    inputCredit: {
      cgst: '₹3,94,710',
      sgst: '₹3,94,710',
      igst: '₹0',
      total: '₹7,89,420'
    },
    netGST: {
      cgst: '₹2,28,090',
      sgst: '₹2,28,090',
      igst: '₹0',
      total: '₹4,56,180'
    },
    filingStatus: {
      gst1: { status: 'Filed', dueDate: '2024-01-20', filedDate: '2024-01-18' },
      gst2: { status: 'Filed', dueDate: '2024-01-20', filedDate: '2024-01-18' },
      gst3: { status: 'Filed', dueDate: '2024-01-20', filedDate: '2024-01-18' },
      gst9: { status: 'Pending', dueDate: '2024-01-31', filedDate: null }
    },
    monthlyBreakdown: [
      { month: 'Jan', cgst: 622800, sgst: 622800, igst: 0, total: 1245600 },
      { month: 'Feb', cgst: 589400, sgst: 589400, igst: 0, total: 1178800 },
      { month: 'Mar', cgst: 612300, sgst: 612300, igst: 0, total: 1224600 },
      { month: 'Apr', cgst: 598700, sgst: 598700, igst: 0, total: 1197400 },
      { month: 'May', cgst: 634200, sgst: 634200, igst: 0, total: 1268400 },
      { month: 'Jun', cgst: 651800, sgst: 651800, igst: 0, total: 1303600 }
    ]
  };

  const renderGSTTypeCard = (gstType) => {
    const isSelected = selectedGSTType === gstType.id;
    
    return (
      <TouchableOpacity
        key={gstType.id}
        style={[styles.gstTypeCard, isSelected && styles.gstTypeCardSelected]}
        onPress={() => setSelectedGSTType(gstType.id)}
      >
        <Ionicons 
          name={gstType.icon} 
          size={24} 
          color={isSelected ? COLORS.white : COLORS.primary} 
        />
        <Text style={[
          styles.gstTypeLabel,
          isSelected && styles.gstTypeLabelSelected
        ]}>
          {gstType.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderGSTSummary = () => (
    <Card style={styles.summaryCard}>
      <Text style={styles.sectionTitle}>GST Summary</Text>
      
      <View style={styles.summaryGrid}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Sales</Text>
          <Text style={styles.summaryValue}>{gstData.summary.totalSales}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Purchases</Text>
          <Text style={styles.summaryValue}>{gstData.summary.totalPurchases}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Taxable Sales</Text>
          <Text style={styles.summaryValue}>{gstData.summary.taxableSales}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Taxable Purchases</Text>
          <Text style={styles.summaryValue}>{gstData.summary.taxablePurchases}</Text>
        </View>
      </View>
    </Card>
  );

  const renderGSTBreakdown = () => (
    <Card style={styles.breakdownCard}>
      <Text style={styles.sectionTitle}>GST Breakdown</Text>
      
      <View style={styles.breakdownSection}>
        <Text style={styles.breakdownSubtitle}>Output Tax (GST Collected)</Text>
        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>CGST</Text>
            <Text style={styles.breakdownValue}>{gstData.outputTax.cgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>SGST</Text>
            <Text style={styles.breakdownValue}>{gstData.outputTax.sgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>IGST</Text>
            <Text style={styles.breakdownValue}>{gstData.outputTax.igst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Total</Text>
            <Text style={styles.breakdownValue}>{gstData.outputTax.total}</Text>
          </View>
        </View>
      </View>

      <View style={styles.breakdownSection}>
        <Text style={styles.breakdownSubtitle}>Input Credit (GST Paid)</Text>
        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>CGST</Text>
            <Text style={styles.breakdownValue}>{gstData.inputCredit.cgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>SGST</Text>
            <Text style={styles.breakdownValue}>{gstData.inputCredit.sgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>IGST</Text>
            <Text style={styles.breakdownValue}>{gstData.inputCredit.igst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Total</Text>
            <Text style={styles.breakdownValue}>{gstData.inputCredit.total}</Text>
          </View>
        </View>
      </View>

      <View style={styles.breakdownSection}>
        <Text style={styles.breakdownSubtitle}>Net GST Payable</Text>
        <View style={styles.breakdownGrid}>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>CGST</Text>
            <Text style={styles.breakdownValue}>{gstData.netGST.cgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>SGST</Text>
            <Text style={styles.breakdownValue}>{gstData.netGST.sgst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>IGST</Text>
            <Text style={styles.breakdownValue}>{gstData.netGST.igst}</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Total</Text>
            <Text style={[styles.breakdownValue, styles.netGSTValue]}>{gstData.netGST.total}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderFilingStatus = () => (
    <Card style={styles.filingCard}>
      <Text style={styles.sectionTitle}>GST Filing Status</Text>
      
      <View style={styles.filingGrid}>
        {Object.entries(gstData.filingStatus).map(([form, data]) => (
          <View key={form} style={styles.filingItem}>
            <View style={styles.filingHeader}>
              <Text style={styles.filingForm}>GST {form.toUpperCase()}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: data.status === 'Filed' ? COLORS.success : COLORS.warning }
              ]}>
                <Text style={styles.statusText}>{data.status}</Text>
              </View>
            </View>
            <View style={styles.filingDetails}>
              <Text style={styles.filingLabel}>Due Date: {data.dueDate}</Text>
              {data.filedDate && (
                <Text style={styles.filingLabel}>Filed: {data.filedDate}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );

  const renderMonthlyChart = () => (
    <Card style={styles.chartCard}>
      <Text style={styles.sectionTitle}>Monthly GST Trend</Text>
      
      <View style={styles.chartContainer}>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#28A745' }]} />
            <Text style={styles.legendText}>CGST</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#17A2B8' }]} />
            <Text style={styles.legendText}>SGST</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FF6B35' }]} />
            <Text style={styles.legendText}>IGST</Text>
          </View>
        </View>
        
        <View style={styles.chartBars}>
          {gstData.monthlyBreakdown.map((month, index) => {
            const maxValue = Math.max(...gstData.monthlyBreakdown.map(m => m.total));
            const cgstHeight = (month.cgst / maxValue) * 100;
            const sgstHeight = (month.sgst / maxValue) * 100;
            const igstHeight = (month.igst / maxValue) * 100;

            return (
              <View key={index} style={styles.chartBar}>
                <View style={styles.chartBarContainer}>
                  <View style={[styles.cgstBar, { height: `${cgstHeight}%` }]} />
                  <View style={[styles.sgstBar, { height: `${sgstHeight}%` }]} />
                  <View style={[styles.igstBar, { height: `${igstHeight}%` }]} />
                </View>
                <Text style={styles.chartLabel}>{month.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="GST Report"
        subtitle="Indian GST Compliance & Analytics"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="download-outline"
        onRightPress={() => Alert.alert('Export', 'Export GST report as PDF')}
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

        {/* GST Type Selector */}
        <View style={styles.gstTypeSelector}>
          {gstTypes.map(renderGSTTypeCard)}
        </View>

        {/* GST Summary */}
        {renderGSTSummary()}

        {/* GST Breakdown */}
        {renderGSTBreakdown()}

        {/* Filing Status */}
        {renderFilingStatus()}

        {/* Monthly Chart */}
        {renderMonthlyChart()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="file-text-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Generate GSTR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cloud-upload-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>File GST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calculator-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>GST Calculator</Text>
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
  gstTypeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  gstTypeCard: {
    flex: 1,
    alignItems: 'center',
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
  gstTypeLabelSelected: {
    color: COLORS.white,
  },
  summaryCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    fontSize: SIZES.lg,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  summaryLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  summaryValue: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  breakdownCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  breakdownSection: {
    marginBottom: SPACING.lg,
  },
  breakdownSubtitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    padding: SPACING.sm,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  breakdownLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  breakdownValue: {
    ...FONTS.bold,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
  },
  netGSTValue: {
    color: COLORS.primary,
  },
  filingCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  filingGrid: {
    gap: SPACING.sm,
  },
  filingItem: {
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
  },
  filingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  filingForm: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
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
  filingDetails: {
    gap: SPACING.xs,
  },
  filingLabel: {
    ...FONTS.regular,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  chartCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
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
  cgstBar: {
    width: 8,
    backgroundColor: '#28A745',
    marginRight: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  sgstBar: {
    width: 8,
    backgroundColor: '#17A2B8',
    marginRight: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  igstBar: {
    width: 8,
    backgroundColor: '#FF6B35',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    ...FONTS.regular,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
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

export default GSTReportScreen; 