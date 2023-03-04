import React from 'react'
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native'
import {List} from 'react-native-paper'
import {ConnectionRecord} from '@aries-framework/core'
import {useConnections} from '@aries-framework/react-hooks'

export const ConnectionsScreen = () => {
  // DID Comm確認画面として残す
  const connections = useConnections().records
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <FlatList<ConnectionRecord>
          data={connections}
          keyExtractor={item => `${item.createdAt}`}
          renderItem={({item}) => (
            <List.Item
              title={`${item.theirLabel} / ${item.theirDid}`}
              description={`ConnID: ${item.id}, State: ${item.state}, CreatedAt: ${item.createdAt}`}
              titleNumberOfLines={3}
              descriptionNumberOfLines={4}
              left={props => <List.Icon {...props} icon="connection" />}
            />
          )}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
})
