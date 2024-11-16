import { useEffect } from 'react'

import { sdk } from '@lib/bitkubchain-sdk'

export default function Page() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      exchange(code)
    }
  }, [])

  const exchange = async (code: string) => {
    await sdk.exchangeAuthorizationCode(code)
    window.close()
  }

  return (
    <div>
      <h2>Callback Page</h2>
      <p>Exchanging code for tokens...</p>
    </div>
  )
}
