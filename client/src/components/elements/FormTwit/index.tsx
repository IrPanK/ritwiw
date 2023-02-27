import { useAuthContext } from '@contexts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export const FormTwit: React.FC = () => {
  const [isExpand, setIsExpand] = useState(false)
  const [twit, setTwit] = useState('')

  const { httpFetch }: any = useAuthContext()
  const route = useRouter()

  function handleExpand() {
    setIsExpand((prev) => !prev)
  }

  async function handleSubmitPublic(e: any) {
    e.preventDefault()
    await httpFetch({
      method: 'POST',
      url: 'twit',
      payload: { content: twit, isPublic: true },
    })
    route.reload()
  }

  async function handleSubmitCF(e: any) {
    e.preventDefault()
    await httpFetch({
      method: 'POST',
      url: 'twit',
      payload: { content: twit, isPublic: false },
    })
    route.reload()
  }

  function handleChange(e: any) {
    e.preventDefault()
    setTwit(e.target.value)
  }

  return (
    <div className="mb-[2.188rem] sm:mb-[3.75rem]">
      <div className="flex justify-end">
        <button
          onClick={handleExpand}
          className={`text-black text-[1.125rem] w-full py-[0.5rem] font-montserrat font-medium rounded-[4px] sm:w-fit sm:px-[2.5rem] ${
            isExpand ? 'bg-[#BF3F3F]' : 'bg-[#65DAFF]'
          } transition-all`}
        >
          {isExpand ? 'Cancel' : 'Add Twit'}
        </button>
      </div>
      <form className={`${isExpand ? 'block' : 'hidden'}`}>
        <textarea
          onChange={handleChange}
          className="w-full text-[1rem] bg-transparent mt-[0.938rem] my-[0.625rem] p-[0.875rem] border-[3px] border-[#A87EFF] rounded-[4px] focus:outline-none focus:outline-2 focus:outline-[#4F3585]"
          rows={5}
        ></textarea>
        <div className="flex gap-[20px] w-full sm:justify-end sm:gap-[16px]">
          <button
            onClick={handleSubmitCF}
            className="w-full py-[0.5rem] bg-[#6CD9A5] rounded-[4px] sm:w-fit sm:px-[2.5rem]"
          >
            Post to CF
          </button>
          <button
            onClick={handleSubmitPublic}
            className="w-full py-[0.5rem] bg-[#A87EFF] rounded-[4px] sm:w-fit sm:px-[2.5rem]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
