import axios from 'axios';


export const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


export const Todos = {
list: () => api.get('/todos').then(r => r.data),
create: (title) => api.post('/todos', { title }).then(r => r.data),
update: (id, data) => api.patch(`/todos/${id}`, data).then(r => r.data),
remove: (id) => api.delete(`/todos/${id}`).then(r => r.data),
};