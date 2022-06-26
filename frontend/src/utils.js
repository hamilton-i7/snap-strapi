import http from './http'

export const getFullImageUrl = url => http.defaults.baseURL + url

export const groupBy = (collection, key) =>
  collection.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
