import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import decode from 'jwt-decode'
import { AuthProviderInterface, HttpFetchProps, props } from './interface'
import { AxiosInstance } from '@utils'
import { useRouter } from 'next/router'

const AuthContext = createContext({} as props) // TODO: Declare interface of contextValue

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthProviderInterface> = ({
  children,
}) => {
  // init firebase
  const provider = new GoogleAuthProvider()
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const route = useRouter()

  const [user, setUser] = useState(null)
  const [isLoading, setIsloading] = useState<boolean>(false)

  async function login() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { profile }: any = getAdditionalUserInfo(result)
        const { email, name, id, picture } = profile
        const data = await httpFetch({
          method: 'POST',
          url: '/auth/login',
          payload: {
            email,
            googleId: id,
            googleName: name,
            googlePicture: picture,
          },
        })
        const decodedData: any = decode(data)
        setUser(decodedData)
        localStorage.setItem('token', data)
        route.reload()
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage, 'errorMessage')
      })
  }

  async function logout() {
    localStorage.removeItem('token')
    setUser(null)
    route.push('/')
    route.reload()
  }

  async function httpFetch({ method, url, payload = {} }: HttpFetchProps) {
    setIsloading(true)

    try {
      const token = localStorage.getItem('token')

      const { data } = await AxiosInstance({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        url,
        data: method === 'GET' ? undefined : payload,
      })

      setIsloading(false)

      return data.content
    } catch (err: any) {
      console.log(err, 'context')
      setIsloading(false)
      setUser(null)
      route.push('/')
    }
  }

  async function getUser() {
    const result = await httpFetch({
      method: 'GET',
      url: '/user',
    })

    setUser(result)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) getUser()
  }, [user])

  const contextValue = { login, logout, httpFetch, user, isLoading }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
