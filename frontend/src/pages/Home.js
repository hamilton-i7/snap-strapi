import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHomeContent } from '../content/home/homeSlice'
import SnapMenu from '../components/Menu'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { getFullImageUrl, useMediumScreenMatcher } from '../utils'
import { useTheme } from '@mui/material/styles'
import SnapButton from '../components/SnapButton'

const Home = () => {
  const content = useSelector(state => state.home.data)
  const status = useSelector(state => state.home.status)
  const dispatch = useDispatch()

  const theme = useTheme()
  const matcheLargeScreen = useMediumScreenMatcher(theme)

  const {
    menu,
    heading,
    description,
    cta,
    clients,
    imageMobile,
    imageDesktop,
  } = content

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHomeContent({}))
    }
  }, [status, dispatch])

  return status === 'loading' ? (
    <div>Content loading</div>
  ) : status === 'error' ? (
    <div>Error found</div>
  ) : status === 'success' ? (
    <SnapMenu menu={menu}>
      <Grid
        container
        component='main'
        sx={{
          my: '3.2rem',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row-reverse',
          },
        }}>
        <Grid
          item
          xs={12}
          md={5}
          lg={6}
          desktop={7}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box
            component='img'
            src={
              matcheLargeScreen
                ? getFullImageUrl(imageDesktop.url)
                : getFullImageUrl(imageMobile.url)
            }
            alt={
              matcheLargeScreen
                ? imageDesktop.alternativeText
                : imageMobile.alternativeText
            }
            sx={{
              maxWidth: { xs: '60rem', md: '48rem' },
              width: '100%',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={6}
          desktop={5}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            mt: { xs: '4.8rem', lg: '13rem' },
            padding: {
              xs: '0 1.6rem',
              sm: '0 3.2rem',
            },
            [theme.breakpoints.up('md')]: {
              alignItems: 'start',
              gap: '4rem',
              padding: '0 2rem 0 10%',
            },
          }}>
          <Typography variant='h1'>{heading}</Typography>
          <Typography
            variant='body1'
            sx={{
              color: theme => theme.palette.neutral.mediumGray,
              lineHeight: 1.6,
              textAlign: { xs: 'center', md: 'start' },
            }}>
            {description}
          </Typography>
          <SnapButton
            variant={cta.variant}
            href='#'
            component='a'
            sx={{
              fontSize: '1.4rem',
            }}>
            {cta.label}
          </SnapButton>
          <Stack
            sx={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: { xs: '2.4rem', md: 'auto' },
              width: '100%',
            }}>
            {clients.map(client => (
              <Box
                key={client.id}
                component='img'
                src={getFullImageUrl(client.attributes.url)}
                alt={client.attributes.alternativeText}
                sx={{
                  width: '20%',
                  '&:nth-of-type(2)': {
                    width: '14%',
                  },
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </SnapMenu>
  ) : null
}

export default Home
