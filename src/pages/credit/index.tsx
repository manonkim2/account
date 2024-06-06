import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { dehydrate, QueryClient } from 'react-query'

import useCredit from '@/components/credit/hooks/useCredit'
import { IUser } from '@/models/user'
import { getCredit } from '@/remote/credit'
import useUser from '@/hooks/useUser'
import { useAlertContext } from '@/contexts/AlertContext'
import { useRouter } from 'next/router'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import ListRow from '@/components/shared/ListRow'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import { useCallback, useState } from 'react'

const CreditPage = () => {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useRouter()

  const { data } = useCredit()

  const handleCheck = useCallback(() => {
    if (!user) {
      open({
        title: '로그인이 필요한 기능입니다.',
        description:
          '정확한 신용정보를 확인하기위해서 로그인을 먼저 진행해주세요.',
        onButtonClick: () => {
          navigate.push('/auth/signin')
        },
      })
      return
    }
  }, [navigate, open, user])

  const renderExistCredit = () => (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={data?.creditScore || 0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow={true}
          onClick={() => {
            navigate.push('/card')
          }}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  )

  const renderAbsenceCredit = () => (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold={true} textAlign="center">
          내 신용점수를
          <br /> 조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )

  return (
    <>{data ? <> {renderExistCredit()}</> : <>{renderAbsenceCredit()}</>}</>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  console.log('🚀 ~ getServerSideProps ~ session:', session)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['credit', (session.user as IUser).id], () =>
      getCredit((session.user as IUser).id),
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

export default CreditPage
