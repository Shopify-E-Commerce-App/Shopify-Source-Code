"use client"

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import 'tailwindcss/tailwind.css';

// Define types for order items
interface OrderItem {
  id: number;
  name: string;
  price: number;
}

// Define dummy order data
interface OrderData {
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  total: number;
}

const orderData: OrderData = {
  orderId: 'ORD123456',
  orderDate: 'May 10, 2024',
  items: [
    { id: 1, name: 'Product A', price: 50 },
    { id: 2, name: 'Product B', price: 60 },
    { id: 3, name: 'Product C', price: 70 },
  ],
  total: 180,
};

// PDF receipt component
const ReceiptPDF: React.FC = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Order Receipt</Text>
        <Text style={styles.text}>Order ID: {orderData.orderId}</Text>
        <Text style={styles.text}>Order Date: {orderData.orderDate}</Text>
        <Text style={styles.text}>Items:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Name</Text>
            <Text style={styles.tableHeader}>Price</Text>
          </View>
          {orderData.items.map(item => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>${item.price}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.text}>Total: ${orderData.total}</Text>
      </View>
    </Page>
  </Document>
);

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    border: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
  },
  tableHeader: {
    width: '50%',
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    width: '50%',
    padding: 5,
  },
});

// YourOrdersPage component
const YourOrdersPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Your Orders</h1>
      <div className="flex justify-center mb-8">
        <PDFDownloadLink document={<ReceiptPDF />} fileName="receipt.pdf">
          {({ loading }) =>
            loading ? (
              <span>Loading...</span>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                Download Receipt
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
      <div className="border border-gray-300 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="mb-4">Order ID: {orderData.orderId}</p>
        <p className="mb-4">Order Date: {orderData.orderDate}</p>
        <p className="mb-4">Items:</p>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderData.items.map(item => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xl font-semibold flex justify-end pr-5">Total: ${orderData.total}</p>
      </div>
    </div>
  );
};

export default YourOrdersPage;
