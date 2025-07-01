import React, { useState } from 'react';
import { Modal, Button, Input, Select, DatePicker, Table, message, Card, Statistic, Row, Col, Space, Tag, Divider } from 'antd';
import { Wallet, Download, ArrowUpRight, ArrowDownRight, Bitcoin, CreditCard, Clock, AlertTriangle, TrendingUp, Eye, EyeOff } from 'lucide-react';

const { RangePicker } = DatePicker;
const { Option } = Select;

const WalletPage = () => {
  // State management
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [bitcoinModalVisible, setBitcoinModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [withdrawalMethod, setWithdrawalMethod] = useState('');
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountHolder: ''
  });

  // Mock data
  const walletData = {
    totalTokens: 47.5,
    totalUSD: 4750,
    pendingTokens: 12.3,
    pendingUSD: 1230,
    conversionRate: 100
  };

  const recentTransactions = [
    { id: 1, type: 'earned', amount: 5.0, usd: 500, description: 'Task: Website Redesign', date: '2024-06-28', status: 'completed' },
    { id: 2, type: 'earned', amount: 3.2, usd: 320, description: 'Task: Database Optimization', date: '2024-06-25', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: -10.0, usd: -1000, description: 'Bank Transfer', date: '2024-06-20', status: 'completed' },
    { id: 4, type: 'earned', amount: 7.8, usd: 780, description: 'Task: Mobile App Testing', date: '2024-06-18', status: 'completed' },
    { id: 5, type: 'earned', amount: 2.1, usd: 210, description: 'Task: Code Review', date: '2024-06-15', status: 'completed' }
  ];

  // Handlers
  const handleWithdrawal = () => {
    if (withdrawalMethod === 'bitcoin') {
      setBitcoinModalVisible(true);
      setWithdrawalModalVisible(false);
    } else if (withdrawalMethod === 'bank') {
      message.success('Bank transfer initiated successfully!');
      setWithdrawalModalVisible(false);
    }
  };

  const handleBitcoinWithdrawal = () => {
    if (bitcoinAddress.trim()) {
      message.success('Bitcoin withdrawal initiated successfully!');
      setBitcoinModalVisible(false);
      setBitcoinAddress('');
    } else {
      message.error('Please enter a valid Bitcoin address');
    }
  };

  const handleDownloadReport = () => {
    message.success('Transaction report will be downloaded shortly!');
    setReportModalVisible(false);
  };

  const transactionColumns = [
    {
      title: 'Transaction',
      dataIndex: 'type',
      key: 'type',
      render: (type, record) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${type === 'earned' ? 'bg-green-100' : 'bg-red-100'}`}>
            {type === 'earned' ? (
              <ArrowDownRight className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-red-600" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900">{record.description}</div>
            <div className="text-sm text-gray-500">{record.date}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount, record) => (
        <div className="text-right">
          <div className={`font-bold text-md ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {amount > 0 ? '+' : ''}{amount} TKN (Tokens)
          </div>
          <div className="text-sm text-gray-500">
            ${Math.abs(record.usd).toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <Tag
          color={status === 'completed' ? 'success' : 'processing'}
          className="px-3 py-1 rounded-full"
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[80vw] mx-auto p-6 mt-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mt-10 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    My Wallet
                  </h1>
                  <p className="text-gray-600 mt-1">Manage your earnings and withdrawals seamlessly</p>
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showBalance ? 'Hide' : 'Show'} Balance
            </Button>
          </div>
        </div>

        {/* Main Balance Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-green-600 to-indigo-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Balance</p>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-5xl font-bold text-white">
                      {showBalance ? `$${walletData.totalUSD.toLocaleString()}` : '$••••••'}
                    </span>
                    <span className="text-blue-200 text-xl">
                      {showBalance ? `${walletData.totalTokens} TKN (Tokens)` : '•••• TKN (Tokens)'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-green-300 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+12.5% this month</span>
                  </div>
                  <div className="text-blue-200 text-sm">1 TKN (Tokens) = $100 USD</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Pending Earnings</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {showBalance ? `$${walletData.pendingUSD.toLocaleString()}` : '$•••••'}
                  </div>
                  <div className="text-white/90 text-sm">
                    {showBalance ? `${walletData.pendingTokens} TKN (Tokens)` : '••• TKN (Tokens)'} awaiting confirmation
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex items-center gap-3 mb-3">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Available to Withdraw</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {showBalance ? `$${walletData.totalUSD.toLocaleString()}` : '$•••••'}
                  </div>
                  <div className="text-white/90 text-sm">Ready for immediate withdrawal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            type="primary"
            size="large"
            icon={<ArrowUpRight className="w-5 h-5" />}
            onClick={() => setWithdrawalModalVisible(true)}
            className="custom-color-btn border-0 rounded-xl px-8 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="font-semibold">Withdraw Funds</span>
          </Button>
          <Button
            size="large"
            icon={<Download className="w-5 h-5" />}
            onClick={() => setReportModalVisible(true)}
            className="rounded-xl px-8 py-3 h-auto border border-blue-500 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 hover:shadow-md"
          >
            <span className="font-medium">Download Report</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card
          className="rounded-2xl border-0 overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                <p className="text-gray-600 text-sm mt-1">Your latest earning and withdrawal activity</p>
              </div>
              <Button
                type="link"
                onClick={() => setReportModalVisible(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Button>
            </div>
          </div>

          <div className="p-8">
            <Table
              columns={transactionColumns}
              dataSource={recentTransactions}
              rowKey="id"
              pagination={false}
              showHeader={false}
              className="transaction-table"
              rowClassName="hover:bg-gray-50 transition-colors duration-200"
            />
          </div>
        </Card>

        {/* Withdrawal Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Withdraw Funds</span>
            </div>
          }
          open={withdrawalModalVisible}
          onCancel={() => setWithdrawalModalVisible(false)}
          footer={null}
          className="withdrawal-modal"
          width={600}
        >
          <div className="py-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Select Withdrawal Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    withdrawalMethod === 'bank'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => setWithdrawalMethod('bank')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">Bank Transfer</span>
                  </div>
                  <p className="text-sm text-gray-600">Direct transfer to your bank account</p>
                  <p className="text-xs text-gray-500 mt-2">Processing time: 1-3 business days</p>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    withdrawalMethod === 'bitcoin'
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => setWithdrawalMethod('bitcoin')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Bitcoin className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold text-gray-900">Bitcoin Wallet</span>
                  </div>
                  <p className="text-sm text-gray-600">Transfer to your Bitcoin address</p>
                  <p className="text-xs text-gray-500 mt-2">Processing time: 30-60 minutes</p>
                </div>
              </div>
            </div>

            {withdrawalMethod === 'bank' && (
              <div className="space-y-4 mb-6">
                <Input
                  placeholder="Account Holder Name"
                  size="large"
                  className="rounded-lg"
                  value={bankDetails.accountHolder}
                  onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})}
                />
                <Input
                  placeholder="Account Number"
                  size="large"
                  className="rounded-lg"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                />
                <Input
                  placeholder="Routing Number"
                  size="large"
                  className="rounded-lg"
                  value={bankDetails.routingNumber}
                  onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                size="large"
                onClick={() => setWithdrawalModalVisible(false)}
                className="flex-1 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleWithdrawal}
                disabled={!withdrawalMethod}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 border-0 rounded-lg"
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal>

        {/* Bitcoin Withdrawal Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bitcoin className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Bitcoin Withdrawal</span>
            </div>
          }
          open={bitcoinModalVisible}
          onCancel={() => setBitcoinModalVisible(false)}
          footer={null}
          width={600}
        >
          <div className="py-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Important Security Notice</h4>
                  <p className="text-red-800 text-sm leading-relaxed">
                    Please double-check your Bitcoin address before confirming. Cryptocurrency transactions are irreversible.
                    We are not liable for any loss of assets due to incorrect address entry.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Bitcoin Wallet Address
              </label>
              <Input.TextArea
                placeholder="Enter your Bitcoin wallet address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
                size="large"
                rows={4}
                className="rounded-lg"
                value={bitcoinAddress}
                onChange={(e) => setBitcoinAddress(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                Make sure this address supports Bitcoin (BTC) transactions
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="large"
                onClick={() => setBitcoinModalVisible(false)}
                className="flex-1 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleBitcoinWithdrawal}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 border-0 rounded-lg"
              >
                Confirm Withdrawal
              </Button>
            </div>
          </div>
        </Modal>

        {/* Report Download Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Download Report</span>
            </div>
          }
          open={reportModalVisible}
          onCancel={() => setReportModalVisible(false)}
          footer={null}
          width={500}
        >
          <div className="py-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date Range
                </label>
                <RangePicker
                  style={{ width: '100%' }}
                  size="large"
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Transaction Type
                </label>
                <Select
                  placeholder="All transactions"
                  style={{ width: '100%' }}
                  size="large"
                  defaultValue="all"
                  className="rounded-lg"
                >
                  <Option value="all">All Transactions</Option>
                  <Option value="earned">Earnings Only</Option>
                  <Option value="withdrawal">Withdrawals Only</Option>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                size="large"
                onClick={() => setReportModalVisible(false)}
                className="flex-1 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<Download className="w-4 h-4" />}
                onClick={handleDownloadReport}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 border-0 rounded-lg"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      </div>

      <style jsx global>{`
        .transaction-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f0f0f0;
          padding: 16px 0;
        }

        .transaction-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }

        .ant-modal-header {
          border-bottom: none;
          padding: 24px 24px 0;
        }

        .ant-modal-body {
          padding: 0 24px 24px;
        }
      `}</style>
    </div>
  );
};

export default WalletPage;
