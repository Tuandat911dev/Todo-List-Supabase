import { useState } from "react";
import { Input, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface IProps {
  onAdd: (v: string) => void;
}

const TodoInput = (props: IProps) => {
  const [text, setText] = useState("");
  const { onAdd } = props;

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Nhập công việc cần làm..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleAdd}
          size="large"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
          Thêm
        </Button>
      </Space.Compact>
    </div>
  );
};

export default TodoInput;
