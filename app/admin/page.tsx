"use client"
import React from 'react';
import Chart from 'react-apexcharts';

// Dummy analytics data
const analyticsData = {
  totalOrders: 1000,
  ordersReceived: 800,
  ordersDelivered: 600,
  ordersPending: 200,
  totalRevenue: 50000,
  totalExpenses: 30000,
  totalMoneyEarned: 20000,
};

const AnalyticsPage: React.FC = () => {
  // Data for bar chart
  const barChartData = {
    options: {
      chart: {
        id: 'orders-chart',
      },
      xaxis: {
        categories: ['Total Orders', 'Orders Received', 'Orders Delivered', 'Orders Pending'],
      },
    },
    series: [
      {
        name: 'Count',
        data: [
          analyticsData.totalOrders,
          analyticsData.ordersReceived,
          analyticsData.ordersDelivered,
          analyticsData.ordersPending,
        ],
      },
    ],
  };

  // Data for pie chart
  const pieChartData = {
    options: {
      labels: ['Total Revenue', 'Total Expenses', 'Total Money Earned'],
    },
    series: [analyticsData.totalRevenue, analyticsData.totalExpenses, analyticsData.totalMoneyEarned],
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/2 px-4 py-2">
        <h2 className="text-lg font-semibold mb-2">Orders Overview</h2>
        <Chart options={barChartData.options} series={barChartData.series} type="bar" height={350} />
      </div>
      <div className="w-full md:w-1/2 px-4 py-2">
        <h2 className="text-lg font-semibold mb-2">Financial Overview</h2>
        <Chart options={pieChartData.options} series={pieChartData.series} type="pie" height={350} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
