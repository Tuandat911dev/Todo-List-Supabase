import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { signInUser } from "@/utils/supabase";
import { Link, useNavigate } from "react-router";


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = await signInUser(values.email, values.password);
      if (data.session) {
        message.success("Chào mừng quay trở lại!");
        navigate("/"); 
      }
    } catch (error: any) {
      message.error("Email hoặc mật khẩu không chính xác");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Đăng nhập
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Nhập email!" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Nhập mật khẩu!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Đăng nhập
          </Button>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            Chưa có tài khoản? <Link to="/signup">Đăng ký mới</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
