import React from 'react'
import {LinkingOptions, NavigationContainer} from '@react-navigation/native'
import StackNavigator from './StackNavigator'
import {StackNavigationList} from '../types/navigators'

// DeepLinkのURIを処理する
const linking: LinkingOptions<StackNavigationList> = {
  prefixes: ['holder://'],
  config: {
    screens: {
      // component側でroute.paramsで受け取れる
      // パースの処理を追加することも可能
      IssueReceive: {
        path: 'issue',
      },
      ProofRequestReceive: {
        path: 'verify',
      },
    },
  },
}

const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default RootNavigator
