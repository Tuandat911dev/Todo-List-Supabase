import { useEffect, useState } from "react";
import { Card, message, Typography, Button, Space } from "antd";
import TodoInput from "components/todo/TodoInput";
import TodoFilter from "components/todo/TodoFilter";
import TodoList from "components/todo/TodoList";
import { supabase } from "@/utils/supabase";
import { LoginOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useCurrentApp } from "@/context/app.context";
import { createTodo, deleteTodo, fetchTodos } from "@/services/api/todo/todo.api";

const { Title, Text } = Typography;

const TodoPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useCurrentApp();

  useEffect(() => {
    if (isAuthenticated && user) {
      const loadTodo = async () => {
        try {
          const data: ITodo[] = await fetchTodos(user);
          setTodos(data || []);
        } catch (error: unknown) {
          message.error("Không thể tải dữ liệu!");
          console.error(error);
        }
      };

      loadTodo();
    }
  }, [isAuthenticated, user]);

  async function addTodo(title: string) {
    if (!title.trim()) return;
    try {
      const data: ITodo[] = await createTodo(title);
      setTodos([data[0], ...todos]);
    } catch (error: unknown) {
      message.error("Không thể tạo mới todo");
      console.error(error);
    }
  }

  async function toggleTodo(id: number, currentStatus: boolean) {
    const { error } = await supabase.from("todos").update({ completed: !currentStatus }).eq("id", id);
    if (error) message.error("Không thể cập nhật!");
    else setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !currentStatus } : t)));
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
      message.success("Đã xoá công việc");
    } catch (error: unknown) {
      message.error("Lỗi khi xoá!");
      console.error(error);
    }
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div
        style={{ textAlign: "center", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Space orientation="vertical" size="large">
          <Title level={1} style={{ fontSize: "64px", marginBottom: 0 }}>
            TODO APP
          </Title>
          <Text type="secondary" style={{ fontSize: "18px" }}>
            Vui lòng <Link to="/login">đăng nhập</Link> để quản lý công việc của bạn hiệu quả hơn.
          </Text>
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            onClick={() => navigate("/login")}
            style={{ height: "50px", padding: "0 40px", borderRadius: "8px" }}
          >
            Đăng nhập ngay
          </Button>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <Card title="DANH SÁCH CÔNG VIỆC" variant={"borderless"} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <TodoInput onAdd={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList dataSource={filteredTodos} onToggle={toggleTodo} onDelete={handleDeleteTodo} />
      </Card>
    </div>
  );
};

export default TodoPage;