import { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const favorites = useAppSelector(state => state.github.favorites)
  const { addFavorite, removeFavorite } = useActions()
  const isFavorite = favorites.includes(repo.html_url)
  const [isFav, setIsFav] = useState(isFavorite)

  function addToFavorite (e: React.MouseEvent<HTMLButtonElement>) {
    setIsFav(true)
    e.preventDefault()
    if (!isFavorite) {
      addFavorite(repo.html_url)
    }
  }

  function removeFromFavorite (e: React.MouseEvent<HTMLButtonElement>) {
    setIsFav(false)
    e.preventDefault()    
    removeFavorite(repo.html_url)
  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-sm hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold mb-2">{repo.name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        <div className="flex items-center mt-5">
          {!isFav && <button
            className="py-1 mr-2 px-4 bg-yellow-400 rounded hover:shadow-sm transition-all"
            type="button"
            onClick={addToFavorite}
            >
            Add
          </button>}
          {isFav && <button
            className='py-1 px-4 bg-red-400 text-white rounded hover:shadow-sm transition-all'
            type='button'
            onClick={removeFromFavorite}
          >
            Remove
          </button>}
        </div>
      </a>
    </div>
  )
}

export default RepoCard
