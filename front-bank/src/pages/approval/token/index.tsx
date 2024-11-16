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

const ApprovalToken = () => {
  const { isLoggedIn } = useAuth()

  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('1000000000000000000')
  const [spenderAddress, setSpenderAddress] = useState<string | undefined>(undefined)
  const [queueId, setQueueId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [status, setStatus] = useState<TransactionStatus>()
  const [allowanceAmount, setAllowanceAmount] = useState<string | null>(null)

  useEffect(() => {
    if (queueId) {
      // interval get transaction detail every 3 seconds until FAILED or MINED
      const interval = setInterval(async () => {
        const result = await handleGetTransactionDetail(queueId)
        setStatus(result.status)
        if (result.status === 'MINED') {
          setTxHash(result.txHash)
          setQueueId('')
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

  const handleGetTransactionDetail = async (queue: string) => {
    return await sdk.getTransactionDetails(queue)
  }

  const handleApproveToken = async () => {
    setLoading(true)
    const result = await sdk.approveToken(tokenAddress, amount, spenderAddress)
    setQueueId(result.queueID)
  }

  const handleGetAllowance = async () => {
    const data = await sdk.getAllowanceToken(tokenAddress, spenderAddress)
    setAllowanceAmount(data.toString())
  }

  return (
    <>
      <h1>Approval Token</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <h2>Get Token Allowance</h2>
          <Title>sdk.getAllowanceToken()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={allowanceAmount !== null}>
              <InputTitle>Token Address</InputTitle>
              <input onChange={(e) => setTokenAddress(e.target.value)} placeholder='Token Address' value={tokenAddress} />

              <InputTitle>Spender Address (optional)</InputTitle>
              <input onChange={(e) => setSpenderAddress(e.target.value)} placeholder='Spender Address' value={spenderAddress} />

              <button className='primary-button' onClick={handleGetAllowance}>
                Execute
              </button>
            </ItemWrapper>
            {allowanceAmount !== null && <BlockWrapper>{allowanceAmount}</BlockWrapper>}
          </div>
          <div className='divider' />
          <h2>Approve Token</h2>
          <Title>sdk.approveToken()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
              <InputTitle>Token Address</InputTitle>
              <input
                disabled
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder='Token Address'
                value={tokenAddress}
              />

              <InputTitle>Spender Address (optional)</InputTitle>
              <input
                disabled
                onChange={(e) => setSpenderAddress(e.target.value)}
                placeholder='Spender Address'
                value={spenderAddress}
              />

              <InputTitle>Allowance Amount (in Wei)</InputTitle>
              <input onChange={(e) => setAmount(e.target.value)} placeholder='Amount' value={amount} />

              <button className='primary-button' disabled={!tokenAddress || !amount || loading} onClick={handleApproveToken}>
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
        </>
      )}
    </>
  )
}

export default ApprovalToken
