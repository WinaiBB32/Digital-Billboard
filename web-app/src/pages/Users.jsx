import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import userService from "../services/userService";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      message.error("โหลดข้อมูลผู้ใช้ล้มเหลว",error);
    }
    setLoading(false);
  };

  const handleAddUser = async (values) => {
    try {
      await userService.createUser(values);
      message.success("เพิ่มผู้ใช้สำเร็จ");
      fetchUsers();
      setModalOpen(false);
    } catch (error) {
      message.error("เพิ่มผู้ใช้ล้มเหลว",error);
    }
  };

  const columns = [
    { title: "ชื่อผู้ใช้", dataIndex: "username" },
    { title: "อีเมล", dataIndex: "email" },
    { title: "สิทธิ์การใช้งาน", dataIndex: "role" },
  ];

  return (
    <div>
      <h2>👤 จัดการผู้ใช้</h2>
      <Button type="primary" onClick={() => setModalOpen(true)}>➕ เพิ่มผู้ใช้</Button>
      <Table dataSource={users} columns={columns} rowKey="id" loading={loading} />
      <Modal title="เพิ่มผู้ใช้" open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="username" label="ชื่อผู้ใช้" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="อีเมล" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="สิทธิ์การใช้งาน" rules={[{ required: true }]}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">เพิ่ม</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
