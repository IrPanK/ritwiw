import Link from 'next/link'
import React, { useState } from 'react'
import { layoutProps } from './interface'
import { useAuthContext } from '@contexts'
import Image from 'next/image'
import { ArrowIcon } from '@icons'
import { useRouter } from 'next/router'

export const Layout: React.FC<layoutProps> = ({ children }) => {
  const [isExpand, setIsExpand] = useState(false)

  const { login, logout, user }: any = useAuthContext()
  const route = useRouter()

  return (
    <div className="min-h-screen text-white mx-auto mb-[5rem] w-[90%] sm:w-[80%]">
      <nav className="flex justify-between items-center mx-auto pt-[48px] pb-[160px]">
        <Link href={'/'}>
          <h1 className="font-montserrat font-bold text-[4rem]">Ritwiw</h1>
        </Link>
        {/* TODO: udh login apa blom bedain */}
        <div
          onClick={() => setIsExpand((prev) => !prev)}
          className="cursor-pointer hidden sm:inline-block"
        >
          {user ? (
            <div className="relative flex gap-[10px] items-center">
              <Image
                src={user.photo}
                alt="user-photo"
                width={50}
                height={50}
                className="!rounded-full"
              />
              <div className={`${isExpand ? '' : 'rotate-180'} transition-all`}>
                <ArrowIcon size="20" />
              </div>
              <div
                className={`absolute right-0 bottom-[-200px] flex flex-col items-center gap-[24px] px-[43.5px] py-[29px] bg-[#5F39AE] rounded-[4px] ${
                  isExpand ? '' : 'hidden'
                } transition-all`}
              >
                <button
                  onClick={() => route.push('/dashboard')}
                  className="px-[20px] py-[4px] text-[24px] font-normal rounded-[4px] hover:bg-[#A87EFF] transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className="px-[20px] py-[4px] text-[24px] font-normal rounded-[4px] hover:bg-[#A87EFF] transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={login}
              className="font-montserrat font-bold text-[1.375rem] text-[#281D40] bg-[#A87EFF] px-[40px] py-[6px] rounded-[6px]"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <section>{children}</section>
    </div>
  )
}
