import React, { useState, useEffect } from 'react'
import { Form, Button, Collapse, Drawer, Space } from 'antd'
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import DataSource from '../data-source'
import { GraphScopeDataImport } from '@nocobase/client'
import CreateVertexEdge from '../new-collapse-vertex-edge-template/components/CreateVertexEdge'
import './index.less'
const { Panel } = Collapse;
const NewCollapseVertexEdgeTemplate = (props: { deleteNode?: any; type?: any; titleArr?: any; }) => {
  const { titleArr } = props
  const [form] = Form.useForm()
  const nametype = localStorage.getItem('name')
  // 折叠
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState([]);
  const [disable, setDisable] = useState(false);
  const [openImport, setopenImport] = useState(false);
  const [label, setLabel] = useState({
    id: '',
    name: ''
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const collapseChange = (key: string) => {

  };
  const deleteNode = (val: string) => {
    props.deleteNode(val)
    // let data: any = arrayData.filter(i => i.id !== val)
    // setPanel(data)
    setDisable(false)
  }

  useEffect(() => {
    form.setFieldsValue({
      datasource: localStorage.getItem('location')
    })
    if (localStorage.getItem('name') == 'dataimport' || localStorage.getItem('labelType') == 'ArrowGraph') {
      setDisable(true)
    } else {
      setDisable(false)
    }

  })
  useEffect(() => {
    const tDatas = [
      {
        label: 'test',
        datasource: 'odps://project/table',
        sourcelabel: 'gold',
        destinationLabel: 'gold',
        tableForm: [{
          name: 'test1',
          type: 'long',
          primaryKey: true,
          comments: '测试'
        },
        {
          name: 'test2',
          type: 'double',
          primaryKey: false,
          comments: '测试2'
        }
        ]
      }, {
        label: 'test2',
        datasource: 'odps://project/table/1',
        sourcelabel: 'gold',
        destinationLabel: 'gold',
        tableForm: [{
          name: 'test3',
          type: 'long',
          primaryKey: true,
          comments: '测试'
        },
        {
          name: 'test4',
          type: 'double',
          primaryKey: false,
          comments: '测试2'
        }
        ]
      }
    ]
    let data: { id: any, label: string; val: JSX.Element; }[] = []
    tDatas.map((item, index) => {
      let id = String(Math.floor(Math.random() * 10000))
      data.push({
        id, label: item.label, val: <CreateVertexEdge id={id} setLabel={setLabel} testData={item} isEdit='false' />
      })
    })

    if (localStorage.getItem('name') !== '') {
      setPanel(data)
    } else {
      setPanel([])
    }

  }, [])
  //数据导入
  const importData = () => {
    setopenImport(true)
  }
  //折叠右侧
  const genExtra = (id: string) => {
    if (nametype == '') {
      return (
        <Space>
          <Button size='small' style={{ color: '#1650FF' }} onClick={showDrawer}>Config Data Source</Button>
          <Button danger size='small' onClick={() => deleteNode(id)}>Delete</Button>
        </Space>
      )
    } else if (nametype == 'dataimport') {
      return (
        <Space>
          <Button size='small' style={{ color: '#1650FF' }} onClick={showDrawer}>Config Data Source</Button>
          <Button size='small' style={{ color: '#1650FF' }} onClick={importData}>Data Import</Button>
        </Space>
      )
    } else {
      return disable ? null : <Button danger size='small' onClick={() => deleteNode(id)}>Delete</Button>
    }
  }
  const headerTitle = (i: string) => {
    return (
      <>
        <span>Label :</span> <span>{i}</span>
      </>
    )
  }
  return (
    <>
      <Form.List name="sights">
        {(fields, { add, remove }) => (
          <>
            <Collapse
              collapsible='header'
              onChange={collapseChange}
              defaultActiveKey={['0']}
              expandIconPosition={'start'}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              {fields.map((field, index) => {
                return (
                  <Panel header={<span>Label : {titleArr ? titleArr[index]?.label : null}</span>} key={field.key} extra={genExtra(index)} >
                    <CreateVertexEdge field={field} key={field.key}/>
                  </Panel>
                )
              })}
            </Collapse>

            <Form.Item>
              <Button style={{ width: '100%', marginTop: '16px' }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add {props.type}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Drawer width='80%' title="Data Source graph name" placement="right" onClose={() => setOpen(false)} open={open}>
        <DataSource onClose={onClose} />
      </Drawer>
      <Drawer width='80%' title="Data Import g3" placement="right" onClose={() => setopenImport(false)} open={openImport}>
        <GraphScopeDataImport />
      </Drawer>
    </>
  )
}
export default NewCollapseVertexEdgeTemplate
