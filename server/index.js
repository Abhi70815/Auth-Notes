import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;
const JWT_SECRET = 'your_jwt_secret_key'; // In production, use environment variables

app.use(cors());
app.use(bodyParser.json());

// Simple JSON file-based storage for users and notes
const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { users: [], notes: [] };
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const data = readData();
  const existingUser = data.users.find(u => u.username === username);
  if (existingUser) return res.status(409).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), username, password: hashedPassword, role: 'User' };
  data.users.push(newUser);
  writeData(data);

  res.status(201).json({ message: 'User created successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const data = readData();
  const user = data.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Get notes for logged-in user
app.get('/notes', authenticateToken, (req, res) => {
  const data = readData();
  const userNotes = data.notes.filter(note => note.userId === req.user.id);
  res.json(userNotes);
});

// Create a new note
app.post('/notes', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const data = readData();
  const newNote = {
    id: Date.now().toString(),
    userId: req.user.id,
    title,
    content: content || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.notes.push(newNote);
  writeData(data);
  res.status(201).json(newNote);
});

// Update a note
app.put('/notes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const data = readData();
  const noteIndex = data.notes.findIndex(note => note.id === id && note.userId === req.user.id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });

  if (title) data.notes[noteIndex].title = title;
  if (content !== undefined) data.notes[noteIndex].content = content;
  data.notes[noteIndex].updatedAt = new Date().toISOString();

  writeData(data);
  res.json(data.notes[noteIndex]);
});

// Delete a note
app.delete('/notes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  const data = readData();
  const noteIndex = data.notes.findIndex(note => note.id === id && note.userId === req.user.id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });

  data.notes.splice(noteIndex, 1);
  writeData(data);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
