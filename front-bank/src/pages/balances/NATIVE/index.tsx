import { TransactionStatus } from '@bitkub-chain/sdk.js'
import { useEffect, useState } from 'react'

import { useAuth } from '@contexts/auth'

import AuthenticationsSection from '@components/authentications-section'

import { sdk } from '@lib/bitkubchain-sdk'
import {
  BlockWrapper,
  InputTitle,
  ItemWrapper,
  LoadingWrapper,
  Spinner,
  StatusText,
  Title,
  TransactionStatusWrapper,
  TransactionWrapper,
} from '@styles/custom-styled-components'

// If the network is Network.BKC_MAINNET or Network.BKC_TESTNET, KKUB balance will be returned.
// Otherwise, the native currency of the network will be returned.
const KKUB_ADDRESS = '0x1BbE34CF9fd2E0669deEE34c68282ec1e6c44ab0'

const BalanceNative = () => {
  const { isLoggedIn } = useAuth()

  const [toAddress, setToAddress] = useState<string>('')
  const [balance, setBalance] = useState<string | null>(null)
  const [isApprovedToken, setIsApprovedToken] = useState<boolean>(false)
  const [queueId, setQueueId] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [allowanceAmount, setAllowanceAmount] = useState<string>('10000000000000000000000')
  const [amount, setAmount] = useState<string>('')
  const [showSetAllowanceModal, setShowSetAllowanceModal] = useState<boolean>(false)
  const [status, setStatus] = useState<TransactionStatus>()

  useEffect(() => {
    if (isLoggedIn) {
      handleGetIsApprovedToken()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (queueId) {
      // interval get transaction detail every 3 seconds until FAILED or MINED
      const interval = setInterval(async () => {
        const result = await handleGetTransactionDetail(queueId)
        setStatus(result.status)
        if (result.status === 'MINED') {
          setTxHash(result.txHash)
          setQueueId('')
          handleGetIsApprovedToken()
          setLoading(false)
          clearInterval(interval)
        } else if (result.status === 'FAILED') {
          setQueueId('')
          setLoading(false)
          clearInterval(interval)
          setStatus(undefined)
        }
      }, 3000)
    }
  }, [queueId])

  const handleGetIsApprovedToken = async () => {
    const allowanceToken = await sdk.getAllowanceToken(KKUB_ADDRESS)
    setIsApprovedToken(allowanceToken.toString() !== '0')
  }

  // Approval allows the contract to access or transfer your tokens, ensuring security and proper permissions.
  const handleApproveToken = async () => {
    setLoading(true)
    const result = await sdk.approveToken(KKUB_ADDRESS, allowanceAmount)
    setQueueId(result.queueID)
  }

  const handleGetTransactionDetail = async (queue: string) => {
    return await sdk.getTransactionDetails(queue)
  }

  const handleTransferNative = async () => {
    setLoading(true)
    const result = await sdk.transferNative(toAddress, amount)
    setQueueId(result.queueID)
  }

  const handleGetBalance = async () => {
    const data = await sdk.getBalanceNative()
    setBalance(data.balance.toString())
  }

  return (
    <>
      <h1>Balance Native</h1>
      <AuthenticationsSection />
      <div className='divider' />
      {isLoggedIn && (
        <>
          <h2>Get Balance Native</h2>
          <Title>sdk.getBalanceNative()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={balance !== null}>
              <button className='primary-button' onClick={handleGetBalance}>
                Execute
              </button>
            </ItemWrapper>
            {balance !== null && <BlockWrapper>{balance}</BlockWrapper>}
          </div>
          <div className='divider' />
          <h2>Transfer Balance Native</h2>
          <Title>sdk.transferNative()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
              <InputTitle>To Address</InputTitle>
              <input onChange={(e) => setToAddress(e.target.value)} placeholder='To Address' value={toAddress} />
              <InputTitle>Amount (in Wei)</InputTitle>
              <input onChange={(e) => setAmount(e.target.value)} placeholder='Amount' value={amount} />
              {isApprovedToken ? (
                <button className='primary-button' disabled={!toAddress || loading} onClick={handleTransferNative}>
                  {loading ? (
                    <LoadingWrapper>
                      <Spinner /> Loading
                    </LoadingWrapper>
                  ) : (
                    <>Transfer</>
                  )}
                </button>
              ) : (
                <button className='primary-button' disabled={loading} onClick={() => setShowSetAllowanceModal(true)}>
                  Approve Token
                </button>
              )}
            </ItemWrapper>
            {isApprovedToken && status && (
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
        </>
      )}

      {showSetAllowanceModal && (
        <div className='modal' id='modal'>
          <div className='modal-content'>
            <span
              className='close'
              onClick={() => {
                setShowSetAllowanceModal(false)
                setAllowanceAmount('')
                setStatus(undefined)
              }}
            >
              &times;
            </span>
            <h2>Approve Token</h2>

            <Title>sdk.approveToken()</Title>
            <div className='flex flex-direction-col'>
              <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
                <InputTitle>Allowance Amount (in Wei)</InputTitle>
                <input
                  onChange={(e) => setAllowanceAmount(e.target.value)}
                  placeholder='Allowance Amount'
                  value={allowanceAmount}
                />

                <button className='primary-button' disabled={!allowanceAmount || loading} onClick={handleApproveToken}>
                  {loading ? (
                    <LoadingWrapper>
                      <Spinner /> Loading
                    </LoadingWrapper>
                  ) : (
                    <>Approve Token</>
                  )}
                </button>
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

            <h5>
              *Setting an allowance lets you control how many tokens a contract can use, so you can keep your assets secure.
            </h5>
          </div>
        </div>
      )}
    </>
  )
}

export default BalanceNative
