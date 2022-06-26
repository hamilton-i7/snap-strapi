import { Button } from '@mui/material'

const SnapButton = ({ variant = 'text', onClick, children, sx }) => {
  const muiButtonVariant =
    variant === 'solid'
      ? 'contained'
      : variant === 'outline'
      ? 'outlined'
      : 'text'

  return (
    <Button
      variant={muiButtonVariant}
      onClick={onClick}
      sx={{ textTransform: 'capitalize', ...sx }}>
      {children}
    </Button>
  )
}

export default SnapButton
