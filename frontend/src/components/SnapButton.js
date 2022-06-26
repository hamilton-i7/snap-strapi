import { Button } from '@mui/material'

const SnapButton = ({ variant = 'text', children, sx }) => {
  const muiButtonVariant =
    variant === 'solid'
      ? 'contained'
      : variant === 'outline'
      ? 'outlined'
      : 'text'

  return (
    <Button
      variant={muiButtonVariant}
      sx={{ textTransform: 'capitalize', ...sx }}>
      {children}
    </Button>
  )
}

export default SnapButton
