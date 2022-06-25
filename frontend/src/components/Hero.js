import React from 'react'
import { getFullImageUrl } from '../utils'
import { FilledButton } from './Button.style'

const Hero = ({ heroImage, heading, description, cta, clients }) => {
  return (
    <main>
      <figure className='heroImg'>
        <img
          src={getFullImageUrl(heroImage.url)}
          alt={heroImage.alternativeText}
        />
      </figure>
      <div className='content'>
        <h1 className='heading'>{heading}</h1>
        <p className='description'>{description}</p>
        <a href='/'>{cta}</a>
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
