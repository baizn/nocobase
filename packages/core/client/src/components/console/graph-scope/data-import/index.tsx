import React from 'react';
import { Tabs, Row, Col, Card, Form, Input, Button, Space, DatePicker, Select } from 'antd';
import type { TabsProps } from 'antd';
import './index.less'
const onChange = (key: string) => {
  console.log(key);
};
const spark = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label=" "
          name="password"
          colon={false}
        >
          <a href="#">Use export configuration to build data import precess on Spark</a>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Download
            </Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
const stage = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <Card>
      <div style={{ margin: '0 3%' }}>
        <h4>Trgger ingest job by running this command by replacing:</h4>
        <h4>`${'-<path>with format'}${"protocol://<id>:<key>@endpoint/path/to/your/object"}` </h4>
        <a href="#">See more detail in doc.</a>
        <a href="#">curl https://xxxxx.studio.graphscope.io/dataimport?path=oss://`${'<id>:<key>@endpoint/bucket/object'}`</a>
        <h3>Or schedule a ingest job from the location:</h3>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Path"
          name="path"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Schedule"
          name="schedule"
          colon={false}
        >
          <DatePicker showTime style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Repeat"
          name="repeat"
          colon={false}
        >
          <Select
            defaultValue="No repeat"
            options={[
              {
                value: 'No repeat',
                label: 'No repeat',
              },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Schedule
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
const DataImport = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Generate Configuration for Spark`,
      children: spark(),
    },
    {
      key: '2',
      label: `Ingest Stage`,
      children: stage(),
    }
  ];
  return (
    <div className='top_content'>
      <Tabs
        onChange={onChange}
        items={items}
      />
    </div>
  )
}

export default DataImport;