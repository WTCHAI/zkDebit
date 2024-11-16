import { sdk } from '@lib/bitkubchain-sdk'

export const getUserWalletAddress = async () => {
  return await sdk.getUserWalletAddress()
}

export const getUserTel = async () => {
  return await sdk.getUserTel()
}

export const getUserEmail = async () => {
  return await sdk.getUserEmail()
}

export const getUserID = async () => {
  return await sdk.getUserID()
}

export const getUserInfo = async () => {
  return await sdk.getUserInfo()
}
