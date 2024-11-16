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

const Balance20 = () => {
  const { isLoggedIn } = useAuth()

  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [toAddress, setToAddress] = useState<string>('')
  const [balance, setBalance] = useState<string | null>(null)
  const [isApprovedToken, setIsApprovedToken] = useState<boolean>(false)
  const [queueId, setQueueId] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [allowanceAmount, setAllowanceAmount] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [showSetAllowanceModal, setShowSetAllowanceModal] = useState<boolean>(false)
  const [status, setStatus] = useState<TransactionStatus>()

  useEffect(() => {
    if (isLoggedIn && tokenAddress) {
      handleGetIsApprovedToken()
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
          handleGetIsApprovedToken()
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

  const handleGetIsApprovedToken = async () => {
    try {
      const allowanceToken = await sdk.getAllowanceToken(tokenAddress)
      setIsApprovedToken(allowanceToken.toString() !== '0')
    } catch {}
  }

  // Approval allows the contract to access or transfer your tokens, ensuring security and proper permissions.
  const handleApproveToken = async () => {
    setLoading(true)
    const result = await sdk.approveToken(tokenAddress, allowanceAmount)
    setQueueId(result.queueID)
  }

  const handleGetTransactionDetail = async (queue: string) => {
    return await sdk.getTransactionDetails(queue)
  }

  const handleTransferToken20 = async () => {
    setLoading(true)
    const result = await sdk.transfer20(tokenAddress, toAddress, amount)
    setQueueId(result.queueID)
  }

  const handleGetBalance = async () => {
    const data = await sdk.getBalance20(tokenAddress)
    setBalance(data.balance.toString())
  }

  return (
    <>
      <h1>💰 Balance KAP20</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <h2>Get Balance KAP20</h2>
          <Title>sdk.getBalance20()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={balance !== null}>
              <InputTitle>Token Address</InputTitle>
              <input onChange={(e) => setTokenAddress(e.target.value)} placeholder='Token Address' value={tokenAddress} />
              <button className='primary-button' onClick={handleGetBalance}>
                Execute
              </button>
            </ItemWrapper>
            {balance !== null && <BlockWrapper>{balance}</BlockWrapper>}
          </div>
          <div className='divider' />
          <h2>Transfer Balance KAP20</h2>
          <Title>sdk.transfer20()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono flex flex-direction-col' showData={!!status}>
              <InputTitle>Token Address</InputTitle>
              <input
                disabled
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder='Token Address'
                value={tokenAddress}
              />
              <InputTitle>To Address</InputTitle>
              <input onChange={(e) => setToAddress(e.target.value)} placeholder='Token Address' value={toAddress} />
              <InputTitle>Amount (in Wei)</InputTitle>
              <input onChange={(e) => setAmount(e.target.value)} placeholder='Amount' value={amount} />
              {isApprovedToken ? (
                <button className='primary-button' disabled={!toAddress || loading} onClick={handleTransferToken20}>
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
                    setShowSetAllowanceModal(true)
                  }}
                >
                  Approve Token
                </button>
              )}
            </ItemWrapper>
            {isApprovedToken && status && !showSetAllowanceModal && (
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

export default Balance20
