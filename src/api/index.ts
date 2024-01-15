import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import { refreshRequest } from '@/api/requests'
import globalRouter from '@/router/globalRouter'
import { deleteCookie } from '@/utils/deleteCookie'

// export const BASE_URL = 'https://vue-chat-server-production.up.railway.app/'
export const BASE_URL = 'http://localhost:8000/'

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
} as CreateAxiosDefaults)

instance.interceptors.request.use(
  async (config) => {
    config.headers.socketId = (window as any)?.socket?.id
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
          await refreshRequest()

          return instance.request({
            ...config
          })
        }
        default: {
          globalRouter.router?.push({ name: 'sign-in' })
          return Promise.reject(err)
        }
      }
    } catch (e) {
      if (err.response.data.statusCode == 401) {
        globalRouter.router?.push({ name: 'sign-in' })
      }
      deleteCookie('refresh_token')
      deleteCookie('access_token')
      return Promise.reject(err)
    }
  }
)
export default instance
