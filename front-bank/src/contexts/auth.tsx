import { LoginStatus, UserInfo } from '@bitkub-chain/sdk.js'
import { FC, createContext, useContext, useEffect, useState } from 'react'

import { sdk } from '@lib/bitkubchain-sdk'

interface AuthContext {
  userInfo: UserInfo | null | undefined
  loginStatus: LoginStatus
  loginWithBitkubNext: () => Promise<void>
  logout: () => Promise<void>
  authLoading: boolean
  isLoggedIn: boolean
}

const defaultAuthContextValue = {
  userInfo: undefined,
  loginStatus: LoginStatus.NOT_CONNECTED,
  loginWithBitkubNext: async () => {},
  logout: async () => {},
  authLoading: false,
  isLoggedIn: false,
}

const AuthContext = createContext<AuthContext>(defaultAuthContextValue)

interface AuthProviderProps {
  children?: React.ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState<LoginStatus>(defaultAuthContextValue.loginStatus)
  const [userInfo, setUserInfo] = useState<UserInfo | null | undefined>(defaultAuthContextValue.userInfo)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentStatus = await sdk.loginStatus()
      if (currentStatus === LoginStatus.CONNECTED) {
        const info = await sdk.getUserInfo()
        setUserInfo(info)
      } else if (currentStatus === LoginStatus.NOT_CONNECTED) {
        setUserInfo(null)
      }
      setLoginStatus(currentStatus)
      setAuthLoading(false)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const loginWithBitkubNext = async () => {
    setAuthLoading(true)
    if (loginStatus !== LoginStatus.CONNECTED) {
      await sdk.loginWithBitkubNext()
    }
  }

  const logout = async () => {
    setAuthLoading(true)
    await sdk.logout()
    setAuthLoading(false)
    window.location.href = `https://accounts.bitkubnext.com/logout?from=${window.location.href}`
  }

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        userInfo,
        loginWithBitkubNext,
        logout,
        authLoading,
        isLoggedIn: loginStatus === LoginStatus.CONNECTED,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
