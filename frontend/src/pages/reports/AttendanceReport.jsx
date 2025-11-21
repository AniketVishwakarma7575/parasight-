import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';
import { Link } from 'react-router-dom';

const STUDENT_KEY = 'attendance_students_v1';
const ATTEND_KEY = 'attendance_records_v1';

const fmt = d => new Date(d).toISOString().slice(0,10);

export default function AttendanceReport(){
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(fmt(new Date()));

  useEffect(()=>{
    setStudents(JSON.parse(localStorage.getItem(STUDENT_KEY) || '[]'));
    setRecords(JSON.parse(localStorage.getItem(ATTEND_KEY) || '{}'));
  },[]);

  useEffect(()=>{
    setRecords(JSON.parse(localStorage.getItem(ATTEND_KEY) || '{}'));
  },[date]);

  const dayRec = records[date] || {};

  const present = students.filter(s => dayRec[s.id] === 'present');
  const absent  = students.filter(s => dayRec[s.id] === 'absent' || !dayRec[s.id]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Attendance Reports</h4>
            <div>
              <Link className="btn btn-primary btn-sm me-2" to="/attendance">Mark Today</Link>
              <Link className="btn btn-outline-secondary btn-sm" to="/students">Manage Students</Link>
            </div>
          </div>

          <div className="card card-custom mt-3 p-3">
            <div className="d-flex gap-2 align-items-center mb-3">
              <label className="mb-0">Select Date</label>
              <input type="date" className="form-control w-auto" value={date} onChange={e=>setDate(e.target.value)} />
              <Link to={`/attendance?date=${date}`} className="btn btn-sm btn-outline-primary">Edit Attendance</Link>
            </div>

            <div className="row">
              <div className="col-md-6">
                <h6>Present ({present.length})</h6>
                <ul className="list-group">
                  {present.map(p => <li key={p.id} className="list-group-item">{p.roll} — {p.name} <small className="text-muted">({p.classSec})</small></li>)}
                  {present.length===0 && <li className="list-group-item text-muted">No one present</li>}
                </ul>
              </div>
              <div className="col-md-6">
                <h6>Absent ({absent.length})</h6>
                <ul className="list-group">
                  {absent.map(p => <li key={p.id} className="list-group-item">{p.roll} — {p.name} <small className="text-muted">({p.classSec})</small></li>)}
                  {absent.length===0 && <li className="list-group-item text-muted">No one absent</li>}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
