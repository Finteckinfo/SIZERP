import React, { useState } from "react";
import { Card, Table, Typography, Space, Button, Avatar, Popconfirm, message } from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const initialClients = [
    { key: "1", name: "Acme Corp", contact: "acme@example.com", status: "Active", projects: 3 },
    { key: "2", name: "Globex Ltd", contact: "globex@example.com", status: "Inactive", projects: 1 },
    { key: "3", name: "Stark Industries", contact: "stark@example.com", status: "Active", projects: 5 },
    { key: "4", name: "Wayne Enterprises", contact: "wayne@example.com", status: "Active", projects: 2 },
];

const UsersPage = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState(initialClients);

    const handleDelete = (key) => {
        setClients(clients.filter(client => client.key !== key));
        message.success("Client deleted successfully");
    };

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: () => (
                <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
            ),
        },
        { title: "Client Name", dataIndex: "name", key: "name" },
        { title: "Contact Email", dataIndex: "contact", key: "contact" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Projects", dataIndex: "projects", key: "projects" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this client?"
                    onConfirm={() => handleDelete(record.key)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div style={{ width: "100%", margin: "40px auto", padding: "20px" }}>
            <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: "20px" }}>
                <Title level={2}>Clients</Title>
                <Button type="primary" onClick={() => navigate("/create-client")}>+ Add New Client</Button>
            </Space>

            {/* Overview Cards */}
            <Space size="large" style={{ display: "flex", marginBottom: "20px" }}>
                <Card title="Total Clients" bordered style={{ width: 250 }}>
                    <Title level={3}>{clients.length}</Title>
                </Card>
                <Card title="Active Clients" bordered style={{ width: 250 }}>
                    <Title level={3}>{clients.filter(client => client.status === "Active").length}</Title>
                </Card>
            </Space>

            {/* Clients Table */}
            <Table
                dataSource={clients}
                columns={columns}
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default UsersPage;
