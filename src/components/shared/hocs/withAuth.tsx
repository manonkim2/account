import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, Suspense } from 'react'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const { data, status } = useSession()
    const router = useRouter()

    if (status !== 'loading' && data == null) {
      router.replace('/auth/signin')
      return null
    }

    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
