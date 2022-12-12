import React, { useState } from 'react';
import { Drawer, Row, Col, Input, Button, Space, notification, Modal } from 'antd';
import { applyJoinDomain } from './service';

interface ApplyDomainProps {
  type: 'user' | 'admin';
  domainCode: string;
  visible: boolean;
  onClose: () => void;
}
const ApplyDomain: React.FC<ApplyDomainProps> = ({ type, domainCode, visible, onClose }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const handleValueChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleApply = async () => {
    setLoading(true);
    const result = await applyJoinDomain(domainCode, type, value);

    setLoading(false);
    if (result) {
      onClose();
      const { name, url } = result;
      notification.success({
        message: `${name} 成功`,
        description: (
          <>
            {type === 'user' ? '申请加入域提交成功' : '申请成为域管理员提交成功'}
            <br />
            <a href={url}>点击查看审批详情</a>
          </>
        ),
      });
    }
  };

  return (
    <Modal
      title={type === 'user' ? '申请加入用户域' : '申请用户域管理员'}
      visible={visible}
      onCancel={onClose}
      okText="申请"
      cancelText="取消"
      onOk={handleApply}
      confirmLoading={loading}
      width={450}
    >
      <Row style={{ marginBottom: 16 }}>
        <Col span={4}>域名称：</Col>
        <Col span={18}>{domainCode}</Col>
      </Row>
      <Row>
        <Col span={4}>备注：</Col>
        <Col span={18}>
          <Input.TextArea rows={4} onChange={handleValueChange} />
        </Col>
      </Row>
    </Modal>
  );
};

export default ApplyDomain;
