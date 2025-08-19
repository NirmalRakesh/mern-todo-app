import { Router } from 'express';
import Todo from '../models/Todo.js';


const router = Router();


// GET /api/todos -> list
router.get('/', async (req, res) => {
try {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
} catch (err) {
res.status(500).json({ message: 'Failed to fetch todos' });
}
});


// POST /api/todos -> create
router.post('/', async (req, res) => {
try {
const { title } = req.body;
if (!title || !title.trim()) return res.status(400).json({ message: 'Title is required' });
const todo = await Todo.create({ title: title.trim() });
res.status(201).json(todo);
} catch (err) {
res.status(500).json({ message: 'Failed to create todo' });
}
});


// PATCH /api/todos/:id -> update fields (title/completed)
router.patch('/:id', async (req, res) => {
try {
const { id } = req.params;
const { title, completed } = req.body;
const update = {};
if (title !== undefined) update.title = String(title).trim();
if (completed !== undefined) update.completed = !!completed;


const todo = await Todo.findByIdAndUpdate(id, update, { new: true });
if (!todo) return res.status(404).json({ message: 'Todo not found' });
res.json(todo);
} catch (err) {
res.status(500).json({ message: 'Failed to update todo' });
}
});


// DELETE /api/todos/:id -> delete
router.delete('/:id', async (req, res) => {
try {
const { id } = req.params;
const todo = await Todo.findByIdAndDelete(id);
if (!todo) return res.status(404).json({ message: 'Todo not found' });
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: 'Failed to delete todo' });
}
});


export default router;