import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import StudentRow from '../../components/StudentRow';
import '../../components/Sidebar.css';
import './StudentManagement.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LS_KEY = 'attendance_students_v1';

const getInitialStudents = () => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
    // default sample data
    const sample = [
        { id: uuidv4(), roll: '1', name: 'Aniket', classSec: '41.002', email: 'aniket@example.com' },
        { id: uuidv4(), roll: '2', name: 'Rahul', classSec: '20.086', email: 'rahul@example.com' },
        { id: uuidv4(), roll: '3', name: 'Sonia', classSec: '20.002', email: 'sonia@example.com' },
        { id: uuidv4(), roll: '4', name: 'Priya', classSec: '20.003', email: 'priya@example.com' },
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(sample));
    return sample;
};

export default function StudentManagementDashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState(getInitialStudents);
    const [query, setQuery] = useState('');
    const [classFilter, setClassFilter] = useState('');

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(students));
    }, [students]);

    const handleDelete = (id) => {
        if (!confirm('Delete this student?')) return;
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    const filtered = students.filter(s => {
        return (s.name.toLowerCase().includes(query.toLowerCase()) || s.roll.includes(query)) &&
            (classFilter ? s.classSec === classFilter : true);
    });

    const uniqueClasses = Array.from(new Set(students.map(s => s.classSec)));

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-area">
                <TopNavbar />
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Student Management</h4>
                        <div>
                            <button className="btn btn-primary me-2" onClick={() => navigate('/students/add')}>+ Add New Student</button>
                            <button className="btn btn-outline-secondary" onClick={() => { localStorage.removeItem(LS_KEY); window.location.reload(); }}>Reset Sample</button>
                        </div>
                    </div>

                    <div className="card card-custom mt-3 p-3">
                        <div className="row g-2 align-items-center mb-3">
                            <div className="col-md-3"><input className="form-control" placeholder="Search by name or roll" value={query} onChange={e => setQuery(e.target.value)} /></div>
                            <div className="col-md-3">
                                <select className="form-select" value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                                    <option value="">All Class/Section</option>
                                    {uniqueClasses.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-light">
                                    <tr><th>Roll No.</th><th>Name</th><th>Class/Section</th><th>Email</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-4">No students found</td></tr>
                                    ) : filtered.map(s => <StudentRow key={s.id} student={s} onDelete={handleDelete} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
