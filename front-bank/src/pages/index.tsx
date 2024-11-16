import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import AuthenticationsSection from '@components/authentications-section'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <h1 className='text-center'>BitkubChain SDK Cookbook Template</h1>

      <AuthenticationsSection />

      <div className='divider' />
      <Title>AUTHENTICATION</Title>
      <Subtitle onClick={() => router.push('/authentications')}>User</Subtitle>

      <div className='divider' />

      <Title>BALANCES</Title>
      <Subtitle onClick={() => router.push(`/balances/NATIVE`)}>NATIVE</Subtitle>
      <Subtitle onClick={() => router.push(`/balances/KAP20`)}>KAP20</Subtitle>
      <Subtitle onClick={() => router.push(`/balances/KAP721`)}>KAP721</Subtitle>
      <Subtitle onClick={() => router.push(`/balances/KAP1155`)}>KAP1155</Subtitle>

      <div className='divider' />

      <Title>Approval</Title>
      <Subtitle onClick={() => router.push(`/approval/token`)}>Token</Subtitle>
      <Subtitle onClick={() => router.push(`/approval/nft`)}>NFT</Subtitle>

      <div className='divider' />
      <Title>Custom</Title>
      <Subtitle onClick={() => router.push(`/custom-tx`)}>Transactions</Subtitle>
    </>
  )
}

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`

const Subtitle = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 8px;
`
