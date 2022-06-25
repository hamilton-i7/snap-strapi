import React from 'react'
import { getFullImageUrl } from '../utils'

const Menu = ({ className, logo, openIcon, closeIcon, links }) => {
  const mainLinks = links.filter(link => !link.isUserFlow && !link.relatedTo)
  const sublinks = links.filter(link => link.relatedTo !== null)
  const userLinks = links.filter(link => link.isUserFlow)

  return (
    <nav className={className}>
      <figure className='logo'>
        <img src={getFullImageUrl(logo.url)} alt={logo.alternativeText} />
      </figure>

      <figure className='toggle-menu-icon'>
        <img src={getFullImageUrl(openIcon.url)} alt='Open menu' />
      </figure>

      <div className='links'>
        <ul>
          {mainLinks.map(link => (
            <MainLink
              key={link.id}
              label={link.label}
              icon={link.icon.data?.attributes?.url}
              link={link}
              sublinks={sublinks}
            />
          ))}
        </ul>
        <ul>
          {userLinks.map(link => (
            <li key={link.id}>{link.label}</li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Menu

const MenuItem = ({ label, icon, iconDescription = '' }) => {
  return (
    <div>
      <p>{label}</p>
      {icon ?? <img src={icon} alt={iconDescription} />}
    </div>
  )
}

const MainLink = ({ link, position = 'start', sublinks }) => {
  const filteredSublinks = sublinks.filter(
    sublink => sublink.relatedTo === link.id,
  )

  return (
    <li>
      <MenuItem label={link.label} icon={link.icon.data?.attributes?.src} />
      {Boolean(filteredSublinks.length) && (
        <ul className='sublinks'>
          {filteredSublinks.map(sublink => (
            <li key={sublink.id}>
              <MenuItem
                label={sublink.label}
                icon={sublink.icon.data?.attributes?.src}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
