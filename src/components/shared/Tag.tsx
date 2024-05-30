import { Colors, colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface TagProps {
  color?: string
  backgroundColor?: string
}

const Tag = styled.span<TagProps>(
  ({ color = colors.white, backgroundColor = colors.blue }) => ({
    borderRadius: '6px',
    padding: '4px 6px',
    fontSize: '11px',
    color: color in colors ? colors[color as Colors] : color,
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)
export default Tag
