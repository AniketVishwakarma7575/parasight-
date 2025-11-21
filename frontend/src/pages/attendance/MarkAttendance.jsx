import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import { Link } from 'react-router-dom';

const STUDENT_KEY = 'attendance_students_v1';
const ATTEND_KEY = 'attendance_records_v1';

// Utility to format date as YYYY-MM-DD
const fmt = (d) => new Date(d).toISOString().slice(0,10);

export default function MarkAttendance(){
  const [date, setDate] = useState(fmt(new Date()));
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // id -> 'present'|'absent'

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem(STUDENT_KEY) || '[]');
    setStudents(s);
  },[]);

  useEffect(()=> {
    // load attendance for date
    const raw = JSON.parse(localStorage.getItem(ATTEND_KEY) || '{}');
    const day = raw[date] || {};
    setAttendance(day);
  }, [date]);

  const toggle = (id) => {
    setAttendance(prev => {
      const next = {...prev, [id]: prev[id]==='present' ? 'absent' : 'present'};
      return next;
    });
  };

  const save = () => {
    const raw = JSON.parse(localStorage.getItem(ATTEND_KEY) || '{}');
    raw[date] = attendance;
    localStorage.setItem(ATTEND_KEY, JSON.stringify(raw));
    alert('Saved');
  };

  const markAllPresent = () => {
    const next = {};
    students.forEach(s => next[s.id] = 'present');
    setAttendance(next);
  };

  const markAllAbsent = () => {
    const next = {};
    students.forEach(s => next[s.id] = 'absent');
    setAttendance(next);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Mark Attendance</h4>
            <div>
              <Link to="/reports" className="btn btn-outline-secondary btn-sm">Go to Reports</Link>
            </div>
          </div>

          <div className="card card-custom mt-3 p-3">
            <div className="mb-3 d-flex gap-2 align-items-center">
              <label className="mb-0">Select Date</label>
              <input type="date" className="form-control w-auto" value={date} onChange={e=>setDate(e.target.value)} />
              <button className="btn btn-sm btn-outline-success" onClick={markAllPresent}>Mark All Present</button>
              <button className="btn btn-sm btn-outline-danger" onClick={markAllAbsent}>Mark All Absent</button>
              <button className="btn btn-primary btn-sm" onClick={save}>Save</button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light"><tr><th>Roll</th><th>Name</th><th>Class</th><th>Status</th></tr></thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No students found. Add students first.</td></tr>
                  ) : students.map(s => (
                    <tr key={s.id}>
                      <td>{s.roll}</td>
                      <td>{s.name}</td>
                      <td>{s.classSec}</td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button className={`btn ${attendance[s.id]==='present' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={()=>setAttendance(prev=>({...prev,[s.id]:'present'}))}>Present</button>
                          <button className={`btn ${attendance[s.id]==='absent' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={()=>setAttendance(prev=>({...prev,[s.id]:'absent'}))}>Absent</button>
                          <button className="btn btn-outline-secondary" onClick={()=>toggle(s.id)}><i className="bi bi-arrow-repeat"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
