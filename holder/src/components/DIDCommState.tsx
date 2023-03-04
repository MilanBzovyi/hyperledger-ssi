import React from 'react'
import {Text, ActivityIndicator, Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import {DidExchangeState} from '@aries-framework/core'

type Props = {
  state: string
  label: string
}

const DIDCommState: React.VFC<Props> = ({state, label}) => {
  if (state === DidExchangeState.Completed) {
    return (
      <>
        <Text style={{marginRight: 10}}>{label}と接続が完了しました。 </Text>
        <Icon name="check" size={30} />
      </>
    )
  } else {
    return (
      <>
        <Text style={{color: Colors.grey600, marginRight: 10}}>{label}と接続中です。 </Text>
        <ActivityIndicator
          size="small"
          animating={true}
          color={Colors.teal200}
        />
      </>
    )
  }
}

export default DIDCommState
