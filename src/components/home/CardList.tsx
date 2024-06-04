import { useRouter } from 'next/router'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import withSuspense from '../shared/hooks/withSuspense'
import ListRow from '../shared/ListRow'
import Skeleton from '../shared/Skeleton'
import Text from '../shared/Text'
import useCards from './hooks/useCards'

const CardList = () => {
  const { data } = useCards()

  const navigate = useRouter()

  const handleMoveCardPage = () => {
    navigate.push('/card')
  }

  const handleMoveCardDetailPage = (id: string) => {
    navigate.push(`/card/${id}`)
  }

  const isShowMoreButton = data?.items.length ?? 0 > 5

  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold
        typography="t6"
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      <ul>
        {data?.items
          .slice(0, 5)
          .map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={card.payback && <Badge label={card.payback} />}
              withArrow
              onClick={() => handleMoveCardDetailPage(card.id)}
            />
          ))}
      </ul>

      {isShowMoreButton && (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button full weak size="medium" onClick={handleMoveCardPage}>
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
