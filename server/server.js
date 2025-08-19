import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import todosRouter from './routes/todos.js';


const app = express();


app.use(cors({ origin: ['http://localhost:5173'], credentials: false }));
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
res.json({ status: 'ok', service: 'todo-api' });
});


app.use('/api/todos', todosRouter);


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


mongoose
.connect(MONGODB_URI)
.then(() => {
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
})
.catch((err) => {
console.error('MongoDB connection error:', err.message);
process.exit(1);
});