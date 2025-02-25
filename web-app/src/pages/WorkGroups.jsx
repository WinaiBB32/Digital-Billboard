import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import workGroupService from "../services/workGroupService";

const WorkGroups = () => {
  const [workGroups, setWorkGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchWorkGroups();
  }, []);

  const fetchWorkGroups = async () => {
    setLoading(true);
    try {
      const response = await workGroupService.getWorkGroups();
      setWorkGroups(response.data);
    } catch (error) {
      message.error("โหลดข้อมูลกลุ่มงานล้มเหลว", error);
    }
    setLoading(false);
  };

  const handleAddWorkGroup = async (values) => {
    try {
      await workGroupService.createWorkGroup(values);
      message.success("เพิ่มกลุ่มงานสำเร็จ");
      fetchWorkGroups();
      setModalOpen(false);
    } catch (error) {
      message.error("เพิ่มกลุ่มงานล้มเหลว", error);
    }
  };

  const columns = [
    { title: "ชื่อกลุ่มงาน", dataIndex: "group_name" },
    { title: "คำอธิบาย", dataIndex: "description" },
  ];

  return (
    <div>
      <h2>🏢 จัดการกลุ่มงาน</h2>
      <Button type="primary" onClick={() => setModalOpen(true)}>➕ เพิ่มกลุ่มงาน</Button>
      <Table dataSource={workGroups} columns={columns} rowKey="id" loading={loading} />
      <Modal title="เพิ่มกลุ่มงาน" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddWorkGroup}>
          <Form.Item name="group_name" label="ชื่อกลุ่มงาน" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="คำอธิบาย">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">เพิ่ม</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkGroups;
