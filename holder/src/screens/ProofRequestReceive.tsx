import React, {useEffect} from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationList} from '../types/navigators'
import {ActivityIndicator, Colors, Text} from 'react-native-paper'
import {Buffer} from '@aries-framework/core/build/utils'
import {StyleSheet, View} from 'react-native'
import useInvitationURL from '../hooks/use-invitationurl'
import {useProofByState} from '@aries-framework/react-hooks'
import {DidExchangeState, ProofState} from '@aries-framework/core'
import DIDCommState from '../components/DIDCommState'
import {Service} from '../types/json'

type Props = NativeStackScreenProps<StackNavigationList, 'ProofRequestReceive'>

const base64tojson = (base64: string) => {
  const decodeData = Buffer.from(base64, 'base64').toString()
  return JSON.parse(decodeData)
}

const ProofRequestReceiveScreen = ({route, navigation}: Props) => {
  const proof = useProofByState(ProofState.RequestReceived)
  const {connectionState} = useInvitationURL(route.params.url)
  const invitation = base64tojson(route.params.url) as Service

  useEffect(() => {
    if (proof[0] !== undefined) {
      navigation.navigate({
        name: 'ProofPresent',
        params: {id: proof[0].id, label: invitation.label},
      })
    }
  }, [proof])

  return (
    <View style={styles.container}>
      <View style={styles.stateLayout}>
        <DIDCommState state={connectionState} label={invitation.label} />
      </View>
      {connectionState === DidExchangeState.Completed && (
        <View style={styles.stateLayout}>
          <Text>証明書提出の要求を受信中です。</Text>
          <ActivityIndicator
            size="small"
            animating={true}
            color={Colors.teal200}
          />
        </View>
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
export default ProofRequestReceiveScreen
