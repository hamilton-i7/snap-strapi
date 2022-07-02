import axios from 'axios'

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'https://snap-strapi.herokuapp.com'
      : 'http://localhost:1337',
  headers: {
    'Content-type': 'application/json',
  },
})
