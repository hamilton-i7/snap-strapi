import http from './http'

export const getFullImageUrl = url => http.defaults.baseURL + url
