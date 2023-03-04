import {
  Agent,
  ConnectionEventTypes,
  ConnectionStateChangedEvent,
  RoutingEventTypes,
  MediationState,
  MediationStateChangedEvent,
  DidExchangeState,
  CredentialEventTypes,
  CredentialStateChangedEvent,
  CredentialState,
} from '@aries-framework/core'

export const registerConnectionListener = (holder: Agent): void => {
  holder.events.on<ConnectionStateChangedEvent>(
    ConnectionEventTypes.ConnectionStateChanged,
    async ({payload}) => {
      const connectionRecord = payload.connectionRecord
      console.log(connectionRecord)
      if (connectionRecord.state === DidExchangeState.Completed) {
        console.log('Making a connection has been completed.')
        console.log(`Their Label : ${connectionRecord.theirLabel}`)
        console.log(
          `Connection ID: ${connectionRecord.id}, My DID: ${connectionRecord.did}, Their DID: ${connectionRecord.theirDid}`
        )
      }
    }
  )
}

export const registerMediationListener = (holder: Agent): void => {
  holder.events.on<MediationStateChangedEvent>(
    RoutingEventTypes.MediationStateChanged,
    async ({payload}) => {
      const mediationRecord = payload.mediationRecord
      if (mediationRecord.state === MediationState.Granted) {
        console.log('Permission for mediation has been granted.')
      }
    }
  )
}

export const registerVCIssuingListener = (holder: Agent): void => {
  holder.events.on<CredentialStateChangedEvent>(
    CredentialEventTypes.CredentialStateChanged,
    async ({payload}) => {
      const credentialRecord = payload.credentialRecord
      // VC発行のプロトコルにおける状態ごとの対応
      switch (credentialRecord.state) {
        case CredentialState.OfferReceived: {
          // 発行オファーを受け取った際に動く。
          console.log('Received a credential offer.')
          console.log(
            `Credential Exchange ID: ${credentialRecord.id}, Connection ID: ${credentialRecord.connectionId}`
          )
          await holder.credentials.acceptOffer({
            credentialRecordId: credentialRecord.id,
          })
          break
        }
        case CredentialState.RequestSent: {
          // 発行オファーを受理後、発行要求を投げた後に動く。
          console.log('Sent a credential request.')
          break
        }
        case CredentialState.CredentialReceived: {
          // 発行されたCredentialを受け取った際に動く。
          console.log('Storing a credential...')
          await holder.credentials.acceptCredential({
            credentialRecordId: credentialRecord.id,
          })
          break
        }
        case CredentialState.Done: {
          // Credentialを受理した後に動く。
          console.log('a credential has been accepted.')
          const storedCredentialRecord = await holder.credentials.findById(
            credentialRecord.id
          )
          console.log(
            `stored credential: ${JSON.stringify(storedCredentialRecord)}`
          )
          break
        }
      }
    }
  )
}

export const registerRevocNotificationListener = (holder: Agent): void => {
  holder.events.on(
    CredentialEventTypes.RevocationNotificationReceived,
    async ({payload}) => {
      console.log(
        `Handling a revocation notification event.: ${JSON.stringify(payload)}`
      )
    }
  )
}
