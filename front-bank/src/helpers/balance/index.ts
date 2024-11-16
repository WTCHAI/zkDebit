import { sdk } from '@lib/bitkubchain-sdk'

/* Get balance */
export const getBalanceNative = async () => {
  return await sdk.getBalanceNative()
}

export const getBalance20 = async (tokenAddress: string) => {
  return await sdk.getBalance20(tokenAddress)
}

export const getBalance721 = async (tokenAddress: string) => {
  return await sdk.getBalance721(tokenAddress)
}

export const getBalance1155 = async (tokenAddress: string, tokenID: string) => {
  return await sdk.getBalance1155(tokenAddress, tokenID)
}

/* Transfer */
export const transferNative = async (toAddress: string, amount: string) => {
  return await sdk.transferNative(toAddress, amount)
}

export const transfer20 = async (tokenAddress: string, toAddress: string, amount: string) => {
  const result = await sdk.transfer20(tokenAddress, toAddress, amount)
  return result
}

export const transfer721 = async (tokenAddress: string, toAddress: string, tokenID: string) => {
  return await sdk.transfer721(tokenAddress, toAddress, tokenID)
}

export const transfer1155 = async (tokenAddress: string, toAddress: string, tokenID: string, amount: string) => {
  return await sdk.transfer1155(tokenAddress, toAddress, tokenID, amount)
}

/* Approval Token */
const getAllowanceToken = async (tokenAddress: string, spenderAddress?: string) => {
  return await sdk.getAllowanceToken(tokenAddress, spenderAddress)
}

export const isApprovedToken = async (tokenAddress: string, spenderAddress?: string) => {
  const allowanceToken = await getAllowanceToken(tokenAddress, spenderAddress)
  return allowanceToken.toString() !== '0'
}

export const approveToken = async (tokenAddress: string, amount: string, spenderAddress?: string) => {
  return await sdk.approveToken(tokenAddress, amount, spenderAddress)
}

/* Approval NFT */
export const getIsApprovedNFT = async (tokenAddress: string, operatorAddress?: string) => {
  return await sdk.getIsApprovedNFT(tokenAddress, operatorAddress)
}

export const approveNFT = async (tokenAddress: string, operatorAddress?: string) => {
  return await sdk.approveNFT(tokenAddress, operatorAddress)
}
