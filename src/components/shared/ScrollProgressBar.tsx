import { Colors, colors } from '@/styles/colorPalette'
import { SerializedStyles } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

const ScrollProgressBar = ({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) => {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const element = document.documentElement
      const scrollTop = element.scrollTop

      const height = element.scrollHeight - element.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }

    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
      }}
    ></div>
  )
}

export default ScrollProgressBar
