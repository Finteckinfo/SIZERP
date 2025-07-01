import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Avatar,
  Button,
  Typography,
  Statistic,
  Spin,
  message,
  Row,
  Col
} from 'antd';
import {
  EditOutlined,
  DollarOutlined,
  CalendarOutlined,
  RiseOutlined,
  FallOutlined,
  AimOutlined,
  TeamOutlined,
  GiftOutlined,
  MessageOutlined,
  FileTextOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// API service functions
const fetchCreatorData = async (creatorId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  const mockUsers = {
    user123: {
      id: 'user123',
      name: 'Alice Wonderland',
      profileImage: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=AW&font=roboto',
      monthlyGoal: 7000,
    },
    user456: {
      id: 'user456',
      name: 'Bob The Creator',
      profileImage: 'https://placehold.co/100x100/10B981/FFFFFF?text=BC&font=roboto',
      monthlyGoal: 5500,
    }
  };

  const creator = mockUsers[creatorId];
  if (!creator) {
    throw new Error('Creator not found');
  }

  return creator;
};

    const StatsContent = ({ data }) => {
        if (!data) return <div>No stats data available</div>;

        return (
            <div className='space-y-4'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='bg-blue-50 p-4 rounded-lg text-center'>
                        <h3 className='text-2xl font-bold text-blue-600'>{data.totalSubscriptions || 0}</h3>
                        <p className='text-sm text-gray-600'>Total Subscriptions</p>
                    </div>
                    <div className='bg-green-50 p-4 rounded-lg text-center'>
                        <h3 className='text-2xl font-bold text-green-600'>${parseFloat(data.totalRevenue || 0).toFixed(2)}</h3>
                        <p className='text-sm text-gray-600'>Total Revenue</p>
                    </div>
                    <div className='bg-purple-50 p-4 rounded-lg text-center'>
                        <h3 className='text-2xl font-bold text-purple-600'>{data.totalPosts || 0}</h3>
                        <p className='text-sm text-gray-600'>Total Posts</p>
                    </div>
                    <div className='bg-orange-50 p-4 rounded-lg text-center'>
                        <h3 className='text-2xl font-bold text-orange-600'>{data.totalMessages || 0}</h3>
                        <p className='text-sm text-gray-600'>Total Messages</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-semibold mb-2'>Monthly Growth</h4>
                        <p className='text-green-600'>+{data.monthlyGrowth || 0}% this month</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-semibold mb-2'>Engagement Rate</h4>
                        <p className='text-blue-600'>{data.engagementRate || 0}%</p>
                    </div>
                </div>
            </div>
        );
    };


const fetchTransactionData = async (creatorId) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const seed = creatorId === 'user123' ? 1 : creatorId === 'user456' ? 1.2 : 0.8;
  const data = [];
  let mtdSubs = 0, mtdTips = 0, mtdPosts = 0, mtdMessages = 0, mtdTotalGross = 0;

  for (let i = 1; i <= 28; i++) {
    const date = `2025-05-${String(i).padStart(2, '0')}`;
    const dailySubs = (Math.random() * (i % 7 === 0 ? 150 : 50) + 5) * seed;
    const dailyTips = (Math.random() * (i % 5 === 0 ? 100 : 30) + 2) * seed;
    const dailyPosts = (Math.random() * 20 + 1) * seed;
    const dailyMessages = (Math.random() * 40 + 10) * seed;

    mtdSubs += dailySubs;
    mtdTips += dailyTips;
    mtdPosts += dailyPosts;
    mtdMessages += dailyMessages;

    const dailyTotalGross = dailySubs + dailyTips + dailyPosts + dailyMessages;
    mtdTotalGross += dailyTotalGross;

    data.push({
      key: date,
      date,
      subscriptions_daily: dailySubs,
      subscriptions_monthly: mtdSubs,
      tips_daily: dailyTips,
      tips_monthly: mtdTips,
      posts_daily: dailyPosts,
      posts_monthly: mtdPosts,
      messages_daily: dailyMessages,
      messages_monthly: mtdMessages,
      total_gross_daily: dailyTotalGross,
      total_gross_monthly: mtdTotalGross,
      fan_count: Math.floor((1200 + Math.random() * 20 + i * 2) * seed),
    });
  }

  return data;
};

