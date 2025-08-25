import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS, SPACING } from "../../constants/theme";
import { createInvoice } from "./accountingApi";

const CreateInvoiceScreen = ({ navigation }) => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-2024-001",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    customerGSTIN: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    notes: "",
    terms: "Net 30",
    currency: "INR",
    isInterState: false,
    lineItems: [
      { id: 1, description: "", quantity: 1, rate: 0, amount: 0, gstRate: 18 },
    ],
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
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
      gstRate: 18,
    };
    setInvoiceData({
      ...invoiceData,
      lineItems: [...invoiceData.lineItems, newItem],
    });
  };

  const updateLineItem = (id, field, value) => {
    const updatedItems = invoiceData.lineItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });

    setInvoiceData({
      ...invoiceData,
      lineItems: updatedItems,
    });

    calculateTotals(updatedItems);
  };

  const removeLineItem = (id) => {
    if (invoiceData.lineItems.length > 1) {
      const updatedItems = invoiceData.lineItems.filter(
        (item) => item.id !== id
      );
      setInvoiceData({
        ...invoiceData,
        lineItems: updatedItems,
      });
      calculateTotals(updatedItems);
    }
  };

  const calculateTotals = (items) => {
    const newSubtotal = items.reduce((sum, item) => sum + item.amount, 0);

    // Calculate GST based on inter-state or intra-state
    if (invoiceData.isInterState) {
      // Inter-state: IGST only
      const newIgst = items.reduce(
        (sum, item) => sum + (item.amount * item.gstRate) / 100,
        0
      );
      setIgst(newIgst);
      setCgst(0);
      setSgst(0);
      setTotal(newSubtotal + newIgst);
    } else {
      // Intra-state: CGST + SGST
      const newCgst = items.reduce(
        (sum, item) => sum + (item.amount * item.gstRate) / 200,
        0
      );
      const newSgst = items.reduce(
        (sum, item) => sum + (item.amount * item.gstRate) / 200,
        0
      );
      setCgst(newCgst);
      setSgst(newSgst);
      setIgst(0);
      setTotal(newSubtotal + newCgst + newSgst);
    }

    setSubtotal(newSubtotal);
  };

  const handleSave = async () => {
    if (!invoiceData.customerName || !invoiceData.customerEmail) {
      Alert.alert("Error", "Please fill in customer name and email");
      return;
    }

    if (!invoiceData.customerGSTIN) {
      Alert.alert("Warning", "GSTIN is recommended for proper GST compliance");
    }

    try {
      await createInvoice(invoiceData);
      Alert.alert("Success", "Invoice created successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      Alert.alert("Error", "Failed to create invoice.");
    }
  };

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderLineItem = (item) => (
    <Card key={item.id} className="mb-lg p-lg rounded-lg shadow-sm bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-md">
        <Text className="font-bold text-lg text-textPrimary">
          Item {item.id}
        </Text>
        {invoiceData.lineItems.length > 1 && (
          <TouchableOpacity onPress={() => removeLineItem(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>

      {/* Fields */}
      <View className="space-y-md">
        {/* Description */}
        <View className="mb-md">
          <Text className="text-sm text-textSecondary mb-xs">Description</Text>
          <TextInput
            className="border border-border rounded-sm p-md text-md text-textPrimary"
            value={item.description}
            onChangeText={(text) =>
              updateLineItem(item.id, "description", text)
            }
            placeholder="Enter item description"
            multiline
          />
        </View>

        {/* Quantity / Rate / GST / Amount Row */}
        <View className="flex-row flex-wrap gap-md">
          {/* Quantity */}
          <View className="flex-1 min-w-[100px]">
            <Text className="text-sm text-textSecondary mb-xs">Quantity</Text>
            <TextInput
              className="border border-border rounded-sm p-md text-md text-textPrimary"
              value={item.quantity.toString()}
              onChangeText={(text) =>
                updateLineItem(item.id, "quantity", parseFloat(text) || 0)
              }
              placeholder="1"
              keyboardType="numeric"
            />
          </View>

          {/* Rate */}
          <View className="flex-1 min-w-[100px]">
            <Text className="text-sm text-textSecondary mb-xs">Rate (₹)</Text>
            <TextInput
              className="border border-border rounded-sm p-md text-md text-textPrimary"
              value={item.rate.toString()}
              onChangeText={(text) =>
                updateLineItem(item.id, "rate", parseFloat(text) || 0)
              }
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          {/* GST Rate */}
          <View className="flex-1 min-w-[120px]">
            <Text className="text-sm text-textSecondary mb-xs">
              GST Rate (%)
            </Text>
            <View className="flex-row gap-sm flex-wrap">
              {gstRates.map((rate) => (
                <TouchableOpacity
                  key={rate}
                  className={`px-md py-xs rounded-md border ${
                    item.gstRate === rate
                      ? "bg-primary border-primary"
                      : "bg-white border-border"
                  }`}
                  onPress={() => updateLineItem(item.id, "gstRate", rate)}
                >
                  <Text
                    className={`text-sm ${
                      item.gstRate === rate
                        ? "text-white font-semibold"
                        : "text-textPrimary"
                    }`}
                  >
                    {rate}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amount */}
          <View className="flex-1 min-w-[120px]">
            <Text className="text-sm text-textSecondary mb-xs">Amount</Text>
            <Text className="text-md font-semibold text-textPrimary">
              {formatIndianCurrency(item.amount)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Create Invoice"
        subtitle="Generate a new invoice with GST"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="save-outline"
        onRightPress={handleSave}
      />

      <ScrollView className="flex-1 p-md" showsVerticalScrollIndicator={false}>
        {/* Customer Information */}
        <Card style={styles.sectionCard}>
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Customer Information
          </Text>

          {/* Customer Name */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Customer Name *
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
              value={invoiceData.customerName}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, customerName: text })
              }
              placeholder="Enter customer name"
            />
          </View>

          {/* Email */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Email *
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
              value={invoiceData.customerEmail}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, customerEmail: text })
              }
              placeholder="Enter customer email"
              keyboardType="email-address"
            />
          </View>

          {/* Phone */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Phone
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
              value={invoiceData.customerPhone}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, customerPhone: text })
              }
              placeholder="Enter customer phone"
              keyboardType="phone-pad"
            />
          </View>

          {/* GSTIN */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              GSTIN
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
              value={invoiceData.customerGSTIN}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, customerGSTIN: text })
              }
              placeholder="Enter customer GSTIN (e.g., 27AAPFU0939F1Z5)"
              autoCapitalize="characters"
            />
          </View>

          {/* Address */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Address
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white h-20 text-top"
              value={invoiceData.customerAddress}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, customerAddress: text })
              }
              placeholder="Enter customer address"
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Transaction Type */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Transaction Type
            </Text>
            <View className="flex-row gap-sm">
              {/* Intra-State */}
              <TouchableOpacity
                className={`flex-1 p-sm border border-border rounded-sm items-center ${
                  !invoiceData.isInterState ? "bg-primary border-primary" : ""
                }`}
                onPress={() => {
                  setInvoiceData({ ...invoiceData, isInterState: false });
                  calculateTotals(invoiceData.lineItems);
                }}
              >
                <Text
                  className={`font-medium text-sm ${
                    !invoiceData.isInterState
                      ? "text-white"
                      : "text-textSecondary"
                  }`}
                >
                  Intra-State (CGST + SGST)
                </Text>
              </TouchableOpacity>

              {/* Inter-State */}
              <TouchableOpacity
                className={`flex-1 p-sm border border-border rounded-sm items-center ${
                  invoiceData.isInterState ? "bg-primary border-primary" : ""
                }`}
                onPress={() => {
                  setInvoiceData({ ...invoiceData, isInterState: true });
                  calculateTotals(invoiceData.lineItems);
                }}
              >
                <Text
                  className={`font-medium text-sm ${
                    invoiceData.isInterState
                      ? "text-white"
                      : "text-textSecondary"
                  }`}
                >
                  Inter-State (IGST)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Invoice Details */}
        <Card style={styles.sectionCard} className="mb-lg p-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Invoice Details
          </Text>

          {/* Row 1 */}
          <View className="flex-row justify-between">
            {/* Invoice Number */}
            <View className="mb-md">
              <Text className="font-medium text-sm text-textPrimary mb-xs">
                Invoice Number
              </Text>
              <TextInput
                className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
                value={invoiceData.invoiceNumber}
                onChangeText={(text) =>
                  setInvoiceData({ ...invoiceData, invoiceNumber: text })
                }
                placeholder="INV-2024-001"
              />
            </View>

            {/* Currency */}
            <View className="mb-md">
              <Text className="font-medium text-sm text-textPrimary mb-xs">
                Currency
              </Text>
              <TextInput
                className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
                value={invoiceData.currency}
                onChangeText={(text) =>
                  setInvoiceData({ ...invoiceData, currency: text })
                }
                placeholder="INR"
              />
            </View>
          </View>

          {/* Row 2 */}
          <View className="flex-row justify-between">
            {/* Issue Date */}
            <View className="mb-md">
              <Text className="font-medium text-sm text-textPrimary mb-xs">
                Issue Date
              </Text>
              <TextInput
                className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
                value={invoiceData.issueDate}
                onChangeText={(text) =>
                  setInvoiceData({ ...invoiceData, issueDate: text })
                }
                placeholder="YYYY-MM-DD"
              />
            </View>

            {/* Due Date */}
            <View className="mb-md">
              <Text className="font-medium text-sm text-textPrimary mb-xs">
                Due Date
              </Text>
              <TextInput
                className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
                value={invoiceData.dueDate}
                onChangeText={(text) =>
                  setInvoiceData({ ...invoiceData, dueDate: text })
                }
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          {/* Terms */}
          <View className="mb-md">
            <Text className="font-medium text-sm text-textPrimary mb-xs">
              Terms
            </Text>
            <TextInput
              className="border border-border rounded-sm p-sm text-md text-textPrimary bg-white"
              value={invoiceData.terms}
              onChangeText={(text) =>
                setInvoiceData({ ...invoiceData, terms: text })
              }
              placeholder="Net 30"
            />
          </View>
        </Card>

        {/* Line Items */}
        <Card style={styles.sectionCard} className="mb-lg p-lg">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-md">
            <Text className="font-bold text-lg text-textPrimary">
              Line Items
            </Text>

            <TouchableOpacity
              className="flex-row items-center text-primary rounded-full px-md py-sm"
              onPress={addLineItem}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <Text className="ml-xs text-sm text-primary font-medium">
                Add Item
              </Text>
            </TouchableOpacity>
          </View>

          {/* Items List */}
          {invoiceData.lineItems.map(renderLineItem)}
        </Card>

        {/* Totals */}
        <Card style={styles.sectionCard}>
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Totals
          </Text>

          {/* Subtotal */}
          <View className="flex-row justify-between mb-sm">
            <Text className="text-md font-medium text-textSecondary">
              Subtotal:
            </Text>
            <Text className="text-md font-medium text-textPrimary">
              {formatIndianCurrency(subtotal)}
            </Text>
          </View>

          {/* Taxes */}
          {!invoiceData.isInterState ? (
            <>
              <View className="flex-row justify-between mb-sm">
                <Text className="text-md text-textSecondary">CGST:</Text>
                <Text className="text-md font-medium text-textPrimary">
                  {formatIndianCurrency(cgst)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-sm">
                <Text className="text-md text-textSecondary">SGST:</Text>
                <Text className="text-md font-medium text-textPrimary">
                  {formatIndianCurrency(sgst)}
                </Text>
              </View>
            </>
          ) : (
            <View className="flex-row justify-between mb-sm">
              <Text className="text-md text-textSecondary">IGST:</Text>
              <Text className="text-md font-medium text-textPrimary">
                {formatIndianCurrency(igst)}
              </Text>
            </View>
          )}

          {/* Total */}
          <View className="flex-row justify-between mt-md border-t border-border pt-md">
            <Text className="text-lg font-bold text-textPrimary">Total:</Text>
            <Text className="text-lg font-bold text-primary">
              {formatIndianCurrency(total)}
            </Text>
          </View>
        </Card>

        {/* Notes */}
        <Card style={styles.sectionCard} className="mb-lg p-lg">
          <Text className="font-bold text-lg text-textPrimary mb-md">
            Notes
          </Text>
          <TextInput
            className="border border-border rounded-sm p-md text-md text-textPrimary h-[96px]"
            value={invoiceData.notes}
            onChangeText={(text) =>
              setInvoiceData({ ...invoiceData, notes: text })
            }
            placeholder="Enter any additional notes..."
            multiline
            numberOfLines={4}
          />
        </Card>

        {/* Action Buttons */}
        <View className="flex-row justify-between gap-md mb-xl">
          {" "}
          {/* style={styles.actionButtons} */}
          <Button
            title="Save Draft"
            onPress={handleSave}
            style={styles.saveButton}
            //className="flex-1 bg-lightGray"
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
  sectionCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
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
