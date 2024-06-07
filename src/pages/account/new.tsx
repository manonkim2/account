import Form from '@/components/account/Form'
import Terms from '@/components/account/Terms'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import FullPageLoader from '@/components/shared/FullPageLoader'
import withAuth from '@/components/shared/hooks/withAuth'
import ProgressBar from '@/components/shared/ProgressBar'
import useUser from '@/hooks/useUser'
import { IAccount } from '@/models/account'
import { IUser } from '@/models/user'
import { createAccount, getAccount, getTerms, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

// STEP 0 = 약관동의
// STEP 1 = 계좌 개설 폼 페이지
// STEP 2 = 완료페이지
const LAST_STEP = 2

const AccountNewPage = ({ initialStep }: { initialStep: number }) => {
  const [step, setstep] = useState(initialStep)
  const user = useUser()
  const navigate = useRouter()

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />

      {step === 0 && (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds })
            setstep(step + 1)
          }}
        />
      )}

      {step === 1 && (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as IAccount | any

            await createAccount(newAccount)
            setstep(step + 1)
          }}
        />
      )}

      {step === 2 && (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었습니다." />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              navigate.push('/')
            }}
          />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as IUser).id)

  if (!agreedTerms) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getAccount((session?.user as IUser).id)

  if (!account) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initailStep: 2,
    },
  }
}

export default withAuth(AccountNewPage)
