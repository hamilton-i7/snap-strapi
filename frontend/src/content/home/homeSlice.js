import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../http'

export const fetchHomeContent = createAsyncThunk(
  'home/fetchHomeContent',
  async () => {
    const { data } = await http.get('/api/home')
    return data
  },
)

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHomeContent.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchHomeContent.rejected, (state, _action) => {
        state.status = 'error'
      })
      .addCase(fetchHomeContent.fulfilled, (state, action) => {
        const {
          heading,
          description,
          cta,
          imageDesktop,
          imageMobile,
          clients,
          menu,
        } = action.payload.data.attributes
        state.data = {
          heading,
          description,
          menu,
          imageMobile: imageMobile.data.attributes,
          imageDesktop: imageDesktop.data.attributes,
          clients: clients.data,
          cta,
        }
        state.status = 'success'
      })
  },
})

export default homeSlice.reducer
