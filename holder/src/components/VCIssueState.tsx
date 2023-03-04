import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ActivityIndicator, Button, Colors, Text} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

import {CredentialState} from '@aries-framework/core'
import {useCredentialById} from '@aries-framework/react-hooks'

type Props = {
  id: string
  onPressState: () => void
}

const VCIssueState: React.VFC<Props> = ({id, onPressState}) => {
  const cred = useCredentialById(id)
  if (cred?.state === CredentialState.Done) {
    return (
      <>
        <View style={styles.stateLayout}>
          <Text>診断結果の受信が完了しました。</Text>
          <Icon name="check" size={30} />
        </View>
        <View
          style={[
            styles.stateLayout,
            {justifyContent: 'center', flexDirection: 'column', paddingTop: 20},
          ]}>
          <Button
            icon="arrow-right-thick"
            color={Colors.black}
            style={{backgroundColor: Colors.teal100, elevation: 6, margin: 10}}
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => onPressState()}>
            確認する
          </Button>
        </View>
      </>
    )
  } else {
    return (
      <View style={styles.stateLayout}>
        <Text style={{color: Colors.grey600}}>診断結果を受信中です。 </Text>
        <ActivityIndicator
          size="small"
          animating={true}
          color={Colors.teal200}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  stateLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
  },
})

export default VCIssueState
