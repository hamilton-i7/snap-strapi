import axios from 'axios'

export default axios.create({
  baseURL: 'https://snap-strapi.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
})
