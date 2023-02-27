import { useAuthContext } from '@contexts'
import { Card, FormTwit } from '@elements'
import React, { useEffect, useState } from 'react'

export const HomeModule: React.FC = () => {
  const [twits, setTwits] = useState<any[]>([])
  const [twitsLogged, setTwitsLogged] = useState<any[]>([])

  const { httpFetch, user }: any = useAuthContext()

  useEffect(() => {
    getTwitDataNoUser()
    getTwitDataWithUser()
  }, [])

  async function getTwitDataWithUser() {
    const result = await httpFetch({
      method: 'GET',
      url: 'twit/logged-user-twit',
    })
    setTwitsLogged(result)
  }

  async function getTwitDataNoUser() {
    const result = await httpFetch({ method: 'GET', url: 'twit' })
    setTwits(result)
  }

  return (
    <section className="w-[90%] mx-auto">
      <div className={`${user ? '' : 'hidden'}`}>
        <FormTwit />
      </div>
      <div className="flex flex-col gap-[10px] sm:gap-[30px]">
        {twitsLogged
          ? twitsLogged
              ?.map((data) => (
                <div key={data.id}>
                  <Card
                    id={data.id}
                    userId={data.userId}
                    author={data.author}
                    authorPicture={data.authorPicture}
                    content={data.content}
                    isOwner={data.userId === user?.googleId}
                    isPublic={data.isPublic}
                    createdAt={data.createdAt}
                  />
                </div>
              ))
              .reverse()
          : twits
              ?.map((data) => (
                <div key={data.id}>
                  <Card
                    id={data.id}
                    userId={data.userId}
                    author={data.author}
                    authorPicture={data.authorPicture}
                    content={data.content}
                    isOwner={data.userId === user?.googleId}
                    isPublic={data.isPublic}
                    createdAt={data.createdAt}
                  />
                </div>
              ))
              .reverse()}
      </div>
    </section>
  )
}
