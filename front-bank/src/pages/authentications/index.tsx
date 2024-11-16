import { UserInfo } from '@bitkub-chain/sdk.js'
import { useState } from 'react'

import { useAuth } from '@contexts/auth'

import AuthenticationsSection from '@components/authentications-section'

import { sdk } from '@lib/bitkubchain-sdk'
import { BlockWrapper, ItemWrapper, LongContentWrapper, Title } from '@styles/custom-styled-components'

const AuthenticationPage = () => {
  const { isLoggedIn } = useAuth()

  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [userWalletAddress, setUserWalletAddress] = useState<string>()
  const [userTel, setUserTel] = useState<string>()
  const [userEmail, setUserEmail] = useState<string>()
  const [userID, setUserID] = useState<string>()

  return (
    <>
      <h1>🔐 Authentication</h1>
      <AuthenticationsSection />
      <div className='divider' />

      {isLoggedIn && (
        <>
          <Title>sdk.getUserInfo()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={!!userInfo}>
              <button
                className='primary-button'
                onClick={async () => {
                  const data = await sdk.getUserInfo()
                  setUserInfo(data)
                }}
              >
                Execute
              </button>
            </ItemWrapper>
            {userInfo && (
              <BlockWrapper>
                <LongContentWrapper>{JSON.stringify(userInfo, null, 2)}</LongContentWrapper>
              </BlockWrapper>
            )}
          </div>

          <div className='divider' />

          <Title>sdk.getUserWalletAddress()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={!!userWalletAddress}>
              <button
                className='primary-button'
                onClick={async () => {
                  const data = await sdk.getUserWalletAddress()
                  setUserWalletAddress(data)
                }}
              >
                Execute
              </button>
            </ItemWrapper>
            {userWalletAddress && <BlockWrapper>{userWalletAddress}</BlockWrapper>}
          </div>

          <div className='divider' />

          <Title>sdk.getUserTel()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={!!userTel}>
              <button
                className='primary-button'
                onClick={async () => {
                  const data = await sdk.getUserTel()
                  setUserTel(data)
                }}
              >
                Execute
              </button>
            </ItemWrapper>
            {userTel && <BlockWrapper>{userTel}</BlockWrapper>}
          </div>

          <div className='divider' />

          <Title>sdk.getUserEmail()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={!!userEmail}>
              <button
                className='primary-button'
                onClick={async () => {
                  const data = await sdk.getUserEmail()
                  setUserEmail(data)
                }}
              >
                Execute
              </button>
            </ItemWrapper>
            {userEmail && <BlockWrapper>{userEmail}</BlockWrapper>}
          </div>

          <div className='divider' />

          <Title>sdk.getUserID()</Title>
          <div className='flex flex-direction-col'>
            <ItemWrapper className='ibm-plex-mono' showData={!!userID}>
              <button
                className='primary-button'
                onClick={async () => {
                  const data = await sdk.getUserID()
                  setUserID(data)
                }}
              >
                Execute
              </button>
            </ItemWrapper>
            {userID && <BlockWrapper>{userID}</BlockWrapper>}
          </div>
        </>
      )}
    </>
  )
}

export default AuthenticationPage
