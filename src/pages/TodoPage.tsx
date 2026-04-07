import { useState } from "react";
import { Card } from "antd";
import TodoInput from "components/todo/TodoInput";
import TodoFilter from "components/todo/TodoFilter";
import TodoList from "components/todo/TodoList";

type Todo = {
    id: number,
    title: string,
    completed: boolean
}
const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState("all");

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  const addTodo = (title: string) => {
    const newTodo = { id: getRandomArbitrary(1, 999999), title, completed: false };
    setTodos([newTodo, ...todos]);
  };

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
