import { MouseEvent, useState } from 'react'

import { ITerm } from '@/models/account'
import { 약관목록 } from '@/constants/account'
import Agreement from '../shared/Agreement'
import dynamic from 'next/dynamic'

// ssr단계에서는 window document 에 접근할 수 없기 때문에 에러발생 > dynamic import로 해결
const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

const Terms = ({ onNext }: { onNext: (termIds: string[]) => void }) => {
  const [termsAgreements, settermsAgreements] = useState(() =>
    generateInitialValues(약관목록),
  )

  const 모든약관동의 = termsAgreements.every((term) => term.checked)
  const 모든필수약관동의 = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  const handleAgreement = (id: string, checked: boolean) => {
    settermsAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    settermsAgreements((prevTerm) => {
      return prevTerm.map((term) => ({ ...term, checked }))
    })
  }

  return (
    <>
      <Agreement>
        <Agreement.Title checked={모든약관동의} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!모든필수약관동의}
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
      />
    </>
  )
}

const generateInitialValues = (terms: ITerm[]) => {
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
