// accountingApi.js
// IMPORTANT: Replace '192.168.1.5' with your computer's actual local IP address for device testing
const BASE_URL = 'http://192.168.1.45:4000/api/accounting';

export async function getInvoices() {
  const res = await fetch(`${BASE_URL}/invoices`);
  if (!res.ok) throw new Error('Failed to fetch invoices');
  return res.json();
}

export async function createInvoice(data) {
  const res = await fetch(`${BASE_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create invoice');
  return res.json();
}

export function getInvoicePdfUrl(invoiceId) {
  return `${BASE_URL}/invoices/${invoiceId}/pdf`;
}

export async function getReports() {
  const res = await fetch(`${BASE_URL}/reports`);
  if (!res.ok) throw new Error('Failed to fetch reports');
  return res.json();
}

export async function reconcileBank(data) {
  const res = await fetch(`${BASE_URL}/reconciliation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to reconcile bank');
  return res.json();
} 