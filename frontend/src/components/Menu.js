import React from 'react'
import { getFullImageUrl } from '../utils'
import SnapButton from './Button.style'

const Menu = ({ className, isOpen, onToggleMenu, menu }) => {
  const logo = menu.logo.data.attributes
  const links = menu.links
  const mainLinks = links.filter(link => !link.isUserFlow && !link.relatedTo)
  const sublinks = links.filter(link => link.relatedTo !== null)
  const userLinks = links.filter(link => link.isUserFlow)
  const openMenuIcon = {
    url: getFullImageUrl(menu.menuIcon.data.attributes.url),
    alt: menu.menuIcon.data.attributes.alternativeText,
  }
  const closeMenuIcon = {
    url: getFullImageUrl(menu.closeMenuIcon.data.attributes.url),
    alt: menu.closeMenuIcon.data.attributes.alternativeText,
  }

  return (
    <nav className={className}>
      <div className='overlay'></div>
      <a href='/'>
        <figure className='logo'>
          <img src={getFullImageUrl(logo.url)} alt={logo.alternativeText} />
        </figure>
      </a>

      <button className='toggle-menu-icon' onClick={onToggleMenu}>
        <figure>
          <img
            src={isOpen ? closeMenuIcon.url : openMenuIcon.url}
            alt={isOpen ? closeMenuIcon.alt : openMenuIcon.alt}
          />
        </figure>
      </button>

      <div className='links'>
        <ul className='links__navigation'>
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
        <ul className='links__user'>
          {userLinks.map(link => (
            <li key={link.id}>
              <SnapButton variant={link.variant}>{link.label}</SnapButton>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Menu

const MenuItem = ({ variant, label, icon, iconDescription = '' }) => {
  return (
    <SnapButton variant={variant}>
      <p>{label}</p>
      {icon && <img src={getFullImageUrl(icon)} alt={iconDescription} />}
    </SnapButton>
  )
}

const MainLink = ({ link, position = 'start', sublinks }) => {
  const filteredSublinks = sublinks.filter(
    sublink => sublink.relatedTo === link.id,
  )

  return (
    <li>
      <MenuItem
        variant={link.variant}
        label={link.label}
        icon={link.icon.data?.attributes?.url}
        iconDescription={link.icon.data?.attributes?.alternativeText}
      />
      {Boolean(filteredSublinks.length) && (
        <ul className='sublinks'>
          {filteredSublinks.map(sublink => (
            <li key={sublink.id}>
              <MenuItem
                variant={sublink.variant}
                label={sublink.label}
                icon={sublink.icon.data?.attributes?.url}
                iconDescription={sublink.icon.data?.attributes?.alternativeText}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
