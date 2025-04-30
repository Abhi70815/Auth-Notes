export default function Sidebar({ darkMode, setDarkMode, onLogout }) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Notes</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={onLogout}
          className="mt-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
