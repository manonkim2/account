import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'

const Link1Page = () => {
  return (
    <div>
      link1
      <Spacing size={2000} />
      {/* next/link > prefetch
경로 방문하기전에 미리 백그라운드에서 이동할 페이지에대한 정보를 로드 */}
      <Link href={'/link/2'}>Link 이동</Link>
    </div>
  )
}

export default Link1Page
