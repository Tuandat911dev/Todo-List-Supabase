import { List, Checkbox, Button, Tag, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

interface IProp {
  dataSource: Todo[];
  onToggle: (v: number, c: boolean) => void;
  onDelete: (v: number) => void;
}

const TodoList = (props: IProp) => {
  const { dataSource, onToggle, onDelete } = props;
  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      locale={{ emptyText: "Không có công việc nào" }}
      pagination={{
        pageSize: 5,
        align: "center",
        hideOnSinglePage: true,
        style: { marginTop: 24 },
      }}
      renderItem={(item: Todo) => (
        <List.Item
          actions={[<Button type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(item.id)} />]}
        >
          <List.Item.Meta
            avatar={<Checkbox checked={item.completed} onChange={() => onToggle(item.id, item.completed)} />}
            title={
              <Typography.Text delete={item.completed} style={{ color: item.completed ? "#bfbfbf" : "inherit" }}>
                {item.title}
              </Typography.Text>
            }
            description={
              item.completed ? <Tag color="success">Hoàn thành</Tag> : <Tag color="processing">Đang làm</Tag>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default TodoList;
