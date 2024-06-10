import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hooks/withAuth'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const MyPage = () => {
  const navigate = useRouter()

  return (
    <>
      <Spacing size={100} />
      <Flex justify="center">
        <Button weak onClick={() => signOut({ callbackUrl: '/' })}>
          LOGOUT
        </Button>
      </Flex>

      <Spacing size={8} backgroundColor="gray100" />
      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subTitle="약관목록 및 철회" />}
          withArrow
          onClick={() => {
            navigate.push('/settings/terms')
          }}
        />
      </ul>
    </>
  )
}

export default withAuth(MyPage)
