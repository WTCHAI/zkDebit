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

const Balance1155 = () => {
  const { isLoggedIn } = useAuth()

  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [toAddress, setToAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [balance, setBalance] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<string>('')
  const [isApprovedNFT, setIsApprovedNFT] = useState<boolean>(false)
  const [queueId, setQueueId] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showSetApproveNFTModal, setShowSetApproveNFTModal] = useState<boolean>(false)
  const [status, setStatus] = useState<TransactionStatus>()

  useEffect(() => {
    if (isLoggedIn && tokenAddress) {
      handleGetIsApprovedNFT()
    }
  }, [isLoggedIn, tokenAddress])

  useEffect(() => {
    if (queueId) {
      // interval get transaction detail every 3 seconds until FAILED or MINED
      const interval = setInterval(async () => {
        const result = await handleGetTransactionDetail(queueId)
        setStatus(result.status)
        if (result.status === TransactionStatus.MINED) {
          setTxHash(result.txHash)
          setQueueId('')
          handleGetIsApprovedNFT()
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

  const handleGetIsApprovedNFT = async () => {
    if (tokenAddress) {
      const result = await sdk.getIsApprovedNFT(tokenAddress)
      setIsApprovedNFT(result)
    }
  }

  // Approval allows the contract to access or transfer your tokens, ensuring security and proper permissions.
  const handleApproveNFT = async () => {
    setLoading(true)
    const result = await sdk.approveNFT(tokenAddress)
    setQueueId(result.queueID)
  }

  const handleGetTransactionDetail = async (queue: string) => {
    return await sdk.getTransactionDetails(queue)
  }

  const handleTransferNFT = async () => {
    setLoading(true)
    const result = await sdk.transfer1155(tokenAddress, toAddress, tokenId, amount)
    setQueueId(result.queueID)
  }

  const handleGetBalance = async () => {
    const data = await sdk.getBalance1155(tokenAddress, tokenId)
    setBalance(data.toString())
  }

  return (
    <>
      <h1>🖼️ Balance KAP1155</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <h2>Get Balance KAP1155</h2>
          <Title>sdk.getBalance1155()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={balance !== null}>
              <InputTitle>Token Address</InputTitle>
              <input onChange={(e) => setTokenAddress(e.target.value)} placeholder='Token Address' value={tokenAddress} />
              <InputTitle>Token ID</InputTitle>
              <input onChange={(e) => setTokenId(e.target.value)} placeholder='Token ID' value={tokenId} />
              <button className='primary-button' onClick={handleGetBalance}>
                Execute
              </button>
            </ItemWrapper>
            {balance !== null && <BlockWrapper>{balance}</BlockWrapper>}
          </div>
          <div className='divider' />
          <h2>Transfer Balance KAP1155</h2>
          <Title>sdk.transfer1155()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
              <InputTitle>Token Address</InputTitle>
              <input
                disabled
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder='Token Address'
                value={tokenAddress}
              />
              <InputTitle>Token ID</InputTitle>
              <input disabled onChange={(e) => setTokenId(e.target.value)} placeholder='Token Address' value={tokenId} />
              <InputTitle>Amount</InputTitle>
              <input onChange={(e) => setAmount(e.target.value)} placeholder='Amount' value={amount} />
              <InputTitle>To Address</InputTitle>
              <input onChange={(e) => setToAddress(e.target.value)} placeholder='Token Address' value={toAddress} />
              {isApprovedNFT ? (
                <button className='primary-button' disabled={!toAddress || loading} onClick={handleTransferNFT}>
                  {loading ? (
                    <LoadingWrapper>
                      <Spinner /> Loading
                    </LoadingWrapper>
                  ) : (
                    <>Transfer</>
                  )}
                </button>
              ) : (
                <button
                  className='primary-button'
                  disabled={loading}
                  onClick={() => {
                    setStatus(undefined)
                    setShowSetApproveNFTModal(true)
                  }}
                >
                  Approve NFT
                </button>
              )}
            </ItemWrapper>
            {isApprovedNFT && status && !showSetApproveNFTModal && (
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

      {showSetApproveNFTModal && (
        <div className='modal' id='modal'>
          <div className='modal-content'>
            <span
              className='close'
              onClick={() => {
                setShowSetApproveNFTModal(false)
                setStatus(undefined)
              }}
            >
              &times;
            </span>
            <h2>Approve NFT</h2>

            <Title>sdk.approveNFT()</Title>
            <div className='flex flex-direction-col'>
              <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
                <button className='primary-button' disabled={loading} onClick={handleApproveNFT}>
                  {loading ? (
                    <LoadingWrapper>
                      <Spinner /> Loading
                    </LoadingWrapper>
                  ) : (
                    <>Approve NFT</>
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

            <h5>*Approving NFT lets you control how a contract can use, so you can keep your assets secure.</h5>
          </div>
        </div>
      )}
    </>
  )
}

export default Balance1155
