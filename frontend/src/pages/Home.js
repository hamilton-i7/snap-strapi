import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHomeContent } from '../content/home/homeSlice'
import SnapMenu from '../components/Menu'
import { Box, Stack, Typography } from '@mui/material'
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
      <Stack component='main' mb='3.2rem'>
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
            width: '100%',
          }}
        />
        <Stack
          sx={{
            alignItems: 'center',
            gap: '2rem',
            mt: { xs: '4.2rem' },
            padding: {
              xs: '0 1.6rem',
              sm: '0 3.2rem',
            },
          }}>
          <Typography variant='h1'>{heading}</Typography>
          <Typography
            variant='body1'
            textAlign='center'
            sx={{
              color: theme => theme.palette.neutral.mediumGray,
              lineHeight: 1.6,
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
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
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
        </Stack>
      </Stack>
    </SnapMenu>
  ) : null
}

export default Home
