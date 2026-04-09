import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpUser } from "@/services/api/auth/auth.api";
import { useNavigate, Link } from "react-router";

type TSignup = {
  email: string;
  password: string;
  username: string;
}

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: TSignup) => {
    setLoading(true);
    try {
      await signUpUser(values.email, values.password, values.username);
      message.success("Đăng ký thành công! Hãy kiểm tra email xác nhận.");
      navigate("/login");
    } catch (error: unknown) {
      message.error("Đăng ký thất bại");
      console.error(error);
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
          Đăng ký
        </Typography.Title>
        <Form<TSignup> layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Nhập tên hiển thị!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Email không hợp lệ!" }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, min: 6, message: "Mật khẩu ít nhất 6 ký tự!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Tạo tài khoản
          </Button>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
