import { useAuthContext } from '@contexts'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const SettingModule: React.FC = () => {
  const [isEditProfile, setIsEditProfile] = useState(true)
  const [userData, setUserData] = useState<any>({
    username: '',
    bio: '',
    photo: '',
    closefriends: [],
  })
  const [searchState, setSearchState] = useState('')
  const [searching, setSearching] = useState('')
  const [allUser, setAllUser] = useState([])
  const [userCloseFriends, setUserCloseFriends] = useState<any>({})

  const { httpFetch, user }: any = useAuthContext()
  const route = useRouter()

  useEffect(() => {
    getUser()
    getAllUser()
  }, [])

  async function getUser() {
    const result = await httpFetch({ method: 'GET', url: 'user' })
    setUserData({
      username: result.username,
      bio: result.bio,
      photo: result.photo,
      closefriends: result.closefriends,
    })

    result.closefriends.map((data: any) =>
      setUserCloseFriends((prev: any) => ({
        ...prev,
        [data]: true,
      }))
    )
  }

  async function getAllUser() {
    const result = await httpFetch({ method: 'GET', url: 'user/all-user' })
    setAllUser(result)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (userData.photo) {
      await httpFetch({
        method: 'PATCH',
        url: 'user',
        payload: {
          username: userData.username,
          bio: userData.bio,
          photo: userData.photo,
        },
      })
    } else {
      await httpFetch({
        method: 'PATCH',
        url: 'user',
        payload: {
          username: userData.username,
          bio: userData.bio,
        },
      })
    }

    route.push('/dashboard')
  }

  function handleChange(e: any) {
    e.preventDefault()
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  function handleSearch(e: any) {
    e.preventDefault()
    setSearching(searchState)
  }

  function handleChangeSearchBar(e: any) {
    e.preventDefault()
    setSearchState(e.target.value)
  }

  async function handleSubmitCloseFriend() {
    const closeFriendKeys = Object.keys(userCloseFriends)

    const newCloseFriendArr: string[] = []

    for (let i = 0; i < closeFriendKeys.length; i++) {
      if (userCloseFriends[closeFriendKeys[i]]) {
        newCloseFriendArr.push(closeFriendKeys[i])
      }
    }

    newCloseFriendArr.push(user.googleId)

    await httpFetch({
      method: 'PATCH',
      url: 'user',
      payload: { closefriends: newCloseFriendArr },
    })

    route.push('/dashboard')
  }

  function handleChangeCheckBox(googleId: any) {
    setUserCloseFriends({
      ...userCloseFriends,
      [googleId]: !userCloseFriends[googleId],
    })
  }

  async function handlePhoto(e: any) {
    e.preventDefault()

    const file = e.target.files[0]
    const base64 = await convertToBase64(file)

    setUserData({ ...userData, photo: base64 })
  }

  function convertToBase64(file: any) {
    return new Promise((resolve, result) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col w-full gap-[10px] sm:gap-[40px] sm:flex-row">
        <button
          onClick={() => setIsEditProfile(true)}
          className={`w-full py-[18px] rounded-[6px] text-[1.2rem] font-medium ${
            isEditProfile ? 'bg-[#5F39AE]' : 'bg-[#A87EFF]'
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setIsEditProfile(false)}
          className={`w-full py-[18px] rounded-[6px] text-[1.2rem] font-medium ${
            isEditProfile ? 'bg-[#A87EFF]' : 'bg-[#5F39AE]'
          }`}
        >
          Edit Close Friend
        </button>
      </div>
      <div className={`${isEditProfile ? '' : 'hidden'}`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="photo" className="text-[1.5rem]">
              Photo
            </label>
            <div className="relative w-[100px] h-[100px]">
              <Image
                src={userData.photo ? userData.photo : user?.photo}
                alt="user-photo"
                fill
                sizes="none"
                className="relative w-full mx-auto"
              />
            </div>
            <input type={'file'} id="photo" onChange={handlePhoto} />
            <label htmlFor="username" className="text-[1.5rem] mt-[1rem]">
              Username
            </label>
            <input
              id="username"
              name="username"
              onChange={handleChange}
              value={userData.username}
              className="bg-transparent border-2 border-[#A87EFF] rounded-[4px] text-[1.2rem] p-[10px] focus:outline-none focus:outline-2 focus:outline-[#4F3585]"
            ></input>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="bio" className="text-[1.5rem]">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              onChange={handleChange}
              value={userData.bio}
              className="bg-transparent border-2 border-[#A87EFF] rounded-[4px] text-[1.2rem] p-[10px] focus:outline-none focus:outline-2 focus:outline-[#4F3585]"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-fit self-end px-[60px] py-[10px] bg-[#65DAFF] rounded-[6px] text-black font-medium"
          >
            Save
          </button>
        </form>
      </div>
      <div className={`${isEditProfile ? 'hidden' : ''}`}>
        <h3 className="text-[2rem] font-medium">Choose Your Close Friends</h3>
        <div className="flex flex-col items-center mt-[2rem]">
          <div className="flex justify-center">
            <form onSubmit={handleSearch} className="flex justify-center">
              <input
                onChange={handleChangeSearchBar}
                className="w-[60%] sm:w-full bg-transparent border-[3px] border-[#A87EFF] py-[11px] px-[23px] text-[1.2rem] rounded-l-[4px] focus:outline-none focus:outline-2 focus:outline-[#4F3585]"
                placeholder="Search..."
              ></input>
              <button
                type="submit"
                className="text-[#281D40] text-[1.2rem] font-medium py-[11px] sm:px-[36px] px-[14px] border-[3px] border-[#A87EFF] bg-[#A87EFF] rounded-r-[4px]"
              >
                Search
              </button>
            </form>
          </div>
          <button
            onClick={handleSubmitCloseFriend}
            className="w-fit self-end px-[60px] py-[10px] mx-auto bg-[#65DAFF] rounded-[6px] text-black font-medium my-[2rem]"
          >
            Save
          </button>
          <div className="flex flex-col gap-[20px]">
            {allUser
              ?.filter((val: any) => {
                if (val.googleId === user?.googleId) {
                } else if (!searching) {
                  return val
                } else if (
                  val.username
                    .split(' ')
                    .join('')
                    .toLowerCase()
                    .includes(searching.split(' ').join('').toLowerCase())
                ) {
                  return val
                }
              })
              ?.map((data: any) => (
                <div key={data.id} className="flex items-center gap-[20px]">
                  <input
                    type="checkbox"
                    id={data.googleId}
                    name={data.googleId}
                    value={data.googleId}
                    onChange={() => handleChangeCheckBox(data.googleId)}
                    checked={userCloseFriends[data.googleId]}
                    className="!cursor-pointer w-[20px] h-[20px] rounded-[6px]"
                  />
                  <label
                    className="!cursor-pointer text-[1.5rem] font-medium"
                    htmlFor={data.googleId}
                  >
                    {data.username}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
