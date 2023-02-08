import React from "react";
import { Divider, Space, message, Row, Col } from 'antd'
import { CopyOutlined } from '@ant-design/icons';
import { history } from 'umi'
import './index.less'
/**
* 返回当前元素的文本内容
* @parm {DOM} element 当前DOM元素
*/
function selectText(element: HTMLElement) {
    return element.innerText;
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
const Information = ({ type = 'true' }) => {
    const data = {
        'Name': 'onecompgraph',
        'Create Time': '2022-11-24 14:37:02',
        'Version': 'v0.17.0',
        'Entrypoints': { 'Gremlin URL': 'https://264f02fb.studio.graphscope.io', 'GRPC URL': 'https://2823udj.studio.graphscope.io', }
    }
    const dataProcessing = (data: { [x: string]: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; Name?: string; "Create Time"?: string; Version?: string; Entrypoints?: { 'Gremlin URL': string; 'GRPC URL': string; }; }) => {
        return (
            <>
                {Object.keys(data).map(key => {
                    return (
                        <div key={Math.random()}>
                            {key == 'Entrypoints' ?
                                <div style={{marginTop:'-5px'}}><Space><h4 className="information_content">{key}</h4> : {dataProcessing(data[key])}{type == 'true' ? <span onClick={()=>history.push('/connect')} style={{ color: '#1650FF' }}>How to use</span> : null}</Space>
                                </div>
                                : <div>{(key == 'Gremlin URL' || key == 'GRPC URL') ? <Space style={{ marginRight: '20px' }}><p >{key}</p>:<span id={key}>{data[key]}</span><CopyOutlined onClick={() => myFun(key)} style={{ float: 'right' }} /></Space>
                                    : <Space><h4 className="information_content">{key}</h4>:<span id={key}>{data[key]}</span></Space>
                                }</div>}
                        </div>
                    )
                })}
            </>
        )
    }
    return (
        <div className="information">
            <Row>
                <Col span={24}>
                    <h2 className="information_title">Deployment Information</h2>
                    <Divider />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {dataProcessing(data)}
                </Col>
            </Row>
        </div>
    )
}
export default Information