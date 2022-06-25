import styled from 'styled-components'
import Hero from './Hero'

const StyledHero = styled(Hero)`
  .content {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 1.6rem;
  }

  .heading {
    color: ${({ theme }) => theme.colors.almostBlack};
    font-size: 3.4rem;
    font-weight: 700;
    margin-top: 4.2rem;
    text-align: center;
  }

  .description {
    color: ${({ theme }) => theme.colors.mediumGray};
    line-height: 1.8;
    margin-top: 2rem;
    text-align: center;
  }

  .cta {
    margin-top: 2.4rem;
  }

  .clients {
    align-items: center;
    display: flex;
    gap: 1rem;
    margin: 4.2rem 0;
    width: 100%;

    & figure {
      flex: 1;
      margin: 0;
    }
  }
`

export default StyledHero