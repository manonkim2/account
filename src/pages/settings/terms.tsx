import useUser from '@/hooks/useUser'
import { getTerms, updateTerms } from '@/remote/account'
import { 약관목록 } from '@/constants/account'
import { cache, useMemo } from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'
import Top from '@/components/shared/Top'
import Text from '@/components/shared/Text'
import ListRow from '@/components/shared/ListRow'
import Button from '@/components/shared/Button'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { IUser } from '@/models/user'

const TermsPage = () => {
  const user = useUser()
  const client = useQueryClient()

  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    { enabled: user != null },
  )

  const { mutate, isLoading } = useMutation(
    (termsIds: string[]) => updateTerms(user?.id as string, termsIds),
    {
      onSuccess: () => {
        // 성공했을때 cache data 갱신
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {},
    },
  )

  const agreedTerms = useMemo(() => {
    if (!data) {
      return null
    }

    const allTerms = 약관목록.filter(({ id }) => data.termIds.includes(id))

    const mandatoryTerms = allTerms.filter(
      ({ mandatory }) => mandatory === true,
    )

    const selectiveTerms = allTerms.filter(
      ({ mandatory }) => mandatory === false,
    )

    return { mandatoryTerms, selectiveTerms }
  }, [data])

  const handleDisagree = (selectedTermId: string) => {
    const updatedTermsIds = data?.termIds.filter(
      (termId) => selectedTermId !== termId,
    )

    if (updateTerms != null) {
      mutate(updatedTermsIds || [])
    }
  }

  return (
    <>
      <Top title="약관" subTitle="약관 리스트 및 철회" />

      {!agreedTerms ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {agreedTerms.mandatoryTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {agreedTerms.selectiveTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={
                <Button
                  onClick={() => handleDisagree(term.id)}
                  disabled={isLoading}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session && session.user) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as IUser).id], () =>
      getTerms((session.user as IUser).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default TermsPage
