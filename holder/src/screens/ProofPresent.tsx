import React, {useEffect, useState} from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationList} from '../types/navigators'

import {StyleSheet, View} from 'react-native'
import {useAgent, useCredentials} from '@aries-framework/react-hooks'
import {RecordsState} from '@aries-framework/react-hooks/build/recordUtils'
import {
  CredentialExchangeRecord,
  CredentialPreviewAttribute,
  IndyProofFormat,
  RequestedAttribute,
} from '@aries-framework/core'
import {Button, Card, Colors, Text} from 'react-native-paper'
import {FormatRequestedCredentialReturn} from '@aries-framework/core/build/modules/proofs/models/ProofServiceOptions'
import {CARD_URL} from '@env'

type Props = NativeStackScreenProps<StackNavigationList, 'ProofPresent'>

// 提出が求められるVCのAttributesを抜き出す
const getCredentialAttributes = (
  credentials: RecordsState<CredentialExchangeRecord>,
  requestedCreds: Record<string, RequestedAttribute> | undefined
) => {
  if (!requestedCreds) {
    return undefined
  }
  const attributes = requestedCreds
  let id
  for (const key of Object.keys(attributes)) {
    id = attributes[key]['credentialId']
  }
  for (let record of credentials.records) {
    const credentials = record.credentials
    if (credentials[0].credentialRecordId === id) {
      return record.credentialAttributes
    }
  }
  return undefined
}

const ProofPresentScreen = ({route, navigation}: Props) => {
  const {agent} = useAgent()
  const cred = useCredentials()
  const [requestedCreds, setRequestedCreds] =
    useState<FormatRequestedCredentialReturn<[IndyProofFormat]>>()
  const [attributes, setAttributes] = useState<
    CredentialPreviewAttribute[] | undefined
  >()

  useEffect(() => {
    if (agent) {
      ;(async () => {
        // Proofに合致するVCの取得
        const retrievedCreds =
          await agent.proofs.getRequestedCredentialsForProofRequest({
            proofRecordId: route.params.id,
            config: {
              filterByPresentationPreview: false,
              filterByNonRevocationRequirements: false,
            },
          })
        // Proofの各Attributeに当てはめるClaimを1つに絞る
        const automaticRequestedCreds =
          retrievedCreds &&
          (await agent.proofs.autoSelectCredentialsForProofRequest({
            proofRecordId: route.params.id,
            config: {
              filterByNonRevocationRequirements: false,
              filterByPresentationPreview: false,
            },
          }))
        setRequestedCreds(automaticRequestedCreds)

        // 手持ちのクレデンシャルと提出するクレデンシャルを渡す
        setAttributes(
          getCredentialAttributes(
            cred,
            automaticRequestedCreds.proofFormats.indy?.requestedAttributes
          )
        )
      })()
    }
  }, [])
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <Text style={{marginBottom: 10}}>
          {route.params.label}から健康診断証明書の提出を求められています。
        </Text>
        {requestedCreds ? (
          <>
            <Card
              style={{marginTop: 10}}
              onPress={() => {
                navigation.navigate({
                  name: 'Credential',
                  params: {data: attributes},
                })
              }}>
              <Card.Cover
                source={{
                  // ToDo: Issuerごとに画像を選択するように変更する
                  uri: CARD_URL,
                }}
              />
            </Card>
            <View style={styles.buttonLayout}>
              <Button
                color={Colors.black}
                style={{
                  backgroundColor: Colors.teal50,
                  elevation: 6,
                  width: '45%',
                }}
                onPress={() => {
                  navigation.navigate('Credentials')
                }}>
                いいえ
              </Button>
              <Button
                icon="arrow-right-thick"
                color={Colors.black}
                style={{
                  backgroundColor: Colors.teal100,
                  elevation: 6,
                  width: '45%',
                }}
                contentStyle={{flexDirection: 'row-reverse'}}
                onPress={() => {
                  // タップするとProofが提出され、提出履歴画面へ遷移する
                  agent?.proofs.acceptRequest({
                    proofRecordId: route.params.id,
                    proofFormats: requestedCreds.proofFormats,
                  })
                  navigation.navigate('Tab', {screen: 'ProofPresentHistory'})
                }}>
                提出する
              </Button>
            </View>
          </>
        ) : (
          <Text>適合する証明書がありません。</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
})
export default ProofPresentScreen
