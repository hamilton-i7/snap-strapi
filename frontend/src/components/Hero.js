import React from 'react'
import { getFullImageUrl } from '../utils'
import SnapButton from './Button.style'

const Hero = ({ className, heroImage, heading, description, cta, clients }) => {
  return (
    <main className={className}>
      <figure className='heroImg'>
        <img
          src={getFullImageUrl(heroImage.url)}
          alt={heroImage.alternativeText}
        />
      </figure>
      <div className='content'>
        <h1 className='heading'>{heading}</h1>
        <p className='description'>{description}</p>
        <SnapButton href='/' className='cta' variant='solid'>
          {cta}
        </SnapButton>
        <div className='clients'>
          {clients.map(client => (
            <figure key={client.id}>
              <img
                src={getFullImageUrl(client.attributes.url)}
                alt={client.attributes.alternativeText}
              />
            </figure>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Hero
