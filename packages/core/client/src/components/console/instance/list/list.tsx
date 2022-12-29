import { Form, Tabs } from "antd";
import React, { useState } from "react";
import { InstanceTable } from "./components/InstanceTable";
// @ts-ignore
import styles from "./list.module.less";
interface CrownImportFormType {
  name: string;
  version: string;
  ceator: string;
}

export const InstanceList: React.FC<{}> = ({}) => {
  const [activeKey, setActiveKey] = useState<string>("admin");
  const [form] = Form.useForm();

  const onValuesChange = async (
    changedValues: CrownImportFormType,
    allValues: CrownImportFormType
  ) => {
    console.log(allValues, "allValues");
  };
  const tabsChange = (key: string) => {
    setActiveKey(key);
  };
  return (
    <div className={styles["crowd-example"]}>
      <Tabs defaultActiveKey={activeKey} onChange={tabsChange}>
        <Tabs.TabPane tab="我的实例" key="admin" />
        <Tabs.TabPane tab="所有实例" key="all" />
      </Tabs>
      <Form
        form={form}
        initialValues={{ name: "", version: "", ceator: "" }}
        onValuesChange={onValuesChange}
      >
        <InstanceTable form={form} type={activeKey} domainCode="test_123" />
      </Form>
    </div>
  );
};
