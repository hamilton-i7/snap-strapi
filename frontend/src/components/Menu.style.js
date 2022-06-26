import styled from 'styled-components'
import Menu from './Menu'

const StyledMenu = styled(Menu)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.6rem;

  & > .overlay {
    background: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

  & > .logo {
    max-width: 7rem;
    width: 20%;
  }

  & .toggle-menu-icon {
    background: none;
    border: none;
    cursor: pointer;
    max-width: 4rem;
    outline: none;
    z-index: 2;
  }

  & > .links {
    background: ${({ theme }) => theme.colors.almostWhite};
    color: ${({ theme }) => theme.colors.mediumGray};
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    height: 100%;
    padding: 6rem 2.4rem;
    position: fixed;
    right: 0;
    top: 0;
    width: 70%;

    & * {
      font-size: 1.4rem;
    }

    & .links__navigation {
      margin-bottom: 3.2rem;

      & > li > a {
        align-items: center;
        display: flex;
        gap: 1.6rem;
      }
    }

    & .links__user {
      text-align: center;

      & > li:first-child {
        margin-bottom: 1.6rem;
      }
    }

    & .sublinks {
      display: none;
    }
  }
`

export default StyledMenu
