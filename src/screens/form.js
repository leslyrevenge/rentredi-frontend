import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";

export const App = (props) => {
  const [form] = Form.useForm();
  const { onFinish, loading } = props;

  useEffect(() => {
    if (props.values) {
      const { fullname, zipcode } = props.values;
      form.setFieldsValue({ fullname, zipcode });
    }
  }, [props.values]);

  return (
    <Row>
      <Col span={24}>
        <Form
          layout="vertical"
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="zipcode"
            label="Zip Code "
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default App;
