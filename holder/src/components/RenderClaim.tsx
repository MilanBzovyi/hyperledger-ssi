import React from 'react'
import {DataTable, Text} from 'react-native-paper'
import {ScrollView} from 'react-native-gesture-handler'
import {Claim, HealthCheckup} from '../types/json'
import {Dimensions, StyleSheet} from 'react-native'
import {match} from 'ts-pattern'

const windowHeight = Dimensions.get('window').height

type Props = {
  data: Claim[] | undefined
}

type RenderClaimProps = {
  claim: Claim
}

// 英語のスキーマ名を日本語へ変換
const toJapanese = (name: HealthCheckup) => {
  return match(name)
    .with('patient_id', () => '受診者ID')
    .with('bmi', () => 'BMI')
    .with('waist', () => '腹囲')
    .with('blood_pressure', () => '血圧')
    .with('eyesight', () => '視力')
    .with('hearing', () => '聴力')
    .with('vital_capacity', () => '肺活量')
    .with('ua', () => '尿酸')
    .with('tc', () => '総コレステロール')
    .with('tg', () => '中性脂肪')
    .with('fpg', () => '血糖値')
    .with('rbc', () => '赤血球')
    .with('wbc', () => '白血球')
    .with('plt', () => '血小板数')
    .exhaustive()
}

const ListClaim: React.VFC<RenderClaimProps> = ({claim}) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{toJapanese(claim.name as HealthCheckup)}</DataTable.Cell>
      <DataTable.Cell>{claim.value}</DataTable.Cell>
    </DataTable.Row>
  )
}

const RenderClaim: React.VFC<Props> = ({data}) => {
  if (data === undefined) {
    return <Text>データエラー</Text>
  }
  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title>検査項目</DataTable.Title>
        <DataTable.Title>測定値</DataTable.Title>
      </DataTable.Header>
      <ScrollView style={styles.tables}>
        {data.map((claim, index) => (
          <ListClaim claim={claim} key={index} />
        ))}
      </ScrollView>
    </DataTable>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  // 測定項目一覧が画面内におさまるように調整
  tables: {
    maxHeight: windowHeight - 240,
  },
})

export default RenderClaim
