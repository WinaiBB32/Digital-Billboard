
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="ขออภัย ไม่พบหน้าที่คุณต้องการ"
      extra={<Button type="primary" onClick={() => navigate("/")}>กลับหน้าหลัก</Button>}
    />
  );
};

export default NotFound;
