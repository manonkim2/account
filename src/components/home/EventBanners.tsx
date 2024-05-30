import { Swiper, SwiperSlide } from 'swiper/react'
import { css } from '@emotion/react'

import Image from 'next/image'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

import useEventBanner from './hooks/useEventBanner'
import Link from 'next/link'
import withSuspense from '../shared/hocs/withSuspense'
import Skeleton from '../shared/Skeleton'

const EventBanners = () => {
  const { data } = useEventBanner()

  return (
    <div>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  justify="space-between"
                  style={{ backgroundColor: banner.backgroundColor }}
                  css={bannerStyle}
                >
                  {/* left */}
                  <Flex direction="column">
                    <Text bold>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  {/* right */}
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const bannerStyle = css`
  padding: 24px;
  border-radius: 8px;
`

export default withSuspense(EventBanners, {
  fallback: <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />,
})
