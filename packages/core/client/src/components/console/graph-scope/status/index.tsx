import React from "react";
import { Divider, Space } from 'antd'
import './index.less'
const Status = () => {
    const status = {
        'Web Service': {
            'Running': '1',
            'Abnormal': '0'
        },
        'Coordinator Pod': {
            'Running': '1',
            'Abnormal': '0'
        },
        'Frontend Pod': {
            'Running': '2',
            'Abnormal': '0'
        },
        'Ingestor Pod': {
            'Running': '2',
            'Abnormal': '0'
        },
        'Storaged Pod': {
            'Running': '8',
            'Abnormal': '0'
        },
    }
    const clusterStatus = (data) => {
        return (
            Object.keys(data).map(key => {
                return (
                    <div style={{ marginRight: '50px' }} key={Math.random()}>
                        <h3 className="status_content">{key}</h3>
                        <p style={{margin:'-2px 0-3px'}}><Space><span>Running</span><span style={{ color: '#2bcc62',fontSize:'24px' }}>{data[key].Running}</span></Space></p>
                        <Space ><span>Abnormal</span><span style={{ color: '#ec5420',fontSize:'24px'  }}>{data[key].Abnormal}</span><span style={{color:'#1650FF'}}>logs</span></Space>
                    </div>
                )
            })
        )
    }
    return (
        <div className="status">
            <h2 className="status_title">Deployment Status</h2>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {clusterStatus(status)}
            </div>
        </div>
    )
}
export default Status