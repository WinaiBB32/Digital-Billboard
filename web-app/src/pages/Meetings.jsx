import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, DatePicker } from "antd";
import meetingService from "../services/meetingService";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const response = await meetingService.getMeetings();
      setMeetings(response.data);
    } catch (error) {
      message.error("โหลดข้อมูลประชุมล้มเหลว",error);
    }
    setLoading(false);
  };

  const handleAddMeeting = async (values) => {
    try {
      await meetingService.createMeeting(values);
      message.success("เพิ่มประชุมสำเร็จ");
      fetchMeetings();
      setModalOpen(false);
    } catch (error) {
      message.error("เพิ่มประชุมล้มเหลว",error);
    }
  };

  const columns = [
    { title: "หัวข้อประชุม", dataIndex: "title" },
    { title: "วันที่ประชุม", dataIndex: "meeting_date" },
    { title: "สถานที่", dataIndex: "location" },
  ];

  return (
    <div>
      <h2>📅 ตารางประชุม</h2>
      <Button type="primary" onClick={() => setModalOpen(true)}>➕ เพิ่มประชุม</Button>
      <Table dataSource={meetings} columns={columns} rowKey="id" loading={loading} />
      <Modal
        title="เพิ่มประชุม"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddMeeting}>
          <Form.Item name="title" label="หัวข้อประชุม" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="meeting_date" label="วันที่ประชุม" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="location" label="สถานที่ประชุม" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">เพิ่ม</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Meetings;
