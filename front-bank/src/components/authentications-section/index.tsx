import { useAuth } from '@contexts/auth'

import { LoginStatusText, LoginWrapper } from '@styles/custom-styled-components'

const AuthenticationsSection = () => {
  const { loginStatus, loginWithBitkubNext, logout, isLoggedIn } = useAuth()

  return (
    <LoginWrapper>
      Login status: <LoginStatusText status={loginStatus}>{loginStatus}</LoginStatusText>
      {isLoggedIn ? (
        <button className='primary-button' onClick={logout}>
          Disconnect
        </button>
      ) : (
        <button className='primary-button' onClick={loginWithBitkubNext}>
          Login With Bitkub Next
        </button>
      )}
    </LoginWrapper>
  )
}

export default AuthenticationsSection
