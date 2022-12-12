import React, { useState } from 'react';
import { Drawer, Form, Input, Space, Button, Modal } from 'antd';

export type CreateProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (params: any) => void;
};

export const CreateDomain = ({ visible, onClose, onCreate }: CreateProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateDomain = async () => {
    const values = await form.validateFields();
    setLoading(true);
    onCreate(values);
    setLoading(false);
  };
  return (
    <Modal
      title="新建域"
      visible={visible}
      onClose={onClose}
      width={520}
      footerStyle={{ textAlign: 'right' }}
      footer={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button onClick={handleCreateDomain} type="primary" loading={loading}>
            确定
          </Button>
        </Space>
      }
    >
      <Form name="create-domain-form" form={form} layout="vertical">
        <Form.Item label="域名称" name="domainName" rules={[{ required: true, message: '域名称必填!' }]}>
          <Input placeholder="请输入域名称" />
        </Form.Item>

        <Form.Item label="域编码" name="domainCode" rules={[{ required: true, message: '域编码必填!' }]}>
          <Input placeholder="请输入域编码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
