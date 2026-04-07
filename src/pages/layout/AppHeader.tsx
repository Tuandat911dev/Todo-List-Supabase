import { useState } from "react";
import { Layout, Button, Avatar, Dropdown, Space, Typography, type MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const userMenuItems: MenuItem[] = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "Cài đặt",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => setIsLoggedIn(false),
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        background: "#fff",
        padding: "10px 20px",
        boxShadow: "0 2px 8px #f0f1f2",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            background: "#1677ff",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "12px",
          }}
        >
          <span style={{ color: "#white", fontWeight: "bold", fontSize: "20px" }}>✓</span>
        </div>
        <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
          TodoList
        </Typography.Title>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <Space
              style={{ cursor: "pointer", padding: "4px 8px", borderRadius: "6px", transition: "all 0.3s" }}
              className="user-dropdown"
            >
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068" }}
              />
              <Text strong>John Doe</Text>
            </Space>
          </Dropdown>
        ) : (
          <Space size="middle">
            <Button type="text" icon={<LoginOutlined />} onClick={() => setIsLoggedIn(true)}>
              Đăng nhập
            </Button>
            <Button type="primary" icon={<UserAddOutlined />} shape="round">
              Đăng ký
            </Button>
          </Space>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
