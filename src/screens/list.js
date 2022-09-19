import React from "react";
import { Row, Col, Table, Space } from "antd";

export default function UserList(props) {
  const { onDetail, onDelete, onEdit } = props;
  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Zip Code",
      dataIndex: "zipcode",
      key: "zipcode",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <div
            key={0}
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => onDetail(record)}
          >
            Details
          </div>
          <div
            key={1}
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => onEdit(record)}
          >
            Edit
          </div>
          <div
            key={2}
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Table dataSource={props.data} columns={columns} />;
      </Col>
    </Row>
  );
}
