import React, { useEffect, useState } from 'react'
import http from '../http'
import StyledMenu from '../components/Menu.style'
import StyledHero from '../components/Hero.style'

const Home = () => {
  const [menu, setMenu] = useState({})
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [cta, setCta] = useState('')

  const [loading, setLoading] = useState(true)

  // Images
  const [heroImageMobile, setHeroImageMobile] = useState('')
  const [heroImageDesktop, setHeroImageDesktop] = useState('')
  const [clients, setClients] = useState([])

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
        <StyledMenu logo={menu.logo.data.attributes} links={menu.links} />
        <StyledHero
          heroImage={heroImageMobile}
          heading={heading}
          description={description}
          cta={cta}
          clients={clients}
        />
      </>
    )
  )
}

export default Home
