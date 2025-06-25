const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  customerGSTIN: String,
  issueDate: String,
  dueDate: String,
  notes: String,
  terms: String,
  currency: String,
  isInterState: Boolean,
  lineItems: [
    {
      description: String,
      quantity: Number,
      rate: Number,
      amount: Number,
      gstRate: Number
    }
  ],
  subtotal: Number,
  cgst: Number,
  sgst: Number,
  igst: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema); 