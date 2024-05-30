import { colors } from '@/styles/colorPalette'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        onClick={onClick}
        size="medium"
        full
        css={buttonStyle}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
    to{
        transform:translateY(0)
    }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 10px 8px;
  background-color: ${colors.white};
  transform: translateY(100%);
  animation: ${slideup} 0.8s ease-in-out forwards;
`

const buttonStyle = css`
  border-raidus: 8px;
`

export default FixedBottomButton
