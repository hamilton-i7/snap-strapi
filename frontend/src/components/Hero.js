import React from 'react'
import { getFullImageUrl } from '../utils'
import { FilledButton } from './Button.style'

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
        <FilledButton href='/' className='cta'>
          {cta}
        </FilledButton>
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
