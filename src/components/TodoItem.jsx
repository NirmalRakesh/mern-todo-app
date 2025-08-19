export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
return (
<div style={{
display: 'flex', alignItems: 'center', gap: 12,
padding: 10, border: '1px solid #eee', borderRadius: 10
}}>
<input
type="checkbox"
checked={todo.completed}
onChange={() => onToggle(todo)}
/>
<span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
{todo.title}
</span>
<button onClick={() => {
const next = prompt('Edit title', todo.title);
if (next !== null) onEdit(todo, next);
}}>Edit</button>
<button onClick={() => onDelete(todo)}>Delete</button>
</div>
);
}