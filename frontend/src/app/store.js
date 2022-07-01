import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../content/home/homeSlice'

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

export default store
