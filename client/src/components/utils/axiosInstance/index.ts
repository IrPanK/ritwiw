import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api`,
  withCredentials: true,
})
