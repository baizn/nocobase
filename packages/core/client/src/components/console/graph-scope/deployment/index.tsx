import React from "react";
import { Card, Space, Select, Progress, Divider } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import Canvas from '@antv/f2-react';
import { Chart, Line, Axis, Legend } from '@antv/f2';
import Status from '@/components/console/graph-scope/Status'
import ServiceStatus from '@/components/console/graph-scope/ServiceStatus/index'
import './index.less'
const Deployment = () => {
    // f2
    const tableLine = (title = '', symbol = '', name = '') => {
        return (
            <div style={{ width: '49.8%' }}>
                <Card title={title}>
                    <Canvas height='260'>
                        <Chart data={datas}
                            scale={{
                                value: {
                                    tickCount: 5,
                                    min: 0,
                                    formatter: (val) => `${val.toFixed(2)}${symbol}`,
                                },
                            }}
                        >
                            <Axis
                                field="date"
                                style={{
                                    label: { align: 'between' },
                                }}
                            />
                            <Axis field="value" />
                            <Line x="date" y="value" />
                            {
                                name && <Legend
                                    position="top"
                                    items={[
                                        {
                                            name,
                                            color: ''
                                        }
                                    ]}
                                />
                            }
                        </Chart>
                    </Canvas>
                    <h3 style={{ textAlign: 'center' }}><span style={{ color: '#3eacef' }}>—</span>127.0.0.1:9100</h3>
                </Card>
            </div>
        )
    }
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
    const nodeoptions = [{
        value: 'node1',
        label: 'node1',
    },
    {
        value: 'node2',
        label: 'node2',
    },
    {
        value: 'node3',
        label: 'node3',
    },
    ]
    const datas = [
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
    return (
        <div>
            <Status />
            <ServiceStatus type='Groot' id={{ leftId: 'GrootLeftId', rightId: 'GrootRightId' }} />
            <ServiceStatus type='Web' id={{ leftId: 'WebLeftId', rightId: 'WebRightId' }} />
            <div className="node_status">
                <h2 className="node_title">Node Status</h2>
                <Divider style={{marginBottom:'0px'}}/>
                <div className="node">
                    <Space>
                        <h3 className="node_title">Node:</h3>
                        <Select
                            defaultValue="node1"
                            style={{ width: 279 }}
                            options={nodeoptions}
                        />
                    </Space>
                    <Space>
                        <h3 className="node_title">Refresh frequency:<RedoOutlined style={{ transform: 'rotate(-65deg)', margin: '0 15px' }} />
                            <Select
                                defaultValue="OFF"
                                style={{ width: 279 }}
                                options={options}
                            />
                        </h3>
                    </Space>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    
                    {tableLine('CPU', '%')}
                    {tableLine('Memory', '%')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px' }}>
                    {tableLine('Load', '%')}
                    <div style={{ width: '49.8%' }}>
                        <Card title='Disk'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div >
                                    <p>instance</p>
                                    <p>127.0.0.1:9100</p>
                                </div>
                                <div>
                                    <p>Disk Name</p>
                                    <p>127.0.0.1:9100</p>
                                </div>
                                <div>
                                    <p>Mount Point</p>
                                    <p>/</p>
                                </div>
                                <div style={{ width: '300px' }}>
                                    <p>Disk Used</p>
                                    <p style={{ fontSize: '12px', margin: '0' }}>100GB/75GB</p>
                                    <Progress strokeLinecap="butt" percent={75} width='300px' />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px' }}>
                    {tableLine('Network Out', 'KB/s')}
                    {tableLine('Network In', 'KB/s')}
                </div>
            </div>
        </div>
    )
}

export default Deployment