// Helper functions
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

// Components
const UserProfileCard = ({ creator, loading, onEdit }) => (
  <Card className="mb-6">
    <Spin spinning={loading}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            size={64}
            src={creator?.profileImage}
            icon={<UserOutlined />}
          >
            {creator?.name?.substring(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <Title level={3} className="mb-1">
              {creator?.name || 'Loading...'}
            </Title>
            <Text type="secondary">
              User ID: {creator?.id || 'Loading...'}
            </Text>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={onEdit}
          disabled={loading}
        >
          Edit User
        </Button>
      </div>
    </Spin>
  </Card>
);

const SummaryCards = ({ transactions, loading }) => {
  const summaryData = useMemo(() => {
    if (!transactions.length) return null;

    const summary = {
      subscriptions_total: 0,
      tips_total: 0,
      posts_total: 0,
      chat_messages_total: 0,
      referrals_total: Math.random() * 500,
      chargebacks_total: Math.random() * 200,
    };

    transactions.forEach(t => {
      summary.subscriptions_total += t.subscriptions_daily;
      summary.tips_total += t.tips_daily;
      summary.posts_total += t.posts_daily;
      summary.chat_messages_total += t.messages_daily;
    });

    summary.total_gross_summary =
      summary.subscriptions_total +
      summary.tips_total +
      summary.posts_total +
      summary.chat_messages_total;

    return summary;
  }, [transactions]);

  const summaryItems = useMemo(() => [
    {
      icon: <DollarOutlined className="text-blue-500" />,
      label: 'Subscriptions',
      value: summaryData?.subscriptions_total || 0,
      valueStyle: { color: '#1890ff' }
    },
    {
      icon: <GiftOutlined className="text-green-500" />,
      label: 'Tips',
      value: summaryData?.tips_total || 0,
      valueStyle: { color: '#52c41a' }
    },
    {
      icon: <FileTextOutlined className="text-purple-500" />,
      label: 'Posts',
      value: summaryData?.posts_total || 0
    },
    {
      icon: <MessageOutlined className="text-orange-500" />,
      label: 'Messages',
      value: summaryData?.chat_messages_total || 0
    },
    {
      icon: <TeamOutlined className="text-indigo-500" />,
      label: 'Referrals',
      value: summaryData?.referrals_total || 0
    },
    {
      icon: <AimOutlined className="text-blue-600" />,
      label: 'Total Gross',
      value: summaryData?.total_gross_summary || 0,
      valueStyle: { color: '#1890ff', fontWeight: 'bold' }
    },
    {
      icon: <FallOutlined className="text-red-500" />,
      label: 'Chargebacks',
      value: summaryData?.chargebacks_total || 0,
      valueStyle: { color: '#ff4d4f' }
    }
  ], [summaryData]);

  return (
    <Card title="Summary (May 1-31, 2025)" className="mb-6">
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {summaryItems.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Statistic
                title={
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                }
                value={item.value}
                formatter={(value) => formatCurrency(value)}
                valueStyle={item.valueStyle}
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </Card>
  );
};

const TransactionsTable = ({ transactions, creator, loading }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      width: 80,
      render: (date) => new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
    },
    {
      title: 'Subscriptions',
      children: [
        {
          title: 'Daily',
          dataIndex: 'subscriptions_daily',
          key: 'subscriptions_daily',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        },
        {
          title: 'Monthly',
          dataIndex: 'subscriptions_monthly',
          key: 'subscriptions_monthly',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        }
      ]
    },
    {
      title: 'Tips',
      children: [
        {
          title: 'Daily',
          dataIndex: 'tips_daily',
          key: 'tips_daily',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        },
        {
          title: 'Monthly',
          dataIndex: 'tips_monthly',
          key: 'tips_monthly',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        }
      ]
    },
    {
      title: 'Posts',
      children: [
        {
          title: 'Daily',
          dataIndex: 'posts_daily',
          key: 'posts_daily',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        },
        {
          title: 'Monthly',
          dataIndex: 'posts_monthly',
          key: 'posts_monthly',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        }
      ]
    },
    {
      title: 'Messages',
      children: [
        {
          title: 'Daily',
          dataIndex: 'messages_daily',
          key: 'messages_daily',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        },
        {
          title: 'Monthly',
          dataIndex: 'messages_monthly',
          key: 'messages_monthly',
          width: 100,
          render: (value) => formatCurrency(value),
          align: 'right'
        }
      ]
    },
    {
      title: 'Total Gross',
      children: [
        {
          title: 'Daily',
          dataIndex: 'total_gross_daily',
          key: 'total_gross_daily',
          width: 120,
          render: (value) => (
            <span className="font-semibold text-blue-600">
              {formatCurrency(value)}
            </span>
          ),
          align: 'right'
        },
        {
          title: 'Monthly',
          dataIndex: 'total_gross_monthly',
          key: 'total_gross_monthly',
          width: 120,
          render: (value) => (
            <span className="font-semibold text-blue-600">
              {formatCurrency(value)}
            </span>
          ),
          align: 'right'
        }
      ]
    },
    {
      title: 'Fans',
      dataIndex: 'fan_count',
      key: 'fan_count',
      width: 80,
      render: (value) => value.toLocaleString(),
      align: 'right'
    },
    {
      title: 'Monthly Goal',
      children: [
        {
          title: 'Target',
          key: 'monthly_goal',
          width: 100,
          render: () => formatCurrency(creator?.monthlyGoal || 0),
          align: 'right'
        },
        {
          title: 'Difference',
          key: 'monthly_goal_difference',
          width: 120,
          render: (_, record) => {
            const difference = (creator?.monthlyGoal || 0) - record.total_gross_monthly;
            const isPositive = difference >= 0;
            return (
              <span className={`font-semibold flex items-center gap-1 ${
                isPositive ? 'text-red-500' : 'text-green-500'
              }`}>
                {formatCurrency(Math.abs(difference))}
                {isPositive ? <FallOutlined /> : <RiseOutlined />}
              </span>
            );
          },
          align: 'right'
        }
      ]
    }
  ];

  return (
    <Card title="Daily Transactions - May 2025" className="mb-6">
      <Table
        columns={columns}
        dataSource={transactions}
        loading={loading}
        scroll={{ x: 1200 }}
        size="small"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} transactions`
        }}
      />
    </Card>
  );
};

// Main component
const CreatorStats = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [creatorLoading, setCreatorLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCreatorData = async () => {
      try {
        setCreatorLoading(true);
        const creatorData = await fetchCreatorData(creatorId);
        setCreator(creatorData);
      } catch (err) {
        setError(err.message);
        message.error(`Failed to load creator data: ${err.message}`);
      } finally {
        setCreatorLoading(false);
      }
    };

    const loadTransactionData = async () => {
      try {
        setTransactionsLoading(true);
        const transactionData = await fetchTransactionData(creatorId);
        setTransactions(transactionData);
      } catch (err) {
        setError(err.message);
        message.error(`Failed to load transaction data: ${err.message}`);
      } finally {
        setTransactionsLoading(false);
      }
    };

    if (creatorId) {
      loadCreatorData();
      loadTransactionData();
    }
  }, [creatorId]);

  const handleEditUser = () => {
    if (creator) {
      message.info(`Edit user ${creator.name} (ID: ${creator.id})`);
      // Implement edit functionality here
    }
  };

  const isLoading = creatorLoading || transactionsLoading;

  if (error && !creator && !transactions.length) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <div className="text-center py-12">
              <Title level={3} type="danger">Error Loading Data</Title>
              <Text type="secondary">{error}</Text>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <UserProfileCard
          creator={creator}
          loading={creatorLoading}
          onEdit={handleEditUser}
        />

        <SummaryCards
          transactions={transactions}
          loading={transactionsLoading}
        />

        <TransactionsTable
          transactions={transactions}
          creator={creator}
          loading={transactionsLoading}
        />
      </div>
    </div>
  );
};

export default CreatorStats;
