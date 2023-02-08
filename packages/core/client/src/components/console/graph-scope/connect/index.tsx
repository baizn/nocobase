import React from 'react';
import { Tabs, Row, Col, Divider, Card, message, Image, Space } from 'antd';
import type { TabsProps } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { json } from "@codemirror/lang-json";
import { CopyOutlined } from '@ant-design/icons';
import './index.less'
const onChange = (key: string) => {
    console.log(key);
};
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
/**
* 返回当前元素的文本内容
* @parm {DOM} element 当前DOM元素
*/
function selectText(element: HTMLElement) {
    return element?.innerText;
}
/**
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
function copyText(text: string) {
    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaC.value = text;
    document.body.appendChild(textareaC); //将textarea添加为body子元素
    textareaC.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaC);//移除DOM元素
    message.info('Copy Succeeded!')
    return res;
}
function myFun(key: string) {
    copyText(selectText(document.getElementById(key)));
}
const copyData = (id: string, type: string) => {
    return (
        <div className='child_title'><span id={id}>{type}</span><CopyOutlined onClick={() => myFun(id)} style={{ marginLeft: '16px' }} /></div>
    )
}
const stdout = (type: string) => {
    const onChanges = React.useCallback((value: any, viewUpdate: any) => {
        console.log('value:', value);
    }, []);

    return (
        <Card>
            <Row>
                <Col span={12}>
                    <Card>
                        <CodeMirror
                            value={codeMirrorvalue}
                            height="76vh"
                            extensions={[json()]}
                            onChange={onChanges}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <div style={{ textAlign: 'center' }}>
                                    {type == 'Python' ?
                                        <Image
                                            width={127}
                                            preview={false}
                                            src="https://console.neo4j.io/img/python-logo.png"
                                        /> :
                                        <Image
                                            width={127}
                                            preview={false}
                                            src="https://console.neo4j.io/img/java-logo.png"
                                        />}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h3 className='title'>Prerequisites</h3>
                                <ul>
                                    {
                                        type == 'Python' ?
                                            <li>- Python 3.7 +</li>
                                            :
                                            <li>- JDK 8+</li>
                                    }
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h3 className='title'>Download and Install the GraphScope Client</h3>
                                {
                                    type == 'Python' ?
                                        copyData('graphscope-client', 'pip3 install graphscope-client')
                                        :
                                        <p>Navigate to the GraphScope Java Driver page of Maven Central ....</p>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h3 className='title'>Running the example</h3>
                                <ol>
                                    <li>
                                        <p className='title_p'> Copy and paste the code on the left into a file named <span>example.py</span></p>
                                        <p> Enter the information for the graphscope instance you want to connect to by replacing:</p>
                                    </li>
                                    <li>
                                        <p className='title_p'> Enter the information for the graphscope instance you want to connect to by replacing:</p>
                                        <div className='title_div'>
                                            <p>1)<span className='title_span'>{`${'<gremlin_url>'}`}</span> with Gremlin URL.</p>

                                            <p>2)<span className='title_span'>{`${'<grpc_url>'}`}</span> with GRPC URL.</p>

                                            <p>3)<span className='title_span'>{`${'<username>'}`}</span> with UserName you used when logging into studio</p>

                                            <p>4)<span className='title_span'>{`${'<password>'}`}</span> with Password you used when logging into studio</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p className='title_p'> Use the following command to run the example code:</p>
                                    </li>
                                </ol>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                {type == 'Python' ? copyData('example', 'python3 example.py') : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h3 className='title'>References</h3>
                                <div style={{ marginLeft: '30px' }}>
                                    <p>
                                        <span className='title_p' style={{ display: 'block' }}>SDK Documentation</span>
                                        <a href="#" style={{ color: '#1650FF' }}>https://graphscope.io/docs/</a>
                                    </p>
                                    <p>
                                        <span className='title_p' style={{ display: 'block' }}>Gremlin</span>
                                        <a href="#" style={{ color: '#1650FF' }}>https://tinkerpop.apache.org/gremlin.html</a>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}

const App: React.FC = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Python`,
            children: stdout('Python'),
        },
        {
            key: '2',
            label: `Java`,
            children: stdout('Java'),
        }
    ];
    return (
        <div>
            <Row>
                <Col span={24}>
                    <h2>Connect</h2>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {/* <Information type='false' /> */}
                    <Space>
                        <span className='name_sty'>Entrypoints</span>:
                        <span className='name_sty_c'>Gremlin URL</span>:
                        <span id='Gremlin'>https://264f02fb.studio.graphscope.io</span><CopyOutlined onClick={() => myFun('Gremlin')} style={{ marginLeft: '10px' }} />
                        <span className='name_sty_c'>GRPC URL</span>:
                        <span id='GRPC'>https://2823udj.studio.graphscope.io</span><CopyOutlined onClick={() => myFun('GRPC')} style={{ marginLeft: '10px' }} />
                    </Space>
                </Col>
            </Row>
            <Tabs
                style={{ marginTop: '20px' }}
                onChange={onChange}
                type="card"
                items={items}
            />
        </div>
    )
}

export default App;