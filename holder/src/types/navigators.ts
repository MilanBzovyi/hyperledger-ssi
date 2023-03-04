import {CredentialPreviewAttribute} from '@aries-framework/core'
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type NavigatorParamList = {
  Connections: undefined
  Credentials: undefined
  ProofPresentHistory: undefined
}

export type TabNavigationProp = BottomTabNavigationProp<NavigatorParamList>

export type StackNavigationList = {
  Connections: undefined
  Tab: {screen: string}
  Credentials: undefined
  Credential: {data: CredentialPreviewAttribute[] | undefined}
  IssueReceive: {url: string}
  OfferReceive: {id: string}
  ProofRequestReceive: {url: string}
  ProofPresent: {id: string; label: string}
}
