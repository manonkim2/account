import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import Button from './Button'
import Flex from './Flex'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const showSignButton = ['/auth/signin'].includes(router.pathname)

  const renderButton = useCallback(() => {
    if (session) {
      return (
        <Link href={'/my'}>
          <Image
            width={40}
            height={40}
            alt="user-image"
            src={session.user?.image ?? ''}
          />
        </Link>
      )
    }

    if (!showSignButton) {
      return (
        <Link href={'/auth/signin'}>
          <Button>로그인 / 회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSignButton])

  return (
    <Flex justify={'space-between'} align="center" css={navbarStyles}>
      <Link href={'/'}>My Account</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`

export default Navbar
