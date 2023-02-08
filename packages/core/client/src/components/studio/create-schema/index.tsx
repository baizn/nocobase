import React, { useEffect, useRef } from 'react';
import { Col, Row, Button, Tabs, Space } from 'antd';
import type { TabsProps } from 'antd';
import GraphBasicInformation from '../GraphBasicInformation'
import CollapseVertexTemplate from '../CollapseVertexEdgeTemplate'

import './index.less'

const CreateSchema = () => {
    const childBasicInformationRef = useRef()
    //BasicInformation 基础信息数据
    const getBasicInformation = (val: any) => {
        console.log(val);

    }
    //点/边数据
    const getVertexEdgeRef = (val: any) => {
        console.log(val);
    }
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Vertex`,
            children: (
                <div>
                    <Row>
                        <Col span={24}>
                            <CollapseVertexTemplate type='Vertex' getVertexEdgeRef={getVertexEdgeRef} saveSchema={saveSchema}/>
                        </Col>
                    </Row>
                </div>
            ),
        },
        {
            key: '2',
            label: `Edge`,
            children: <div>
                <Row>
                    <Col span={24}>
                        <CollapseVertexTemplate type='Edge' getVertexEdgeRef={getVertexEdgeRef} saveSchema={saveSchema}/>
                    </Col>
                </Row>
            </div>,
        }
    ];
    const saveSchema = () => {
        childBasicInformationRef.current?.changeBasicInformation()
        // history.push('/graphList')
    }
    const tabChange=(val:string)=>{
        val == '2' ? localStorage.setItem('type','Edge') : localStorage.setItem('type','Vertex')
    }
    useEffect(()=>{
        localStorage.setItem('type','Vertex')
    })
    return (
        <>
            <div className='schema_information'>
                <div className='top_content'>
                    <Row>
                        <Col span={24}>
                            <h2 className='schema_information_title'>Graph Information</h2>
                        </Col>
                    </Row>
                </div>
                <div className='top_content'>
                    <Row>
                        <Col span={24}>
                            <GraphBasicInformation getBasicInformation={getBasicInformation} ref={childBasicInformationRef} />
                        </Col>
                    </Row>
                </div>

            </div>
            <div className='schema_information schema_tabs'>
                <Tabs
                    items={items}
                    onChange={tabChange}
                />
            </div>
            {/* {isEdit == '' ?
                <div className='save_list'>
                    <Row>
                        <Col span={24}>
                            <Space>
                                <Button style={{ width: '135px' }}>Cancel</Button>
                                <Button className='btn' type='primary' onClick={saveSchema}>Create</Button>
                            </Space>

                        </Col>
                    </Row>
                </div> : null
            } */}
        </>
    )
};

export default CreateSchema;