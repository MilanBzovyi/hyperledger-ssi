import {useAgent, useConnectionById} from '@aries-framework/react-hooks'
import {useEffect, useState} from 'react'
import {Buffer} from '@aries-framework/core/build/utils'
import {Service} from '../types/json'

const base64tojson = (base64: string) => {
  // ToDo: Error処理
  const decodeData = Buffer.from(base64, 'base64').toString()
  return JSON.parse(decodeData)
}

function useInvitationURL(url: string) {
  const [conID, setConID] = useState('')
  const {agent} = useAgent()
  const connectionRecord = useConnectionById(conID)
  const error = false
  let connectionState = ''

  const json = base64tojson(url) as Service
  const invitationURL = json.serviceEndpoint + '?c_i=' + url
  // console.log("-------------------------")
  // console.log(connectionRecord?.state)
  // console.log("-------------------------")
  useEffect(() => {
    ;(async () => {
      const record = await agent?.oob.receiveInvitationFromUrl(invitationURL)
      const connection = record?.connectionRecord
      if (connection?.id) {
        setConID(connection.id)
      }
    })()
  }, [])
  connectionRecord?.state && (connectionState = connectionRecord?.state)

  return {connectionState, error}
}

export default useInvitationURL
