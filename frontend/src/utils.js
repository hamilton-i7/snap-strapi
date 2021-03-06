import { useMediaQuery } from '@mui/material'
import http from './http'

export const getFullImageUrl = url =>
  process.env.NODE_ENV === 'development' ? http.defaults.baseURL + url : url

export const groupBy = (collection, key) =>
  collection.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

export const useSmallScreenMatcher = theme =>
  useMediaQuery(theme.breakpoints.up('sm'))

export const useTabletScreenMatcher = theme =>
  useMediaQuery(theme.breakpoints.up('tablet'))

export const useMediumScreenMatcher = theme =>
  useMediaQuery(theme.breakpoints.up('md'))

export const useLargeScreenMatcher = theme =>
  useMediaQuery(theme.breakpoints.up('lg'))
