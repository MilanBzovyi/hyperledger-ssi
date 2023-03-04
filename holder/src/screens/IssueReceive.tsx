import React, {useState} from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationList} from '../types/navigators'
import {StyleSheet, View} from 'react-native'
import {Buffer} from '@aries-framework/core/build/utils'
import useInvitationURL from '../hooks/use-invitationurl'
import {useCredentialByState} from '@aries-framework/react-hooks'
import {CredentialState, DidExchangeState} from '@aries-framework/core'
import DIDCommState from '../components/DIDCommState'
import VCIssueState from '../components/VCIssueState'
import {Service} from '../types/json'

type Props = NativeStackScreenProps<StackNavigationList, 'IssueReceive'>

const base64tojson = (base64: string) => {
  const decodeData = Buffer.from(base64, 'base64').toString()
  return JSON.parse(decodeData)
}

const IssueReceiveScreen = ({route, navigation}: Props) => {
  const credentialsReceive = useCredentialByState(CredentialState.OfferReceived)
  const {connectionState} = useInvitationURL(route.params.url)
  const invitation = base64tojson(route.params.url) as Service
  const handleNavigation = () => {
    navigation.navigate('Credentials')
  }
  const [credExId, setCredId] = useState('')

  if (credentialsReceive[0] !== undefined && !credExId) {
    setCredId(credentialsReceive[0].id)
  }
  return (
    <View style={styles.container}>
      <View style={styles.stateLayout}>
        <DIDCommState
          state={connectionState}
          label={invitation.label.split(' ')[0]}
        />
      </View>
      {connectionState === DidExchangeState.Completed && (
        <VCIssueState id={credExId} onPressState={handleNavigation} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  // 横並びにし、中のコンテンツを中央配置
  stateLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
  },
})
export default IssueReceiveScreen
