import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { COLORS, SIZES, FONTS, SPACING } from '../../constants/theme';
import { createInvoice } from './accountingApi';

const CreateInvoiceScreen = ({ navigation }) => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-001',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerGSTIN: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    terms: 'Net 30',
    currency: 'INR',
    isInterState: false,
    lineItems: [
      { id: 1, description: '', quantity: 1, rate: 0, amount: 0, gstRate: 18 }
    ]
  });

  const [subtotal, setSubtotal] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [total, setTotal] = useState(0);

  const gstRates = [0, 5, 12, 18, 28];

  const addLineItem = () => {
    const newItem = {
      id: invoiceData.lineItems.length + 1,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      gstRate: 18
    };
    setInvoiceData({
      ...invoiceData,
      lineItems: [...invoiceData.lineItems, newItem]
    });
  };

  const updateLineItem = (id, field, value) => {
    const updatedItems = invoiceData.lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });

    setInvoiceData({
      ...invoiceData,
      lineItems: updatedItems
    });

    calculateTotals(updatedItems);
  };

  const removeLineItem = (id) => {
    if (invoiceData.lineItems.length > 1) {
      const updatedItems = invoiceData.lineItems.filter(item => item.id !== id);
      setInvoiceData({
        ...invoiceData,
        lineItems: updatedItems
      });
      calculateTotals(updatedItems);
    }
  };

  const calculateTotals = (items) => {
    const newSubtotal = items.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate GST based on inter-state or intra-state
    if (invoiceData.isInterState) {
      // Inter-state: IGST only
      const newIgst = items.reduce((sum, item) => sum + (item.amount * item.gstRate / 100), 0);
      setIgst(newIgst);
      setCgst(0);
      setSgst(0);
      setTotal(newSubtotal + newIgst);
    } else {
      // Intra-state: CGST + SGST
      const newCgst = items.reduce((sum, item) => sum + (item.amount * item.gstRate / 200), 0);
      const newSgst = items.reduce((sum, item) => sum + (item.amount * item.gstRate / 200), 0);
      setCgst(newCgst);
      setSgst(newSgst);
      setIgst(0);
      setTotal(newSubtotal + newCgst + newSgst);
    }

    setSubtotal(newSubtotal);
  };

  const handleSave = async () => {
    if (!invoiceData.customerName || !invoiceData.customerEmail) {
      Alert.alert('Error', 'Please fill in customer name and email');
      return;
    }

    if (!invoiceData.customerGSTIN) {
      Alert.alert('Warning', 'GSTIN is recommended for proper GST compliance');
    }

    try {
      await createInvoice(invoiceData);
      Alert.alert(
        'Success',
        'Invoice created successfully!',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to create invoice.');
    }
  };

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderLineItem = (item) => (
    <Card key={item.id} style={styles.lineItemCard}>
      <View style={styles.lineItemHeader}>
        <Text style={styles.lineItemTitle}>Item {item.id}</Text>
        {invoiceData.lineItems.length > 1 && (
          <TouchableOpacity onPress={() => removeLineItem(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.lineItemFields}>
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textInput}
            value={item.description}
            onChangeText={(text) => updateLineItem(item.id, 'description', text)}
            placeholder="Enter item description"
            multiline
          />
        </View>
        
        <View style={styles.quantityRateRow}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Quantity</Text>
            <TextInput
              style={styles.numberInput}
              value={item.quantity.toString()}
              onChangeText={(text) => updateLineItem(item.id, 'quantity', parseFloat(text) || 0)}
              placeholder="1"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Rate (₹)</Text>
            <TextInput
              style={styles.numberInput}
              value={item.rate.toString()}
              onChangeText={(text) => updateLineItem(item.id, 'rate', parseFloat(text) || 0)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>GST Rate (%)</Text>
            <View style={styles.gstRateSelector}>
              {gstRates.map(rate => (
                <TouchableOpacity
                  key={rate}
                  style={[
                    styles.gstRateButton,
                    item.gstRate === rate && styles.gstRateButtonActive
                  ]}
                  onPress={() => updateLineItem(item.id, 'gstRate', rate)}
                >
                  <Text style={[
                    styles.gstRateButtonText,
                    item.gstRate === rate && styles.gstRateButtonTextActive
                  ]}>
                    {rate}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <Text style={styles.amountText}>{formatIndianCurrency(item.amount)}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Create Invoice"
        subtitle="Generate a new invoice with GST"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="save-outline"
        onRightPress={handleSave}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Customer Information */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Customer Name *</Text>
            <TextInput
              style={styles.textInput}
              value={invoiceData.customerName}
              onChangeText={(text) => setInvoiceData({...invoiceData, customerName: text})}
              placeholder="Enter customer name"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email *</Text>
            <TextInput
              style={styles.textInput}
              value={invoiceData.customerEmail}
              onChangeText={(text) => setInvoiceData({...invoiceData, customerEmail: text})}
              placeholder="Enter customer email"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <TextInput
              style={styles.textInput}
              value={invoiceData.customerPhone}
              onChangeText={(text) => setInvoiceData({...invoiceData, customerPhone: text})}
              placeholder="Enter customer phone"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>GSTIN</Text>
            <TextInput
              style={styles.textInput}
              value={invoiceData.customerGSTIN}
              onChangeText={(text) => setInvoiceData({...invoiceData, customerGSTIN: text})}
              placeholder="Enter customer GSTIN (e.g., 27AAPFU0939F1Z5)"
              autoCapitalize="characters"
            />
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={invoiceData.customerAddress}
              onChangeText={(text) => setInvoiceData({...invoiceData, customerAddress: text})}
              placeholder="Enter customer address"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Transaction Type</Text>
            <View style={styles.transactionTypeSelector}>
              <TouchableOpacity
                style={[
                  styles.transactionTypeButton,
                  !invoiceData.isInterState && styles.transactionTypeButtonActive
                ]}
                onPress={() => {
                  setInvoiceData({...invoiceData, isInterState: false});
                  calculateTotals(invoiceData.lineItems);
                }}
              >
                <Text style={[
                  styles.transactionTypeButtonText,
                  !invoiceData.isInterState && styles.transactionTypeButtonTextActive
                ]}>
                  Intra-State (CGST + SGST)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.transactionTypeButton,
                  invoiceData.isInterState && styles.transactionTypeButtonActive
                ]}
                onPress={() => {
                  setInvoiceData({...invoiceData, isInterState: true});
                  calculateTotals(invoiceData.lineItems);
                }}
              >
                <Text style={[
                  styles.transactionTypeButtonText,
                  invoiceData.isInterState && styles.transactionTypeButtonTextActive
                ]}>
                  Inter-State (IGST)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Invoice Details */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Invoice Details</Text>
          
          <View style={styles.invoiceDetailsRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Invoice Number</Text>
              <TextInput
                style={styles.textInput}
                value={invoiceData.invoiceNumber}
                onChangeText={(text) => setInvoiceData({...invoiceData, invoiceNumber: text})}
                placeholder="INV-2024-001"
              />
            </View>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Currency</Text>
              <TextInput
                style={styles.textInput}
                value={invoiceData.currency}
                onChangeText={(text) => setInvoiceData({...invoiceData, currency: text})}
                placeholder="INR"
              />
            </View>
          </View>
          
          <View style={styles.invoiceDetailsRow}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Issue Date</Text>
              <TextInput
                style={styles.textInput}
                value={invoiceData.issueDate}
                onChangeText={(text) => setInvoiceData({...invoiceData, issueDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>
            
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Due Date</Text>
              <TextInput
                style={styles.textInput}
                value={invoiceData.dueDate}
                onChangeText={(text) => setInvoiceData({...invoiceData, dueDate: text})}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>
          
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Terms</Text>
            <TextInput
              style={styles.textInput}
              value={invoiceData.terms}
              onChangeText={(text) => setInvoiceData({...invoiceData, terms: text})}
              placeholder="Net 30"
            />
          </View>
        </Card>

        {/* Line Items */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Line Items</Text>
            <TouchableOpacity style={styles.addButton} onPress={addLineItem}>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
          
          {invoiceData.lineItems.map(renderLineItem)}
        </Card>

        {/* Totals */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Totals</Text>
          
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal:</Text>
            <Text style={styles.totalsValue}>{formatIndianCurrency(subtotal)}</Text>
          </View>
          
          {!invoiceData.isInterState ? (
            <>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>CGST:</Text>
                <Text style={styles.totalsValue}>{formatIndianCurrency(cgst)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>SGST:</Text>
                <Text style={styles.totalsValue}>{formatIndianCurrency(sgst)}</Text>
              </View>
            </>
          ) : (
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>IGST:</Text>
              <Text style={styles.totalsValue}>{formatIndianCurrency(igst)}</Text>
            </View>
          )}
          
          <View style={[styles.totalsRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatIndianCurrency(total)}</Text>
          </View>
        </Card>

        {/* Notes */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={invoiceData.notes}
            onChangeText={(text) => setInvoiceData({...invoiceData, notes: text})}
            placeholder="Enter any additional notes..."
            multiline
            numberOfLines={4}
          />
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button 
            title="Save Draft" 
            onPress={handleSave}
            style={styles.saveButton}
            textStyle={styles.saveButtonText}
          />
          <Button 
            title="Send Invoice" 
            onPress={handleSave}
            style={styles.sendButton}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SPACING.sm,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
    textAlign: 'center',
  },
  invoiceDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionTypeSelector: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  transactionTypeButton: {
    flex: 1,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  transactionTypeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  transactionTypeButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.textSecondary,
  },
  transactionTypeButtonTextActive: {
    color: COLORS.white,
  },
  lineItemCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  lineItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  lineItemTitle: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  lineItemFields: {
    gap: SPACING.sm,
  },
  quantityRateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  gstRateSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  gstRateButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
  },
  gstRateButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  gstRateButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
  },
  gstRateButtonTextActive: {
    color: COLORS.white,
  },
  amountText: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
    textAlign: 'center',
    paddingTop: SPACING.sm,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  addButtonText: {
    ...FONTS.medium,
    fontSize: SIZES.sm,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalsLabel: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
  },
  totalsValue: {
    ...FONTS.bold,
    fontSize: SIZES.md,
    color: COLORS.textPrimary,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  saveButtonText: {
    color: COLORS.textPrimary,
  },
  sendButton: {
    flex: 1,
  },
});

export default CreateInvoiceScreen; 