import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const Hoc = (props: { children: React.ReactNode }) => {
  const { children } = props
  const router = useRouter()

  return (
    <>
      <Header>
        <Logo onClick={() => router.push('/')} src='/logo/bitkub-chain-black.png' />
        <div className='divider-vertical' />
        <TitleWrapper> Bitkub SDK Cookbook</TitleWrapper>
      </Header>
      <Container className='flex flex-direction-col'>
        {children}
        <Footer />
      </Container>
    </>
  )
}

export default Hoc

const Container = styled.div`
  height: 100vh;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`

const Footer = styled.div`
  width: 100%;
  padding-bottom: 72px;
`

const Header = styled.div`
  width: 100%;
  height: 80px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 24px;
`

const Logo = styled.img`
  width: 150px;
  object-fit: contain;
  cursor: pointer;
`

const TitleWrapper = styled.div`
  font-size: 18px;
`
