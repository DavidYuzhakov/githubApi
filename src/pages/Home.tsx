import { useEffect, useState } from "react"
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api"
import useDebounce from "../hooks/debounce"
import RepoCard from "../components/RepoCard"
import { SortType } from "../models/models"

export default function Home () {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [select, setSelect] = useState<SortType>('full_name')

  const debounced = useDebounce(value, 500)
  const types: SortType[] = ['full_name', "created", "pushed", "updated"]

  const {data, isLoading, isError} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  useEffect(() => {
    setOpen(debounced.length >= 3 && data?.length! > 0)
  }, [debounced, data])

  function clickHandler (user: string) {
    setUsername(user)
    setOpen(false)
    fetchRepos({ username: user, type: select })
  }

  function filterHandler (type: SortType) {
    setSelect(type)
    setOpen(false)
    fetchRepos({ username: username, type })
  }

  console.log(username)

  return (
    <div className="flex flex-col pt-10 items-center mx-auto h-screen w-screen">
      {isError && <p className="mb-2 text-center text-red-500">Something went wrong. Please try again later</p>}
      {repos?.length! > 0 && <div className="relative">      
        <button 
          type="button" 
          onClick={() => setOpen(prev => !prev)} 
          className="p-2 border text-center"
        >{ select }</button>
        {open && <ul className="absolute top-full left-0 right-0 z-10">
          {types.map(type => (
            <li 
              key={type} 
              onClick={() => filterHandler(type)} 
              className="bg-gray-200 p-2 rounded mb-2 cursor-pointer"
            >{ type }</li>
          ))}
        </ul>}
      </div>}

      <div className="relative w-[560px]">
        <input 
          className="border py-2 px-4 my-5 w-full h-[42px] outline-gray-500 outline-1" 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter username from Github..."
        />
        
        {open && <ul className="absolute top-full left-0 right-0 max-h-[200px] overflow-y-scroll shadow-lg bg-white p-2 rounded">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map((user) => (
            <li 
              key={user.id} 
              onClick={() => clickHandler(user.login)}
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
            >{ user.login }</li>
          ))}
        </ul>}

        <div className="container mx-auto">
          {areReposLoading  && <p className="text-center">Repos are Loading...</p>}
          {repos?.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
          {repos?.length === 0 && <p className="text-center">Repositories is not exist</p>}
        </div>
      </div>
    </div>
  )
}