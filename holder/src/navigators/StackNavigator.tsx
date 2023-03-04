import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {StackNavigationList} from '../types/navigators'
import BottomTabNavigator from './BottomTab'
import IssueReceiveScreen from '../screens/IssueReceive'
import CredentialScreen from '../screens/Credential'
import ProofRequestReceiveScreen from '../screens/ProofRequestReceive'
import ProofPresentScreen from '../screens/ProofPresent'
import {Colors} from 'react-native-paper'

const RootStack = createStackNavigator<StackNavigationList>()

const StackNavigator: React.VFC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.teal200,
        },
        headerTitleAlign: 'center',
      }}>
      <RootStack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="IssueReceive"
        component={IssueReceiveScreen}
        options={{title: '診断結果の発行'}}
      />
      <RootStack.Screen
        name="Credential"
        component={CredentialScreen}
        options={{headerShown: true, headerTitle: '診断結果'}}
      />
      <RootStack.Screen
        name="ProofRequestReceive"
        component={ProofRequestReceiveScreen}
        options={{headerTitle: '診断結果の送信'}}
      />
      <RootStack.Screen
        name="ProofPresent"
        component={ProofPresentScreen}
        options={{headerLeft: () => null, headerTitle: '診断結果の送信'}}
      />
    </RootStack.Navigator>
  )
}

export default StackNavigator
