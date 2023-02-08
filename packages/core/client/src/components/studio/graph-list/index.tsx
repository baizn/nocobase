import React, { useState } from "react";
import { Col, Row, Button, Input, Space, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { history } from "umi";
import TableForm from '../../console/graph-scope/TableForm/index'
import CreateSchema from "../CreateSchema";
import './index.less'
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

export type TableListItem = {
	key: string;
	name: string;
	type: string;
	address: string;
	width: string;
};


const GraphList = () => {
	const [toCreate, setToCreate] = useState(false)
	const createSchema = () => {
			localStorage.setItem('name','')
			localStorage.setItem('label','')
			localStorage.setItem('labelType','')
			// @永东：组件代码里面不要有路由相关的内容
			// history.push('/newcreateschema')
			setToCreate(true)
	}

	const handleToBack = () => {
		setToCreate(false)
	}
	return (
		<div className="graph_list">						
			{
					toCreate
					?
					<>
						<Breadcrumb>
							<Breadcrumb.Item onClick={handleToBack}>
								<a>图研发</a>
							</Breadcrumb.Item>
							<Breadcrumb.Item>创建图模型</Breadcrumb.Item>
						</Breadcrumb>
						<CreateSchema />
					</>
					:
				<>
					<Row>
						<Col span={24}>
							<div className="title">
							<h2 className="graph_list_title">Graph List</h2>
							<Space>
								<Search placeholder="input search text" onSearch={onSearch} />
								<Button className="but" type="primary" onClick={createSchema} icon={<PlusOutlined />}>Create Graph</Button>
							</Space>
							</div>
						</Col>
					</Row>
					<TableForm/>
				</>	
			}
		</div>
	)
};

export default GraphList;