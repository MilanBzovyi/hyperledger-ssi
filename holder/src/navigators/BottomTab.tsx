import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Colors, List} from 'react-native-paper'

import {ConnectionsScreen} from '../screens/Connections'
import {CredentialsScreen} from '../screens/Credentials'
import {ProofPresentHistoryScreen} from '../screens/ProofPresentHistory'
import {NavigatorParamList} from '../types/navigators'

const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<NavigatorParamList>()

  return (
    <BottomTab.Navigator
      screenOptions={route => ({
        headerStyle: {
          backgroundColor: Colors.teal200,
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarActiveTintColor: Colors.teal400,
        headerTitleAlign: 'center',
        tabBarIcon: () => {
          let iconName = null

          if (route.route.name === 'Credentials') {
            iconName = 'id-card'
          } else if (route.route.name === 'ProofPresentHistory') {
            iconName = 'history'
          } else if (route.route.name === 'Connections') {
            iconName = 'dots-horizontal'
          } else {
            iconName = 'question'
          }
          return <List.Icon icon={iconName} />
        },
      })}>
      <BottomTab.Screen
        name="Credentials"
        component={CredentialsScreen}
        options={{headerTitle: '診断結果一覧', tabBarLabel: '診断結果一覧'}}
      />
      <BottomTab.Screen
        name="ProofPresentHistory"
        component={ProofPresentHistoryScreen}
        options={{headerTitle: '提出履歴', tabBarLabel: '提出履歴'}}
      />
      <BottomTab.Screen
        name="Connections"
        component={ConnectionsScreen}
        options={{tabBarLabel: 'その他'}}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator
