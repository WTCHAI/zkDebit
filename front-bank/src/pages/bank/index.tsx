import { TransactionStatus } from '@bitkub-chain/sdk.js'
// import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

import { useAuth } from '@contexts/auth'

import AuthenticationsSection from '@components/authentications-section'

import { sdk } from '@lib/bitkubchain-sdk'
import {
  BlockWrapper,
  // InputTitle,
  ItemWrapper,
  LoadingWrapper,
  Spinner,
  StatusText,
  // Title,
  TransactionStatusWrapper,
  TransactionWrapper,
} from '@styles/custom-styled-components'

// when read contract use this abi cannot use by abi only
// import { abi } from './abi'

// const DEFAULT_FUNCTION_READABLE_ABI = 'transfer(address _tokenAddr, address _recipient, uint256 _amount, address _bitkubNext)'


// const wordAddress = '0x493eD3FEAB1a9660aB2A36B31A8b2DC7aD513B82'
// const SET_ABI = 'function setWord(string memory newWord, address _bitkubNext)'

// const KKUB_ADDRESS = '0x1BbE34CF9fd2E0669deEE34c68282ec1e6c44ab0'
// const nameABI = 'function name() external view returns (string memory)'

const kaddress = '0x0c37ea7260cb52F070B0c424caD8f80045e8248F';

// address _bitkubNext it automate by bitkub
// const verify_abi = 'function verifyTransaction(string memory _transactionHashed, uint[2] calldata p_a, uint[2][2] calldata p_b, uint[2] calldata p_c, uint[2] calldata pub_output, address _bitkubNext)';
const add_abi = 'function addTransactionHashedInfo(string memory _transactionHashed, uint _amount, address _bitkubNext)';
const set = 'function setAdmin(address _admin2, address _bitkubNext)'

const CustomTx = () => {
  const { isLoggedIn } = useAuth()

  // const [contractAddress, setContractAddress] = useState<string>('0x9688F8174eCb3f8c0f17832b9D66a118435a3e60') // Example contract address to transfer kap20
  // const [functionReadableABI, setFunctionReadableABI] = useState<string>(DEFAULT_FUNCTION_READABLE_ABI)
  // const [methodParams, setMethodParams] = useState(`["${KKUB_ADDRESS}", "to-address", "1000000000000000000"]`)

  const [queueId, setQueueId] = useState<string>('')
  const [status, setStatus] = useState<TransactionStatus | null>(null)
  const [txHash, setTxHash] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (queueId) {
      // interval get transaction detail every 3 seconds until FAILED or MINED
      const interval = setInterval(async () => {
        const result = await handleGetTransactionDetail(queueId)
        setStatus(result.status)
        if (result.status === TransactionStatus.MINED) {
          setTxHash(result.txHash)
          setQueueId('')
          setLoading(false)
          clearInterval(interval)
        } else if (result.status === TransactionStatus.FAILED) {
          setQueueId('')
          setLoading(false)
          clearInterval(interval)
        }
      }, 3000)
    }
  }, [queueId])

  const handleGetTransactionDetail = async (queue: string) => {
    return await sdk.getTransactionDetails(queue)
  }

  // const setTransaction = async () => {
  //   setLoading(true)
  //   const now = new Date()
  //   const param = `["${now.toLocaleString()}"]`
  //   // eslint-disable-next-line no-console
  //   console.log(JSON.parse(param))
  //   const result = await sdk.sendCustomTx(wordAddress, SET_ABI, JSON.parse(param))
  //   // eslint-disable-next-line no-console
  //   console.log('done')
  //   setQueueId(result.queueID)
  // }

  // click for read contract use this form when read not write
  // const getTransaction = async () => {
  //   const provider = new ethers.JsonRpcProvider('https://rpc-testnet.bitkubchain.io');
  //   const contract = new ethers.Contract(wordAddress, abi, provider);
  //   const result = await contract.getWord();
    
  //   // eslint-disable-next-line no-console
  //   console.log(result)
  //   // setQueueId(result.queueID)
  // }

  const setAdmin = async () => {
    setLoading(true)
    // change to your bitkub next address for test
    const param = `["0x29C0A5aD533118fbe5d4A1eba96f4652b58f65bE"]`;
    // eslint-disable-next-line no-console
    console.log(JSON.parse(param))
    const result = await sdk.sendCustomTx(kaddress, set, JSON.parse(param))
    // eslint-disable-next-line no-console
    console.log('done')
    setQueueId(result.queueID)
  }

  // add by bank
  const addTx = async () => {
    setLoading(true)
    const param = `["abc", "10"]`;
    // eslint-disable-next-line no-console
    console.log(JSON.parse(param))
    const result = await sdk.sendCustomTx(kaddress, add_abi, JSON.parse(param))
    // eslint-disable-next-line no-console
    console.log('done')
    setQueueId(result.queueID)
  }

  return (
    <>
      <h1>⚙️ Custom Transaction</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <h2>Send Custom Transaction</h2>
          {/* <button onClick={async () => await getTransaction()}>Get</button>
          <button onClick={setTransaction}>Set</button>
          <button onClick={name}>name</button> */}
          <button onClick={setAdmin}>set admin</button>
          <button onClick={addTx}>add tx</button>
          {/* <Title>sdk.sendCustomTx()</Title> */}
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={status !== null}>
              {/* <InputTitle>Contract Address</InputTitle>
              <input onChange={(e) => setContractAddress(e.target.value)} placeholder='Token Address' value={contractAddress} />

              <InputTitle>Function Readable ABI</InputTitle>
              <input
                onChange={(e) => setFunctionReadableABI(e.target.value)}
                placeholder={DEFAULT_FUNCTION_READABLE_ABI}
                value={functionReadableABI}
              /> */}

              {/* <InputTitle>Method Params</InputTitle>
              <input onChange={(e) => setMethodParams(e.target.value)} placeholder='[1, 2]' value={methodParams} /> */}

              {loading ? (
                  <LoadingWrapper>
                    <Spinner /> Loading
                  </LoadingWrapper>
                ) : (
                  <>Execute</>
                )}
            </ItemWrapper>
            {status && (
              <BlockWrapper>
                <TransactionWrapper>
                  <TransactionStatusWrapper>Transaction status:</TransactionStatusWrapper>
                  <StatusText status={status}>{status}</StatusText>
                </TransactionWrapper>

                {txHash && status === TransactionStatus.MINED && (
                  <TransactionWrapper>
                    <TransactionStatusWrapper>Transaction Hash:</TransactionStatusWrapper>
                    <a href={`https://testnet.bkcscan.com/tx/${txHash}`} target='_blank'>
                      {txHash}
                    </a>
                  </TransactionWrapper>
                )}
              </BlockWrapper>
            )}
          </div>
          <div className='divider' />
        </>
      )}
    </>
  )
}

export default CustomTx
