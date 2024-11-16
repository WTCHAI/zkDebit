import { LoginStatus, TransactionStatus } from '@bitkub-chain/sdk.js'
import styled, { keyframes } from 'styled-components'

export const LoginStatusText = styled.span<{ status: LoginStatus }>`
  font-weight: normal;
  font-size: 16px;
  ${({ status }) => {
    switch (status) {
      case LoginStatus.CONNECTED:
        return `color : green`
      case LoginStatus.NOT_CONNECTED:
        return `color : red`
    }
  }}
`

export const StatusText = styled.span<{ status: TransactionStatus | undefined }>`
  font-weight: bold;
  font-size: 16px;
  ${({ status }) => {
    switch (status) {
      case TransactionStatus.PENDING:
        return `color : #faad14`
      case TransactionStatus.SUCCESS:
        return `color : #1677ff`
      case TransactionStatus.MINED:
        return `color : #52c41a`
      case TransactionStatus.FAILED:
        return `color : #ff4d4f`
      default:
        return `color : #faad14`
    }
  }}
`

export const LoginWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: bold;
`

export const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const BlockWrapper = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  border: 1px solid #49cc90;
  padding: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.19);
  border-top: none;
  word-wrap: break-word;

  font-size: 14px;
`

export const ItemWrapper = styled.div<{ showData: boolean }>`
  border: 1px solid rgb(73, 204, 144);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 8px;
  gap: 8px;
  background: rgba(73, 204, 144, 0.1);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.19);
  ${({ showData }) => !showData && `border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;`}
`
export const LongContentWrapper = styled.pre`
  max-height: 220px;
  overflow-y: scroll;
`

export const InputTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`

export const TransactionStatusWrapper = styled.div`
  font-weight: bold;
  margin-right: 6px;
  font-size: 14px;
`

export const TransactionWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`

const spin = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #ccc;
  border-top: 2px solid #29be65;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`
