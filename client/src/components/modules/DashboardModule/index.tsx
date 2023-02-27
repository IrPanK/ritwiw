import { useAuthContext } from '@contexts'
import { Card } from '@elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const DashboardModule: React.FC = () => {
  const [userData, setUserData] = useState<any>({})
  const [userTwits, setUserTwits] = useState<any[]>([])

  const { httpFetch, user }: any = useAuthContext()
  const route = useRouter()

  useEffect(() => {
    getUserData()
    getUserTwits()
  }, [])

  async function getUserData() {
    const result = await httpFetch({
      method: 'GET',
      url: 'user',
    })

    setUserData(result)
  }

  async function getUserTwits() {
    const result = await httpFetch({
      method: 'GET',
      url: 'twit/my-twit',
    })

    setUserTwits(result)
  }

  return (
    <div>
      <div>
        <button
          onClick={() => route.push('/setting')}
          className="w-full bg-[#A87EFF] py-[10px] rounded-[6px] mb-[5rem]"
        >
          Setting
        </button>
      </div>
      <div className="flex flex-col items-center gap-[20px] sm:flex-row sm:gap-[60px]">
        {user ? (
          <Image
            src={user?.photo}
            alt="user-photo"
            width={150}
            height={150}
            className="!rounded-full"
          />
        ) : (
          ''
        )}
        <div className="text-center sm:text-left">
          <h3 className="text-[1.5rem] tracking-wider font-semibold mb-[10px] sm:text-[2.375rem] sm:mb-[10px]">
            {userData?.username}
          </h3>
          <p className="text-[1rem]">{userData?.bio}</p>
        </div>
      </div>
      <div className="mt-[120px]">
        <h5 className="relative inline font-montserrat text-[2rem] font-semibold before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#65DAFF] before:absolute before:right-0 before:rounded-[6px] before:bottom-0">
          Your Post
        </h5>
        <div className="mt-[30px] flex flex-col gap-[10px] sm:gap-[30px]">
          {userTwits
            ?.map((data: any) => (
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
      </div>
    </div>
  )
}
