import { useState } from 'react';


export default function TodoForm({ onAdd }) {
const [title, setTitle] = useState('');


const handleSubmit = (e) => {
e.preventDefault();
const t = title.trim();
if (!t) return;
onAdd(t);
setTitle('');
};


return (
<form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
<input
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Add a todo..."
style={{ flex: 1, padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
/>
<button type="submit" style={{ padding: '10px 16px', borderRadius: 8 }}>
Add
</button>
</form>
);
}