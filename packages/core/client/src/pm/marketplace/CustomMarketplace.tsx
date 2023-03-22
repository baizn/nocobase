import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, Row, Col, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { loadedPlugins } from './service'
import AssetCardList from './AssetCardList'
import { ILoadedPlugin } from './Marketplace'


interface IProps {
  updateTabName: (tabName: string) => void;
}

const CustomMarketPlace: React.FC<IProps> = ({ updateTabName }) => {
  const [state, setState] = useState({
    cpath: '',
    projectName: '',
    packageName: '',
    loadedPluginList: [] as ILoadedPlugin[],
  })

  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const queryLoadedPluginList = async () => {
		const loadedList = await loadedPlugins()
		
		setState({
      ...state,
			loadedPluginList: loadedList
		})
	}

  const handleSearch = async () => {
    const values = await form.validateFields()

    const { assetName, sourceCodePath, packageName } = values
    setState({
      ...state,
      cpath: sourceCodePath,
      projectName: assetName,
      packageName
    })
  }

  const handleValueChange = (changedValues) => {
    console.log(changedValues)
    const { assetName } = changedValues
    if (assetName) {
      updateTabName(assetName)
    }
  }

  useEffect(() => {
    queryLoadedPluginList()
  }, [])

  const { cpath, projectName, loadedPluginList, packageName } = state
  const initFormValue = {
    assetName: 'GraphBitComponents',
    sourceCodePath: 'src/components'
  }
  return (
    <div>
      <Card style={{ marginBottom: 8 }}>
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          onValuesChange={handleValueChange}
          initialValues={initFormValue}
        >
          <Row>
            <Col span={7}>
              <Form.Item
                label={<Tooltip title='组件库名称，该名称需要真实存在，如读取 https://code.alipay.com/Ant_Graph/GraphBitComponents 组件库中的组件, 则此处填写 GraphBitComponents 即可'><QuestionCircleOutlined /><span>组件库名称</span></Tooltip>}
                name="assetName"
                rules={[{ required: true, message: '请输入业务资产库名称!' }]}
              >
                <Input style={{ width: 245 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={<Tooltip title='组件库目录结构，读取该目录结构下的所有组件，如读取 https://code.alipay.com/Ant_Graph/GraphBitComponents/tree/master/src/components 下的组件, 则此处填写 /src/components 即可'><QuestionCircleOutlined /><span>组件库路径</span></Tooltip>}
                name="sourceCodePath"
                rules={[{ required: true, message: '请输入组件库源码地址!' }]}
              >
                <Input style={{ width: 245 }} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={<Tooltip title='完整的组件库包名称，用于引入组件时使用，如 import { TestComponent } from "@tugraph/components", 则此处填写 @tugraph/components 即可'><QuestionCircleOutlined /><span>组件库 NPM 包名称</span></Tooltip>}
                name="packageName"
              >
                <Input style={{ width: 245 }} />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Button type="primary" onClick={handleSearch} loading={loading}>
                  确定
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      {
        cpath && projectName &&
        <AssetCardList projectName={projectName} path={cpath} loadedPluginList={loadedPluginList} respLoadingStatus={setLoading} packageName={packageName} />
      }
    </div>
  )
}

export default CustomMarketPlace
