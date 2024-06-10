import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Link2Page = () => {
  const router = useRouter()

  //   router로 이동시 prefetch 원하는 경우
  useEffect(() => {
    router.prefetch('/link/1')
  }, [router])

  // handle 함수로 이동 시 div사용하면 역할이 명확하게 보이지않고 검색엔진 측면에서도 좋지않으므로
  // 페이지 이동만 할 경우는 Link사용
  // 페이지 이동과 다른 action이 추가로 있을경우 handle 함수로 움직임
  const moveToPage = () => {
    router.push('/link/2')
  }

  return (
    <>
      <Spacing size={2000} />
      <div onClick={moveToPage}>link이동</div>
    </>
  )
}

export default Link2Page
