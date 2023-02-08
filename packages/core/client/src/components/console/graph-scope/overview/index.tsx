import React, { useEffect } from "react";
import { Card, Select, Divider, Row, Col, Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Line } from '@antv/g2plot';
import { history } from "umi";
import TableForm from '../table-form'
import Information from '../information'
import Actions from '../actions'
import Status from '../status'
import ServiceStatus from '../service-status'
import './index.less'
const OverView = () => {
    const { Search } = Input;
    const onSearch = (value: string) => console.log(value);
    const options = [{
        value: 'Memory',
        label: 'Memory',
    },
    {
        value: 'Disk',
        label: 'Disk',
    },
    {
        value: 'Network In',
        label: 'Network In',
    },
    {
        value: 'Network Out',
        label: 'Network Out',
    },
    ]
    const nodeoptions = [
        {
            value: 'instance 1',
            label: 'instance 1',
        },
        {
            value: 'instance 2',
            label: 'instance 2',
        },
    ]
    const data = [
        { time: '10:15', value: '6' },
        { time: '11:15', value: '7' },
        { time: '12:15', value: '8' },
        { time: '13:15', value: '9' },
    ]
    useEffect(() => {
        const line = new Line('containers', {
            data,
            xField: 'time',
            yField: 'value',
            // 自定义折线颜色
            color: '#1650FF',
            // 更改辅助数据点大小及样式
            point: {
                size: 5,
                shape: 'diamond',
                style: {
                    stroke: '#1650FF',
                    lineWidth: 2,
                    fillOpacity: 0.6,
                },
            },
            yAxis: {
                // 格式化 y 轴标签加单位，自定义 labal 样式
                label: {
                    formatter: (v) => {
                        return v + '%';
                    },
                    // style: {
                    //     fill: '#1650FF',
                    // },
                },
            },
            // 添加label
            // label: {
            //     fill: '#1650FF'
            // },
        });
        line.render();
    })
    return (
        <div>
            <Information />
            <Actions />
            <Status />
            <div className="information">
                <h2 className="information_title">Graph Information</h2>
                <Divider className='information_search'/>
                <Row>
                    <Col span={24} >
                        <Search placeholder="input search text" onSearch={onSearch} className='search' />
                    </Col>
                </Row>
                <TableForm />
            </div>
            <ServiceStatus type='Service' id={{ leftId: 'ServiceLeftId', rightId: 'ServiceRightId' }} />
            <div className="information">
                <h2 className="node_status">Node Status</h2>
                <Select
                    defaultValue="instance 1"
                    style={{ width: 279 }}
                    options={nodeoptions}
                />
                <Divider />
                <div style={{ marginLeft: "5%" }}>
                    <div className="cpu_">
                        <span>
                            <span style={{ display: 'inline-block', marginRight: '24px',fontSize:'16px' }}>CPU</span>
                            <Select
                                defaultValue="Memory"
                                style={{ width: 279 }}
                                options={options}
                            />
                        </span>
                        <EyeOutlined style={{ color: '#1650FF' }} onClick={() => history.push('/deployment')} />
                    </div>
                    <div id="containers"></div>
                </div>
            </div>
        </div>
    )
}

export default OverView
