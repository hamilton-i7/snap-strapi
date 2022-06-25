import styled from 'styled-components'
import Menu from './Menu'

const StyledMenu = styled(Menu)`
  & > .links {
    display: none;
  }
`

export default StyledMenu
