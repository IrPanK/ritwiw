import { useAuthContext } from '@contexts'
import { DeleteIcon, EditIcon } from '@icons'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { CardProps } from './interface'

export const Card: React.FC<CardProps> = ({
  id,
  userId,
  author,
  authorPicture,
  content,
  isOwner,
  isPublic,
  createdAt,
}) => {
  const { httpFetch }: any = useAuthContext()
  const route = useRouter()

  function handleEdit() {
    route.push(
      { pathname: '/edit', query: { id, author, authorPicture, content } },
      '/edit'
    )
  }

  async function handleDelete() {
    await httpFetch({
      method: 'DELETE',
      url: 'twit',
      payload: { id },
    })

    route.reload()
  }

  function handleToProfile() {
    route.push(`/profile/${userId}`)
  }

  return (
    <div className="w-full flex flex-col gap-[25px] p-[1.25rem] pb-[2.5rem] bg-[#5F39AE] rounded-[5px]">
      <div className="flex justify-between items-center">
        <div
          onClick={handleToProfile}
          className="flex gap-[10px] items-center cursor-pointer sm:gap-[20px]"
        >
          <Image
            src={authorPicture}
            alt="author-picture"
            width={40}
            height={40}
            className="!rounded-full"
          />
          <p className="text-[0.875rem] font-medium">{author}</p>
          {!isPublic ? (
            <div className="text-[0.5rem] text-[#5F39AE] font-semibold px-[0.5rem] py-[0.125rem] bg-[#6CD9A5] rounded-[12px]">
              <p className="sm:hidden">CF</p>
              <p className="hidden sm:block">close friend</p>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          {isOwner ? (
            <div className="flex gap-[10px]">
              <button onClick={handleEdit}>
                <EditIcon size="18" />
              </button>
              <button onClick={handleDelete}>
                <DeleteIcon size="18" />
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div>
        <p className="text-[1rem] font-medium">{content}</p>
        <p className="text-[0.75rem] text-[#D9D9D9] mt-[0.3rem]">{`${moment(
          createdAt
        ).date()}-${moment(createdAt).month()}-${moment(createdAt).year()}`}</p>
      </div>
    </div>
  )
}
