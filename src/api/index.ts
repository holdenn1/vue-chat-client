import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'
// import { refreshRequest } from '@/api/requests'
// import globalRouter from '@/router/globalRouter'

export const BASE_URL = 'http://localhost:8000/'

const instance = axios.create({
  baseURL: BASE_URL
} as CreateAxiosDefaults)

instance.interceptors.request.use(
  async (config) => {
    config.headers.socketId = (window as any)?.socket?.id
    const accessToken = localStorage.getItem('accessToken')
    if (config.headers.authorization) {
      return config
    }
    config.headers.authorization = `Bearer ${accessToken}`
    return config
  },
  (err) => {
    if (err.response.data.statusCode == 401) {
      globalRouter.router?.push({ name: 'sign-in' })
    }
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    try {
      const {
        response: {
          data: { statusCode }
        },
        config
      } = err

      switch (statusCode) {
        case 401: {
          const refreshToken = localStorage.getItem('refreshToken')

          if (!refreshToken) {
            globalRouter.router?.push({ name: 'sign-in' })
            return Promise.reject(err)
          }

          const { data } = await refreshRequest(refreshToken)
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)

          return instance.request({
            ...config,
            headers: { authorization: `Bearer ${data.accessToken}` }
          })
        }
        default: {
          return Promise.reject(err)
        }
      }
    } catch (e) {
      if (err.response.data.statusCode == 401) {
        globalRouter.router?.push({ name: 'sign-in' })
      }
      localStorage.clear()
      return Promise.reject(err)
    }
  }
)
export default instance
