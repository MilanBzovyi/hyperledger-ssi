import React, {useState, useEffect} from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import {
  Agent,
  WsOutboundTransport,
  HttpOutboundTransport,
  ConsoleLogger,
  LogLevel,
  MediatorPickupStrategy,
} from '@aries-framework/core'
import {agentDependencies} from '@aries-framework/react-native'
import AgentProvider from '@aries-framework/react-hooks'
import RootNavigator from './src/navigators'
import {
  registerConnectionListener,
  registerMediationListener,
  registerVCIssuingListener,
  registerRevocNotificationListener,
} from './src/EventListeners'
import {GENESIS_URL, MEDIATOR_URL} from '@env'

const App = () => {
  const [agent, setAgent] = useState<Agent | undefined>(undefined)

  const initializeAgent = async (): Promise<Agent> => {
    const genesisTransactionsResponse = await fetch(GENESIS_URL)
    const genesisTransactionsOfVon = await genesisTransactionsResponse.text()
    console.log(genesisTransactionsOfVon)

    const options = {
      config: {
        label: 'rn-holder-agent',
        walletConfig: {
          id: 'rn-holder-wallet',
          key: 'testkey0000000000000000000000000',
        },
        connectToIndyLedgersOnStartup: true,
        indyLedgers: [
          {
            genesisTransactions: genesisTransactionsOfVon,
            id: 'aws-von-net',
            isProduction: false,
            indyNamespace: 'aws-von-net',
          },
        ],
        autoAcceptConnections: true,
        useLegacyDidSovPrefix: true,
        logger: new ConsoleLogger(LogLevel.test),
        mediatorConnectionsInvite: MEDIATOR_URL,
        mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
      },
      dependencies: agentDependencies,
    }

    const holder = new Agent(options)
    holder.registerOutboundTransport(new HttpOutboundTransport())
    holder.registerOutboundTransport(new WsOutboundTransport())
    await holder.initialize()

    console.log('registering event listeners...')
    registerConnectionListener(holder)
    registerMediationListener(holder)
    registerVCIssuingListener(holder)
    registerRevocNotificationListener(holder)

    setAgent(holder)
    return holder
  }

  useEffect(() => {
    // 初期処理
    ;(async () => {
      await initializeAgent()
    })()
  }, [])

  return (
    <AgentProvider agent={agent}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </AgentProvider>
  )
}

export default App
