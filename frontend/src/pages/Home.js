import React, { useEffect, useState } from 'react'
import http from '../http'
import Menu from '../components/Menu'
import { Box, Stack, Typography } from '@mui/material'
import { getFullImageUrl } from '../utils'
import SnapButton from '../components/SnapButton'

const Home = () => {
  const [menu, setMenu] = useState({})
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [cta, setCta] = useState({})

  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setMenuOpen] = useState(false)

  // Images
  const [heroImageMobile, setHeroImageMobile] = useState({})
  const [heroImageDesktop, setHeroImageDesktop] = useState({})
  const [clients, setClients] = useState([])

  const toggleMenu = () => {
    setMenuOpen(value => !value)
  }

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const {
          data: {
            data: { attributes },
          },
        } = await http.get('/api/home')

        setMenu(attributes.menu)
        setHeading(attributes.heading)
        setDescription(attributes.description)
        setCta(attributes.cta)
        setClients(attributes.clients.data)

        // Images
        setHeroImageMobile(attributes.imageMobile.data.attributes)
        setHeroImageDesktop(attributes.imageDesktop.data.attributes)

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchContent()
  }, [])

  return (
    !loading && (
      <>
        <Menu isOpen={isMenuOpen} onToggleMenu={toggleMenu} menu={menu}>
          <Stack component='main'>
            <Box
              component='img'
              src={getFullImageUrl(heroImageMobile.url)}
              alt={heroImageMobile.alternativeText}
              sx={{
                width: '100%',
              }}
            />
            <Stack>
              <Typography variant='h1'>{heading}</Typography>
              <Typography variant='body1'>{description}</Typography>
              <SnapButton variant={cta.variant} href='#'>
                {cta.label}
              </SnapButton>
              <Stack direction='row'>
                {clients.map(client => (
                  <Box
                    key={client.id}
                    component='img'
                    src={getFullImageUrl(client.attributes.url)}
                    alt={client.attributes.alternativeText}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Menu>
      </>
    )
  )
}

export default Home
