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
  const [operatorAddress, setOperatorAddress] = useState<string | undefined>(undefined)
  const [queueId, setQueueId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [status, setStatus] = useState<TransactionStatus>()
  const [isApprovedNFT, setIsApprovedNFT] = useState<boolean | null>(null)

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

  const handleApproveNFT = async () => {
    setLoading(true)
    const result = await sdk.approveNFT(tokenAddress, operatorAddress)
    setQueueId(result.queueID)
  }

  const handleGetIsApprovedNFT = async () => {
    const result = await sdk.getIsApprovedNFT(tokenAddress, operatorAddress)
    setIsApprovedNFT(result)
  }

  return (
    <>
      <h1>Approval NFT</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <h2>Get Is Approved NFT</h2>
          <Title>sdk.getIsApprovedNFT()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={typeof isApprovedNFT === 'boolean'}>
              <InputTitle>NFT Address</InputTitle>
              <input onChange={(e) => setTokenAddress(e.target.value)} placeholder='Token Address' value={tokenAddress} />

              <InputTitle>Operator Address (optional)</InputTitle>
              <input
                onChange={(e) => setOperatorAddress(e.target.value)}
                placeholder='Operator Address'
                value={operatorAddress}
              />

              <button className='primary-button' onClick={handleGetIsApprovedNFT}>
                Execute
              </button>
            </ItemWrapper>
            {typeof isApprovedNFT === 'boolean' && <BlockWrapper>{isApprovedNFT.toString()}</BlockWrapper>}
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

              <InputTitle>Operator Address (optional)</InputTitle>
              <input
                disabled
                onChange={(e) => setOperatorAddress(e.target.value)}
                placeholder='Operator Address'
                value={operatorAddress}
              />

              <button className='primary-button' disabled={!tokenAddress || loading} onClick={handleApproveNFT}>
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
