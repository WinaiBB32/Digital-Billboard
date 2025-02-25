import { useEffect, useState } from "react";
import { Card, Row, Col, Table } from "antd";
import dashboardService from "../services/dashboardService";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [meetingStats, setMeetingStats] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userResponse = await dashboardService.getUserCount();
      const meetingResponse = await dashboardService.getMeetingStats();
      setUserCount(userResponse.data.count);
      setMeetingStats(meetingResponse.data);
    } catch (error) {
      console.error("❌ Error loading dashboard data:", error);
    }
  };

  return (
    <div>
      <h2>📊 Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="👤 จำนวนผู้ใช้งาน" bordered>
            <h2>{userCount}</h2>
          </Card>
        </Col>
      </Row>
      <h3>📅 จำนวนประชุมแยกตามกลุ่มงานแต่ละเดือน</h3>
      <Table dataSource={meetingStats} rowKey="id" />
    </div>
  );
};

export default Dashboard;
