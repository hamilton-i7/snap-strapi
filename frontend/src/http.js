import axios from 'axios'

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1337'
      : 'https://snap-strapi.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
})
