import { useState } from 'react'

export default function NotesList({ notes, addNote, updateNote, deleteNote }) {
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const startEdit = (note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditContent('')
  }

  const saveEdit = () => {
    updateNote(editingId, editTitle, editContent)
    cancelEdit()
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (newTitle.trim() === '') return
    addNote(newTitle, newContent)
    setNewTitle('')
    setNewContent('')
  }

  return (
    <div>
      <form onSubmit={handleAddNote} className="mb-6">
        <input
          type="text"
          placeholder="New note title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          placeholder="New note content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
          rows={3}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Note
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) =>
          editingId === note.id ? (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border p-2 rounded w-full mb-2 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={saveEdit}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold mb-2">{note.title}</h3>
              <p className="mb-4 whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => startEdit(note)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
