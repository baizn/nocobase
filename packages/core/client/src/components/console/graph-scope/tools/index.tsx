import React from "react";
import { Space, Image } from 'antd'
// import a from '../../../../assets/jupyter.png'
const Status = () => {

    return (
        <div>
            <Space>
                <Image
                    width={115}
                    preview={false}
                    src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DsXhSJ1x8DUAAAAAAAAAAAAADmJ7AQ/original"
                />
                <Image
                    preview={false}
                    width={25}
                    src="https://jupyter.org/assets/try/jupyter.png"
                />
            </Space>
            <span style={{ fontSize: '14px', verticalAlign: 'middle', fontWeight: '400',marginLeft:'3px' }}>NoteBook</span>

        </div>
    )
}
export default Status