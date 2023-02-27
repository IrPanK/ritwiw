import { useAuthContext } from '@contexts'
import { Card } from '@elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const ProfileModule: React.FC = () => {
  const [seeUser, setSeeUser] = useState<any>({})
  const [seeUserData, setSeeUserData] = useState<any>([])

  const { httpFetch }: any = useAuthContext()
  const route = useRouter()

  const { id } = route.query

  useEffect(() => {
    if (!id) {
      route.push('/')
    }
    getSomeUser()
    getSomeUserData()
  }, [])

  async function getSomeUser() {
    const result = await httpFetch({
      method: 'GET',
      url: `user/${id}`,
    })
    setSeeUser(result)
  }

  async function getSomeUserData() {
    const result = await httpFetch({
      method: 'GET',
      url: `twit/someone/${id}`,
    })
    setSeeUserData(result)
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-[20px] sm:flex-row sm:gap-[60px]">
        {seeUser?.photo ? (
          <Image
            src={seeUser ? seeUser?.photo : ''}
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
            {seeUser?.username}
          </h3>
          <p className="text-[1rem]">{seeUser?.bio}</p>
        </div>
      </div>
      <div className="mt-[120px]">
        <h5 className="relative inline font-montserrat text-[2rem] font-semibold before:content-[''] before:w-[50%] before:h-[2px] before:bg-[#65DAFF] before:absolute before:right-0 before:rounded-[6px] before:bottom-0">
          Post
        </h5>
        <div className="mt-[30px] flex flex-col gap-[10px] sm:gap-[30px]">
          {seeUserData
            ?.map((data: any) => (
              <div key={data.id}>
                <Card
                  id={data.id}
                  userId={data.userId}
                  author={data.author}
                  authorPicture={data.authorPicture}
                  content={data.content}
                  isOwner={false}
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
