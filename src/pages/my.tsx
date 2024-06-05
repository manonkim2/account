import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hooks/withAuth'
import Spacing from '@/components/shared/Spacing'
import { signOut } from 'next-auth/react'

const MyPage = () => {
  return (
    <>
      <Spacing size={100} />
      <Flex justify="center">
        <Button weak onClick={() => signOut({ callbackUrl: '/' })}>
          LOGOUT
        </Button>
      </Flex>
    </>
  )
}

export default withAuth(MyPage)
