import api from './axiosConfig';

export const fetchStudents = () => api.get('/students');
export const createStudent = (payload) => api.post('/students', payload);
export const updateStudent = (id, payload) => api.put(`/students/${id}`, payload);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
