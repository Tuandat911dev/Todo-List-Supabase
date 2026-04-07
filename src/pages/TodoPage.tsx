import { useEffect, useState } from "react";
import { Card, message } from "antd";
import TodoInput from "components/todo/TodoInput";
import TodoFilter from "components/todo/TodoFilter";
import TodoList from "components/todo/TodoList";
import { supabase } from "@/utils/supabase";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase.from("todos").select("*").order("id", { ascending: false });

      if (error) message.error("Không thể tải dữ liệu!");
      else setTodos(data || []);
    }

    fetchTodos();
  }, []);

  async function addTodo(title: string) {
    if (!title.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: title, completed: false }])
      .select();

    if (error) {
      message.error("Lỗi khi thêm mới!");
    } else {
      setTodos([data[0], ...todos]);
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <Card title="DANH SÁCH CÔNG VIỆC" variant={"borderless"} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <TodoInput onAdd={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList dataSource={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </Card>
    </div>
  );
};

export default TodoPage;
