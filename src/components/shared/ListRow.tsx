import { css, SerializedStyles } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'
import Skeleton from './Skeleton'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}

const ListRow = ({
  left,
  right,
  contents,
  withArrow,
  onClick,
  as = 'li',
  style,
}: ListRowProps) => {
  return (
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}
      <Flex css={listRowContentStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentStyles = css`
  flex: 1;
`

const ListRowTexts = ({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) => {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const ListRowSkeleton = () => {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentStyles}>
        <ListRow.Texts
          title={<Skeleton width={67} height={23} />}
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

const IconArrowRight = () => {
  return (
    <svg
      height={20}
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width={20}
      //   xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      //   xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton

export default ListRow
