import styled from '@emotion/styled'
import { Button } from '@mui/material'

const SnapButton = ({ variant = 'text', onClick, children, sx, ...props }) => {
  switch (variant) {
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

const SnapTextButton = styled(Button)(({ theme }) => ({
  borderRadius: '1.2rem',
  color: theme.palette.neutral.mediumGray,
  textAlign: 'center',
  textTransform: 'capitalize',
}))

const SnapOutlinedButton = styled(Button)(({ theme }) => ({
  border: `0.12rem solid ${theme.palette.neutral.almostBlack}`,
  borderRadius: '1.2rem',
  color: theme.palette.neutral.mediumGray,
  textAlign: 'center',
  textTransform: 'capitalize',
}))
