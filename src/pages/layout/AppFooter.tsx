import { Layout, Row, Col, Typography, Space, Divider, Button } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: "#001529", color: "#rgba(255, 255, 255, 0.65)", padding: "60px 50px 30px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: "#fff", marginBottom: "20px" }}>
              TodoList App
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.45)" }}>
              Giải pháp quản lý công việc thông minh giúp bạn tối ưu hóa thời gian và tăng năng suất làm việc mỗi ngày.
            </Text>
            <div style={{ marginTop: "20px" }}>
              <Space size="middle">
                <Button type="text" icon={<FacebookOutlined />} style={{ color: "#fff" }} />
                <Button type="text" icon={<TwitterOutlined />} style={{ color: "#fff" }} />
                <Button type="text" icon={<GithubOutlined />} style={{ color: "#fff" }} />
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>
              Liên kết
            </Title>
            <Space orientation="vertical">
              <Link href="#" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                Về chúng tôi
              </Link>
              <Link href="#" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                Tính năng
              </Link>
              <Link href="#" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                Hướng dẫn sử dụng
              </Link>
              <Link href="#" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                Chính sách bảo mật
              </Link>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>
              Liên hệ
            </Title>
            <Space orientation="vertical" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
              <Space align="start">
                <EnvironmentOutlined />
                <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
              </Space>
              <Space>
                <PhoneOutlined />
                <span>+84 123 456 789</span>
              </Space>
              <Space>
                <MailOutlined />
                <span>support@todolist.com</span>
              </Space>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "30px 0" }} />

        <div style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.45)" }}>
          <Text style={{ color: "rgba(255, 255, 255, 0.45)" }}>
            ©{new Date().getFullYear()} TodoList. Created by Dat.
          </Text>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
