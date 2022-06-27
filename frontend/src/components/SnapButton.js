import styled from '@emotion/styled'
import { Button } from '@mui/material'

const SnapButton = ({ variant = 'text', onClick, children, sx, ...props }) => {
  switch (variant) {
    case 'solid':
      return (
        <SnapContainedButton onClick={onClick} sx={sx} {...props}>
          {children}
        </SnapContainedButton>
      )
    case 'outline':
      return (
        <SnapOutlinedButton onClick={onClick} sx={sx} {...props}>
          {children}
        </SnapOutlinedButton>
      )
    default:
      return (
        <SnapTextButton onClick={onClick} sx={sx} {...props}>
          {children}
        </SnapTextButton>
      )
  }
}

export default SnapButton

const BasicButton = styled(Button)({
  borderRadius: '1.2rem',
  display: 'block',
  padding: '0.8rem 1.6rem',
  textAlign: 'center',
  textTransform: 'lowercase',
  '&:first-letter': {
    textTransform: 'uppercase',
  },
})

const SnapTextButton = styled(BasicButton)(({ theme }) => ({
  color: theme.palette.neutral.mediumGray,
}))

const SnapOutlinedButton = styled(BasicButton)(({ theme }) => ({
  border: `0.12rem solid ${theme.palette.neutral.almostBlack}`,
  color: theme.palette.neutral.mediumGray,
}))

const SnapContainedButton = styled(BasicButton)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.almostBlack,
  color: theme.palette.neutral.almostWhite,
}))
