import { useAppSelector } from "../hooks/redux"

export default function Favorites () {
  const favorites = useAppSelector(state => state.github.favorites)

  if (favorites.length === 0) {
    return <p className="text-center">No items.</p>
  }
  return (
    <div className="flex flex-col pt-10 items-center mx-auto h-screen w-screen">
      <ul>
        {favorites.map(fav => (
          <li key={fav} className="p-3 rounded bg-gray-300 border border-blue-300 mb-2">
            <a className="hover:underline" target="_blank" href={fav}>{ fav }</a>
          </li>
        ))}
      </ul>
    </div>
  )
}