const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit');

// List all invoices
router.get('/invoices', async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

// Create a new invoice
router.post('/invoices', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: 'Invoice created', data: invoice });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create invoice', details: err });
  }
});

// Download invoice as PDF
router.get('/invoices/:id/pdf', async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) return res.status(404).send('Invoice not found');

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
  doc.pipe(res);

  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
  doc.text(`Customer: ${invoice.customerName}`);
  doc.text(`Email: ${invoice.customerEmail}`);
  doc.text(`Date: ${invoice.issueDate}`);
  doc.moveDown();

  invoice.lineItems.forEach(item => {
    doc.text(`${item.description} - Qty: ${item.quantity} x ₹${item.rate} = ₹${item.amount} (GST: ${item.gstRate}%)`);
  });

  doc.moveDown();
  doc.text(`Subtotal: ₹${invoice.subtotal}`);
  doc.text(`CGST: ₹${invoice.cgst}`);
  doc.text(`SGST: ₹${invoice.sgst}`);
  doc.text(`IGST: ₹${invoice.igst}`);
  doc.text(`Total: ₹${invoice.total}`);

  doc.end();
});

// Example: Simple reports endpoint (expand as needed)
router.get('/reports', async (req, res) => {
  const invoices = await Invoice.find();
  // Example: Calculate total revenue and expenses
  const revenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  res.json({ revenue, invoiceCount: invoices.length });
});

module.exports = router; 