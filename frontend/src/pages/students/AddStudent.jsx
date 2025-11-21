import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const LS_KEY = 'attendance_students_v1';

export default function AddStudent(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ roll:'', name:'', classSec:'', email:'' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const newStudent = { ...form, id: uuidv4() };
    arr.push(newStudent);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
    navigate('/students');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <h4>Add Student</h4>
          <div className="card card-custom p-3 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-3"><input required className="form-control" placeholder="Roll No" value={form.roll} onChange={e=>setForm({...form, roll:e.target.value})} /></div>
                <div className="col-md-3"><input required className="form-control" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
                <div className="col-md-3"><input required className="form-control" placeholder="Class/Section" value={form.classSec} onChange={e=>setForm({...form, classSec:e.target.value})} /></div>
                <div className="col-md-3"><input className="form-control" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
              </div>

              <div className="mt-3">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <button className="btn btn-outline-secondary" type="button" onClick={()=>navigate('/students')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
