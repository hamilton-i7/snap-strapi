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

const BasicButton = styled(Button)({
  borderRadius: '1.2rem',
  textAlign: 'center',
  '&:first-letter': {
    textTransform: 'lowercase',
  },
})

const SnapTextButton = styled(BasicButton)(({ theme }) => ({
  color: theme.palette.neutral.mediumGray,
}))

const SnapOutlinedButton = styled(BasicButton)(({ theme }) => ({
  border: `0.12rem solid ${theme.palette.neutral.almostBlack}`,
  color: theme.palette.neutral.mediumGray,
}))
