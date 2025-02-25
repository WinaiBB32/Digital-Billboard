import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";
import actingDirectorService from "../services/actingDirectorService";

const ActingDirector = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    setLoading(true);
    try {
      const response = await actingDirectorService.getDirectors();
      setDirectors(response.data);
    } catch (error) {
      message.error("โหลดข้อมูลล้มเหลว",error);
    }
    setLoading(false);
  };

  const handleAddDirector = async (values) => {
    try {
      await actingDirectorService.createDirector(values);
      message.success("เพิ่มข้อมูลสำเร็จ");
      fetchDirectors();
      setModalOpen(false);
    } catch (error) {
      message.error("เพิ่มข้อมูลล้มเหลว",error);
    }
  };

  const columns = [
    { title: "ชื่อผู้รักษาการ", dataIndex: "acting_person" },
    { title: "วันที่เริ่ม", dataIndex: "start_date" },
    { title: "วันที่สิ้นสุด", dataIndex: "end_date" },
  ];

  return (
    <div>
      <h2>📝 บันทึกรักษาการแทน ผอ.</h2>
      <Button type="primary" onClick={() => setModalOpen(true)}>➕ เพิ่มข้อมูล</Button>
      <Table dataSource={directors} columns={columns} rowKey="id" loading={loading} />
      <Modal title="เพิ่มข้อมูลรักษาการ" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddDirector}>
          <Form.Item name="acting_person" label="ชื่อผู้รักษาการ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="start_date" label="วันที่เริ่ม" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="end_date" label="วันที่สิ้นสุด" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit">เพิ่ม</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ActingDirector;
