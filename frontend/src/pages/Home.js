import React, { useEffect, useState } from 'react'
import http from '../http'
import Menu from '../components/Menu'

const Home = () => {
  const [menu, setMenu] = useState({})
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [cta, setCta] = useState('')

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
        <Menu isOpen={isMenuOpen} onToggleMenu={toggleMenu} menu={menu} />
      </>
    )
  )
}

export default Home
