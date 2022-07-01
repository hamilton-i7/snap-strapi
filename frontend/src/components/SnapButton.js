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
  padding: '0.4rem 1.6rem',
  textAlign: 'center',
  textTransform: 'none',
})

const SnapTextButton = styled(BasicButton)(({ theme, sx }) => ({
  color: theme.palette.neutral.mediumGray,
  '&:hover': {
    backgroundColor: 'none',
    color: theme.palette.neutral.almostBlack,
  },
  ...sx,
}))

const SnapOutlinedButton = styled(BasicButton)(({ theme, sx }) => ({
  border: `0.15rem solid ${theme.palette.neutral.mediumGray}`,
  color: theme.palette.neutral.mediumGray,
  '&:hover': {
    backgroundColor: 'none',
    borderColor: theme.palette.neutral.almostBlack,
    color: theme.palette.neutral.almostBlack,
  },
  ...sx,
}))

const SnapContainedButton = styled(BasicButton)(({ theme, sx }) => ({
  backgroundColor: theme.palette.neutral.almostBlack,
  border: `0.15rem solid ${theme.palette.neutral.almostBlack}`,
  color: theme.palette.neutral.almostWhite,
  fontWeight: theme.typography.fontWeightBold,
  padding: '0.8em 2.4em',
  '&:hover': {
    backgroundColor: 'none',
    border: `0.15rem solid ${theme.palette.neutral.mediumGray}`,
    color: theme.palette.neutral.almostBlack,
  },
  ...sx,
}))
