import React from 'react'
import {StyleSheet, FlatList, SafeAreaView, View} from 'react-native'
import {Card, Text} from 'react-native-paper'
import {CredentialExchangeRecord, CredentialState} from '@aries-framework/core'
import {
  useConnectionById,
  useCredentialByState,
} from '@aries-framework/react-hooks'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {StackNavigationList} from '../types/navigators'

type Props = NativeStackScreenProps<StackNavigationList, 'Credentials'>

type CredentialImageProps = {
  connectionId: string
}

// ConnectionIdを受け取りCard.Coverを返すコンポーネント
// useConnectionByIdを使うためにコンポーネントを分離する
const CredentialImage: React.VFC<CredentialImageProps> = ({connectionId}) => {
  const connection = useConnectionById(connectionId)
  const imageUri = connection?.theirLabel?.split(' ')[1]
  return (
    <Card.Cover
      // 設置された画像を読み込んで表示
      source={{
        uri: imageUri || undefined,
      }}
    />
  )
}

export const CredentialsScreen = ({navigation}: Props) => {
  const credentialsIssued = useCredentialByState(CredentialState.Done)

  if (!credentialsIssued.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text>診断結果がありません。</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<CredentialExchangeRecord>
        data={credentialsIssued}
        keyExtractor={item => `${item.createdAt}`}
        renderItem={({item}) => (
          <Card
            onPress={() => {
              navigation.navigate({
                name: 'Credential',
                params: {data: item.credentialAttributes},
              })
            }}>
            <CredentialImage connectionId={item.connectionId as string} />
          </Card>
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
