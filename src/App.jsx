import { useEffect, useState } from 'react';
import { Todos } from './api';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await Todos.list();
      setTodos(data);
    } catch (e) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { load(); }, []);


  const addTodo = async (title) => {
    try {
      const newTodo = await Todos.create(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      alert('Failed to add');
    }
  };




  const toggleTodo = async (todo) => {
    try {
      const updated = await Todos.update(todo._id, { completed: !todo.completed });
      setTodos((prev) => prev.map(t => t._id === todo._id ? updated : t));
    } catch {
      alert('Failed to toggle');
    }
  };



  const editTodo = async (todo, nextTitle) => {
    const t = String(nextTitle || '').trim();
    if (!t) return;
    try {
      const updated = await Todos.update(todo._id, { title: t });
      setTodos((prev) => prev.map(x => x._id === todo._id ? updated : x));
    } catch {
      alert('Failed to edit');
    }
  };





  const deleteTodo = async (todo) => {
    if (!confirm('Delete this todo?')) return;
    try {
      await Todos.remove(todo._id);
      setTodos((prev) => prev.filter(t => t._id !== todo._id));
    } catch {
      alert('Failed to delete');
    }
  };





  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
      <h1>📝 MERN Todo</h1>
      <TodoForm onAdd={addTodo} />


      {loading && <p>Loading…</p>}
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}


      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        {todos.map(t => (
          <TodoItem key={t._id} todo={t} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
        ))}
        {!loading && todos.length === 0 && <p>No todos yet. Add one!</p>}
      </div>
    </div>
  );




}