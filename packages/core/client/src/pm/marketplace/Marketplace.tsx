import React from 'react'
import { Tabs } from 'antd'
import AssetCardList from './AssetCardList'
const { TabPane } = Tabs

const Marketplace = () => {
  const items = [
    {
      label: 'Console',
      key: 'graph-console',
      children: <AssetCardList path='src/components/console' />
    },
    {
      label: 'Studio',
      key: 'graph-studio',
      children: <AssetCardList path='src/components/studio' />
    },
    {
      label: 'Explore',
      key: 'graph-explore',
      children: <AssetCardList path='src/components/explore' />
    },
    {
      label: 'Dashboard',
      key: 'graph-dash-board',
      children: <AssetCardList path='src/components/dash-board' />
    }
  ]

  return (
		<div>
      <Tabs>
        <TabPane tab='Console' key='graph-console'>
          <AssetCardList path='src/components/console' />
        </TabPane>
        <TabPane tab='Studio' key='graph-query'>
          <AssetCardList path='src/components/studio' />
        </TabPane>
        <TabPane tab='Explore' key='graph-explore'>
          <AssetCardList path='src/components/studio' />
        </TabPane>
        <TabPane tab='Dashboard' key='graph-dashboard'>
          <AssetCardList path='src/components/studio' />
        </TabPane>
      </Tabs>
    </div>
	)
}

export default Marketplace
