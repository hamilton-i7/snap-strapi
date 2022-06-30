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
      dispatch(fetchHomeContent())
    }
  }, [status, dispatch])

  return status === 'loading' ? (
    <div>Content loading</div>
  ) : status === 'error' ? (
    <div>Error found</div>
  ) : status === 'success' ? (
    <SnapMenu menu={menu}>
      <Box
        component='main'
        sx={{
          alignItems: { xs: 'start', md: 'center' },
          display: 'flex',
          // Get the max height but excluding the toolbar's height
          minHeight: 'calc(100vh - 64px)',
        }}>
        <Grid
          container
          sx={{
            my: '3.2rem',
            [theme.breakpoints.up('md')]: {
              alignItems: 'center',
              flexDirection: 'row-reverse',
              my: 0,
            },
          }}>
          <Grid
            item
            xs={12}
            md={5}
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
                maxWidth: { xs: '60rem' },
                width: '100%',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              mt: { xs: '4.2rem' },
              padding: {
                xs: '0 1.6rem',
                sm: '0 3.2rem',
              },
              [theme.breakpoints.up('md')]: {
                alignItems: 'start',
                alignSelf: 'stretch',
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
                padding: '0.8rem 1.6rem',
              }}>
              {cta.label}
            </SnapButton>
            <Stack
              sx={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                [theme.breakpoints.up('md')]: {
                  alignItems: 'end',
                  flex: 1,
                },
              }}>
              {clients.map(client => (
                <Box
                  key={client.id}
                  component='img'
                  src={getFullImageUrl(client.attributes.url)}
                  alt={client.attributes.alternativeText}
                  sx={{
                    width: { xs: '20%' },
                    '&:nth-of-type(2)': {
                      width: { xs: '14%' },
                    },
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </SnapMenu>
  ) : null
}

export default Home
