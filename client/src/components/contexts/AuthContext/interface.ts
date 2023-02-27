import { ReactNode } from 'react'

export interface props {}

export interface AuthProviderInterface {
  children: ReactNode
}

export interface HttpFetchProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  payload?: any
}
