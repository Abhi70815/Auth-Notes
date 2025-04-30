import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import NotesList from './NotesList'

export default function Dashboard({ token, onLogout }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await axios.get('http://localhost:4000/notes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setNotes(response.data)
      } catch {
        setError('Failed to load notes')
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [token])

  const addNote = async (title, content) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/notes',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes((prev) => [...prev, response.data])
    } catch {
      setError('Failed to add note')
    }
  }

  const updateNote = async (id, title, content) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/notes/${id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes((prev) => prev.map((note) => (note.id === id ? response.data : note)))
    } catch {
      setError('Failed to update note')
    }
  }

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNotes((prev) => prev.filter((note) => note.id !== id))
    } catch {
      setError('Failed to delete note')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {loading ? (
            <p>Loading notes...</p>
          ) : (
            <NotesList
              notes={notes}
              addNote={addNote}
              updateNote={updateNote}
              deleteNote={deleteNote}
            />
          )}
        </main>
      </div>
    </div>
  )
}
