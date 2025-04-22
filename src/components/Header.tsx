import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center bg-gradient-to-b from-green-100 to-green-200 dark:from-slate-800 dark:to-slate-700 shadow-md">
      <h1 className="text-xl font-extrabold text-green-900 dark:text-blue-100 drop-shadow-sm">
        Weathered Emotions
      </h1>
      <ModeToggle />
    </div>
  )
}

export default Header
