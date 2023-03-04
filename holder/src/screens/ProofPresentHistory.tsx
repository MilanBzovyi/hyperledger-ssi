import React from 'react'
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native'
import {List, Text} from 'react-native-paper'
import {
  ConnectionRecord,
  ProofExchangeRecord,
  ProofState,
} from '@aries-framework/core'
import {useConnections, useProofs} from '@aries-framework/react-hooks'
import {format} from 'date-fns'

const convertState = (state: ProofState) => {
  switch (state) {
    case ProofState.RequestReceived:
      return '証明書提出の要求を受信'
    case ProofState.PresentationSent:
      return '証明書を提出済み'
    case ProofState.Done:
      return '証明書を提出済み'
  }
}

const getLabel = (
  connId: string,
  connections: ConnectionRecord[]
) => {
  if (!connId) return undefined
  for (const record of connections) {
    if (record.id === connId) {
      return record.theirLabel
    }
  }
  return undefined
}

export const ProofPresentHistoryScreen = () => {
  const connections = useConnections().records
  const proofRecords = useProofs().records
  if (proofRecords[0] === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text>提出履歴はありません。</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<ProofExchangeRecord>
        data={proofRecords}
        keyExtractor={item => `${item.createdAt}`}
        renderItem={({item}) => (
          <List.Item
            title={getLabel(item.connectionId as string, connections)}
            description={`${format(
              item.createdAt,
              'yyyy/MM/dd'
            )}\n${convertState(item.state)}`}
            titleNumberOfLines={3}
            descriptionNumberOfLines={4}
            left={props => <List.Icon {...props} icon="check" />}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10,
  },
})
