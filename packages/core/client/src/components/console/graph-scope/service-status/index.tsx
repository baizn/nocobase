import React, { useEffect } from "react";
import { Row, Col, Divider, Select } from 'antd'
import { Line } from '@antv/g2plot';
import { RedoOutlined } from '@ant-design/icons';
import './index.less'
const Status = (props) => {
    const serviceOptions = [
        {
            value: 'Web Service',
            label: 'Web Service',
        },
        {
            value: 'Groot Service',
            label: 'Groot Service',
        },
        {
            value: 'Coordinator Service',
            label: 'Coordinator Service',
        },
    ]
    const options = [{
        value: 'OFF',
        label: 'OFF',
    },
    {
        value: '5s',
        label: '5s',
    },
    {
        value: '10s',
        label: '10s',
    },
    {
        value: '15s',
        label: '15s',
    },
    {
        value: '30s',
        label: '30s',
    },
    {
        value: '1m',
        label: '1m',
    },
    {
        value: '3m',
        label: '3m',
    },
    {
        value: '5m',
        label: '5m',
    },
    {
        value: '10m',
        label: '10m',
    },
    {
        value: '15m',
        label: '15m',
    },
    ]
    useEffect(() => {
        const data = [
            {
                date: '18:30',
                value: 137,
            },
            {
                date: '18:31',
                value: 120,
            },
            {
                date: '19:20',
                value: 0,
            },
            {
                date: '15:10',
                value: 85,
            },
            {
                date: '13:50',
                value: 94,
            },
            {
                date: '09:05',
                value: 71,
            }
        ];
        const line = new Line(props.id.leftId, {
            data,
            xField: 'date',
            yField: 'value',
            // 自定义折线颜色
            color: '#2F62CE',
            // 更改辅助数据点大小及样式
            point: {
                size: 5,
                shape: 'diamond',
                style: {
                    stroke: '#2F62CE',
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
                    //   fill: '#2F62CE',
                    // },
                },
            },
            // 添加label
            label: {
                fill: '#2F62CE',
            },
        });
        line.render();
        const line2 = new Line(props.id.rightId, {
            data,
            xField: 'date',
            yField: 'value',
            // 自定义折线颜色
            color: '#2F62CE',
            // 更改辅助数据点大小及样式
            point: {
                size: 5,
                shape: 'diamond',
                style: {
                    stroke: '#2F62CE',
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
                    //   fill: '#2F62CE',
                    // },
                },
            },
            // 添加label
            label: {
                fill: '#2F62CE',
            },
        });
        line2.render();
    })
    return (
        <div className="status">
            <Row>
                <Col span={24}>
                    <div className="status_title">
                        <div>
                            <h2 className="status_title_">{props.type} Status</h2>
                            <Select
                                defaultValue="Web Service"
                                style={{ width: 279 }}
                                options={serviceOptions}
                            />
                        </div>
                        <h2 className="status_title_">Refresh frequency:<RedoOutlined style={{ transform: 'rotate(-65deg)', margin: '0 15px' }} />
                            <Select
                                defaultValue="OFF"
                                style={{ width: 279 }}
                                options={options}
                            />
                        </h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={{padding:'16px'}}><Divider /></div>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <div id={props.id.leftId}></div>
                </Col>
                <Col span={2}>
                </Col>
                <Col span={11}>
                    <div id={props.id.rightId}></div>
                </Col>
            </Row>



        </div>
    )
}
export default Status