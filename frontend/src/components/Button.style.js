import styled from 'styled-components'

const SnapButton = ({ variant = 'text', children }) => {
  switch (variant) {
    case 'solid':
      return <FilledButton>{children}</FilledButton>
    case 'outline':
      return <OutlinedButton>{children}</OutlinedButton>
    default:
      return <TextButton>{children}</TextButton>
  }
}

export default SnapButton

const Button = styled.a`
  display: block;
  padding: 1.2rem 1.6rem;
  text-decoration: none;
`
const TextButton = styled(Button)``

const OutlinedButton = styled(Button)`
  border: 0.1rem solid ${({ theme }) => theme.colors.almostBlack};
  border-radius: 1.2rem;
`

const FilledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.almostBlack};
  border-radius: 1.2rem;
  color: ${({ theme }) => theme.colors.almostWhite};
`
