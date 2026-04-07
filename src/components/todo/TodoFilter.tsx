import { Segmented, Typography } from "antd";

interface IProps {
  currentFilter: string;
  onFilterChange: (v: string) => void;
}

const TodoFilter = (props: IProps) => {
  const { currentFilter, onFilterChange } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <Typography.Text strong>Trạng thái:</Typography.Text>
      <Segmented
        options={[
          { label: "Tất cả", value: "all" },
          { label: "Chưa xong", value: "active" },
          { label: "Đã xong", value: "completed" },
        ]}
        value={currentFilter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default TodoFilter;
