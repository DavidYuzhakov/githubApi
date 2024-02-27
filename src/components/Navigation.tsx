import { Link } from "react-router-dom";

export function Navigation () {
  return (
    <nav className="w-full flex justify-between items-center bg-cyan-600 h-[50px] px-5 shadow-sm text-white">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <Link to={'/'} className="mr-5">Home</Link>
        <Link to={'/favorites'}>Favorites</Link>
      </span>
    </nav>
  )
}