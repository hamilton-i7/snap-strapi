import styled from 'styled-components'
import Menu from './Menu'

const StyledMenu = styled(Menu)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.6rem;

  & > .logo,
  & .toggle-menu-icon {
    cursor: pointer;
  }

  & > .logo {
    max-width: 7rem;
    width: 20%;
  }

  & .toggle-menu-icon {
    max-width: 3rem;
    width: 9%;
  }

  & > .links {
    display: none;
  }
`

export default StyledMenu
