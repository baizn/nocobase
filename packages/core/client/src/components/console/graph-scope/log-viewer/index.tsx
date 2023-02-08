import React from 'react';
import { Tabs, Row, Col, Divider, Form, Input, Button, DatePicker, Select, Space } from 'antd';
import type { TabsProps } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { json } from "@codemirror/lang-json";
import './index.less'
const onChange = (key: string) => {
    console.log(key);
};
// const [code, setCode] = useState('Oct 23 2019 17:06:35.664| [Radius Auth Proxy Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt')
const { Search } = Input;
let codeMirrorvalue = 'Oct 23 2019 17:06:35.664| [Radius Auth Proxy Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.665| [Radius Auth Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.664| [Radius Acct Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.737| [Radius Auth Proxy Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Auth Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Acct Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Auth Proxy Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Auth Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Acct Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt\n' +
    'Oct 23 2019 17:06:35.738| [Radius Auth Proxy Listener] [INFO ] org.tinyradius.util.RadiusServer [APPID:UPAM] thread interrupted...reinterrupt'
const stdout = () => {
    const onChanges = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
    }, []);
    return (
        <div>
            <Row>
                <Col span={24}>
                    <div className='log'>
                        <CodeMirror
                            value={codeMirrorvalue}
                            height="100%"
                            extensions={[json()]}
                            onChange={onChanges}
                        />
                    </div>

                </Col>
            </Row>
        </div>
    )
}

const App: React.FC = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Stdout`,
            children: stdout(),
        },
        {
            key: '2',
            label: `Stderr`,
            children: stdout(),
        }
    ];
    return (
        <>
            <div className="log_viewer">
                <div className='top_content'>
                    <Row>
                        <Col span={24}>
                            <h2 className='log_viewer_title'>Log Viewer</h2>
                        </Col>
                    </Row>
                </div>
                <div className='bottom_content'>
                    <Row>
                        <Col span={24}>
                            <Form
                                onFinish={onFinish}
                                labelCol={{ flex: '140px' }}
                                labelAlign="right"
                                wrapperCol={{ flex: 1 }}
                                form={form}
                            >
                                <Row>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Filter by Component"
                                            name="username"
                                        >
                                            <Select
                                                // defaultValue="Coordinator"
                                                options={[
                                                    {
                                                        value: 'Coordinator',
                                                        label: 'Coordinator',
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Filter by Pod"
                                            name="password"
                                        >
                                            <Select
                                                // defaultValue="almm-union-data-test-graphscope-s"
                                                options={[
                                                    {
                                                        value: 'almm-union-data-test-graphscope-s',
                                                        label: 'almm-union-data-test-graphscope-s',
                                                    },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="KeyWord"
                                            name="password"
                                        >
                                            <Search />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>

                                        <Form.Item
                                            label="History"
                                            name="history"
                                        >
                                            <DatePicker showTime style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}></Col>
                                    <Col span={8}>
                                        <div style={{ textAlign: 'right' }}>
                                            <Space>
                                                <Button style={{
                                                    width: '135px',
                                                    borderRadius: '6px'
                                                }} onClick={() => form.resetFields()}>Reset </Button>
                                                <Button className='btn'>Search </Button>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="log_viewer">
                <Tabs
                    className='bottom_content'
                    onChange={onChange}
                    items={items}
                />
            </div>
        </>
    )
}

export default App;