import { Table, Card } from "antd";

const ActivityLogSettings = () => {
    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Event",
            dataIndex: "event",
            key: "event",
        },
        {
            title: "Performed On",
            dataIndex: "performedOn",
            key: "performedOn",
        },
        {
            title: "Performed By",
            dataIndex: "performedBy",
            key: "performedBy",
        },
        {
            title: "Details",
            dataIndex: "details",
            key: "details",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    const data = [
        {
            key: "1",
            type: "Default",
            event: "created",
            performedOn: "Test",
            performedBy: "Admin",
            details: `Password Updated\nAttributes: { "active": true, "archived": 0, "password": "Password has been updated", "on_board_date": "2024-01-01T00:00:00.000000Z", "off_board_date": null }\nOld: []`,
            date: "Mar 21, 2025 03:22:26",
        },
        {
            key: "2",
            type: "System",
            event: "onlyfans.auth",
            performedOn: "test",
            performedBy: "System",
            details: "Failed to authenticate",
            date: "Mar 4, 2025 00:12:34",
        },
        {
            key: "3",
            type: "System",
            event: "onlyfans.auth",
            performedOn: "test",
            performedBy: "System",
            details: "Failed to authenticate",
            date: "Mar 4, 2025 00:04:43",
        },
        {
            key: "4",
            type: "Default",
            event: "created",
            performedOn: "test",
            performedBy: "Admin",
            details: `Password Updated\nAttributes: { "active": false, "archived": 0, "password": "Password has been updated", "on_board_date": "2025-02-25T00:00:00.000000Z", "off_board_date": null }\nOld: []`,
            date: "Mar 3, 2025 23:50:35",
        },
    ];

    return (
        <Card title="Activity Log Settings" className="shadow-none">
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </Card>
    );
};

export default ActivityLogSettings;
