import React from 'react'
import {StyleSheet, View} from 'react-native'
import RenderClaim from '../components/RenderClaim'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationList} from '../types/navigators'

type Props = NativeStackScreenProps<StackNavigationList, 'Credential'>

const CredentialScreen = ({route}: Props) => {
  return (
    <View style={styles.container}>
      <RenderClaim data={route.params.data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
})

export default CredentialScreen
