import React, { useEffect, useState } from 'react'
import { Tabs as AntdTabs } from 'antd'
import AssetCardList from './AssetCardList'
import { loadedPlugins } from './service'
import CustomMarketPlace from './CustomMarketplace'
const { TabPane } = AntdTabs

export interface ILoadedPlugin {
	enabled: number;
	id: number;
	name: string;
}

const DefaultMarketplace = () => {
  const [state, setState] = useState({
    loadedPluginList: [] as ILoadedPlugin[],
  })

  const queryLoadedPluginList = async () => {
		const loadedList = await loadedPlugins()
		
		setState({
			loadedPluginList: loadedList
		})
	}

  const { loadedPluginList } = state

  const defaultItems = [
    {
      label: 'Console',
      key: 'graph-console',
      children: <AssetCardList path='src/components/console' loadedPluginList={loadedPluginList} />
    },
    {
      label: 'Studio',
      key: 'graph-studio',
      children: <AssetCardList path='src/components/studio' loadedPluginList={loadedPluginList} />
    },
    {
      label: 'Explore',
      key: 'graph-explore',
      children: <AssetCardList path='src/components/explore' loadedPluginList={loadedPluginList} />
    },
    {
      label: 'Dashboard',
      key: 'graph-dash-board',
      children: <AssetCardList path='src/components/dash-board' loadedPluginList={loadedPluginList} />
    }
  ]

  useEffect(() => {
    queryLoadedPluginList()
  }, [])

  return (
		<div>
      <AntdTabs defaultActiveKey='Console' items={defaultItems} />
    </div>
	)
}

const mapping = {
  DefaultMarketplace,
  CustomMarketPlace
}

const defaultAssetItems = [
  {
    label: '官方资产库',
    key: 'default',
    children: 'DefaultMarketplace',
    closable: false
  }
]

const Marketplace = () => {
  const [state, setState] = useState({
    items: localStorage.getItem('currentPanes') ? JSON.parse(localStorage.getItem('currentPanes')) : defaultAssetItems,
    activeKey: 'default',
    currentTabName: '业务库'
  })

  const { activeKey, items, currentTabName } = state

  const handleUpdateTabName = (tabName: string) => {
    items.forEach(d => {
      if (d.key === activeKey) {
        d.label = tabName
      }
    })
    setState({
      ...state,
      currentTabName: tabName
    })
  }

  const add = () => {
    const newActiveKey = `newTab`;

    const storePanels: any = [...defaultAssetItems]
    storePanels.push({
      label: currentTabName, 
      children: 'CustomMarketPlace', 
      props: {
        key: 'updateTabName',
        value: 'handleUpdateTabName'
      },
      key: newActiveKey, 
      closable: true
    })

    setState({
      ...state,
      items: storePanels,
      activeKey: newActiveKey,

    })
    
    localStorage.setItem('currentPanes', JSON.stringify(storePanels))
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter(item => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setState({
      ...state,
      items: newPanes,
      activeKey: newActiveKey
    })
  };

  const handleEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const handleChange = (newActiveKey: string) => {
    setState({
      ...state,
      activeKey: newActiveKey
    })
  };

  const renderItems = items.map(d => {
    const Component = mapping[d.children]
    if (d.props) {
      return {
        ...d,
        children: <Component updateTabName={handleUpdateTabName} />
      }
    }
    return {
      ...d,
      children: <Component />
    }
  })

  return (
		<div>
      <AntdTabs 
        type="editable-card" 
        activeKey={activeKey} 
        onChange={handleChange}
        items={renderItems}
        onEdit={handleEdit} />
    </div>
	)
}

export default Marketplace
