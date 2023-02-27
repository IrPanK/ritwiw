import { useAuthContext } from '@contexts'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const EditModule: React.FC = () => {
  const [twit, setTwit] = useState('')

  const { httpFetch }: any = useAuthContext()
  const route = useRouter()

  const { id, author, authorPicture, content }: any = route.query

  useEffect(() => {
    if (!id && !author && !authorPicture && !content) {
      route.push('/')
    }
  }, [])

  async function handleEdit() {
    await httpFetch({
      method: 'PATCH',
      url: 'twit',
      payload: { id, content: twit ? twit : content },
    })

    route.push('/')
  }

  function handleChange(e: any) {
    e.preventDefault()
    setTwit(e.target.value)
  }

  return (
    <div className="w-full flex flex-col gap-[25px] p-[1.25rem] pb-[2.5rem] bg-[#5F39AE] rounded-[5px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[14px] items-center">
          <Image
            src={authorPicture}
            alt="author-picture"
            width={40}
            height={40}
            className="!rounded-full"
          />
          <p className="text-[0.875rem] font-medium">{author}</p>
        </div>
      </div>
      <div>
        <textarea
          onChange={handleChange}
          className="w-full text-[1rem] bg-transparent mt-[0.938rem] my-[0.625rem] p-[0.875rem] border-[3px] border-[#A87EFF] rounded-[4px] focus:outline-none focus:outline-2 focus:outline-[#4F3585]"
          rows={5}
          defaultValue={content}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleEdit}
            className="text-black font-medium px-[40px] py-[8px] bg-[#65DAFF] rounded-[4px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
