import styled from 'styled-components'

const Button = styled.a`
  padding: 1.2rem 1.6rem;
  text-decoration: none;
`
export const TextButton = styled(Button)``

export const OutlinedButton = styled(Button)``

export const FilledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.almostBlack};
  border-radius: 1.2rem;
  color: ${({ theme }) => theme.colors.almostWhite};
`
