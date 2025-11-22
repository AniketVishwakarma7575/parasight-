import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
import AttendanceCircle from "../attendance/AttendanceCircle";


const fmt = (d) => new Date(d).toISOString().slice(0, 10);

export default function AttendanceReport() {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(fmt(new Date()));
  const [loading, setLoading] = useState(true);


  const loadStudents = async () => {
    try {
      const res = await api.get("/students");
      const data = res.data.students ? res.data.students : res.data;
      setStudents(data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }
  };


  const loadAttendanceForDate = async (currentDate) => {
    try {
      const res = await api.get(`/attendance/${currentDate}`);
      setRecords(res.data.records || {});
    } catch (err) {
      console.error("Error loading attendance:", err);
      setRecords({});
    }
  };


  useEffect(() => {
    const fetchAll = async () => {
      await loadStudents();
      await loadAttendanceForDate(date);
      setLoading(false);
    };
    fetchAll();
  }, []);


  useEffect(() => {
    if (!loading && date) {
      loadAttendanceForDate(date);
    }
  }, [date, loading]);

  if (loading) return <p style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem'
  }} className="p-3">Loading...</p>;

  const dayRec = records || {};

  const present = students.filter((s) => dayRec[s._id] === "present");

  const absent = students.filter(
    (s) => dayRec[s._id] === "absent" || !dayRec[s._id]
  );

  const late = students.filter((s) => dayRec[s._id] === "late");

  const totalStudents = students.length;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />

        <div className="content container-fluid py-4">
          <div
            className="d-flex justify-content-between align-items-center flex-wrap mb-4 p-3 rounded shadow-sm"
            style={{
              background: "linear-gradient(135deg, #4cacf583, #3b8edbca)",
              border: "1px solid #dfe8ff"
            }}
          >
            <h4 className="fw-bold text-white mb-2 mb-md-0">
              Attendance Report: {new Date(date).toDateString()}
            </h4>

            <div className="mt-2 mt-md-0 d-flex gap-2">
              <Link className="btn btn-primary btn-sm shadow-sm" to="/attendance">
                Mark Today
              </Link>
              <Link className="btn btn-outline-secondary text-black btn-sm shadow-sm" to="/students">
                Manage Students
              </Link>
            </div>
          </div>



          <div className="card shadow-lg border-0 mb-4 attendance-report-card">
            <div className="card-body p-4">


              <div className="d-flex flex-wrap gap-3 align-items-center mb-4 pb-2 border-bottom">
                <label className="fw-semibold mb-0 text-muted">Select Date:</label>

                <input
                  type="date"
                  className="form-control w-auto custom-date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <Link
                  to={`/attendance?date=${date}`}
                  className="btn btn-sm btn-outline-info"
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit Attendance
                </Link>
              </div>
              <div className="row g-4 align-items-center">

                {/* for the ..... */}
                <div className="col-lg-3 col-md-5 d-flex justify-content-center">
                  <AttendanceCircle
                    present={present.length}
                    absent={absent.length}
                  />
                </div>


                <div className="col-lg-5 col-md-7">
                  <h5 className="mb-3 text-primary">Daily Summary</h5>
                  <div className="d-grid gap-2">
                    <div className="summary-metric">
                      <span className="summary-dot bg-success"></span>
                      <span className="summary-label">Present: </span>
                      <span className="summary-value text-success fw-bold"> {present.length}</span>
                    </div>
                    <div className="summary-metric">
                      <span className="summary-dot bg-danger"></span>
                      <span className="summary-label">Absent: </span>
                      <span className="summary-value text-danger fw-bold"> {absent.length}</span>
                    </div>
                    <div className="summary-metric">
                      <span className="summary-dot bg-warning"></span>
                      <span className="summary-label">Late:</span>
                      <span className="summary-value text-warning fw-bold"> {late.length}</span>
                    </div>
                    <div className="summary-metric border-top pt-2 mt-2">
                      <span className="summary-label fw-bold">Total Students: </span>
                      <span className="summary-value text-dark fw-bold">{totalStudents}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Placeholder for additional chart/info - Responsive */}
                {/* <div className="col-lg-4 d-none d-lg-block">
                    <div className="p-3 bg-light rounded shadow-sm text-center">
                        <h6 className="text-muted mb-0">Weekly Trend Placeholder</h6>
                        <p className="small text-muted mb-0">Graph or other KPI can go here.</p>
                        
                    </div>
                </div> */}

              </div>
            </div>
          </div>

          <div className="row g-4">


            <div className="col-md-6">
              <div className="card shadow-sm border-success border-start-5 h-100 list-card">
                <div className="card-header bg-success text-white py-2">
                  <h6 className="mb-0"> Present Students ({present.length})</h6>
                </div>
                <ul className="list-group list-group-flush">
                  {present.length > 0 ? (
                    present.map((p) => (
                      <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center list-item-present">
                        <div>
                          <strong className="text-dark">{p.roll}</strong> — {p.name}
                        </div>
                        <span className="badge bg-success-light text-success small">{p.classSec}</span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center text-muted py-3">
                      <i className="bi bi-info-circle me-1"></i> No one present for the selected date.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Absent List Card */}
            <div className="col-md-6">
              <div className="card shadow-sm border-danger border-start-5 h-100 list-card">
                <div className="card-header bg-danger text-white py-2">
                  <h6 className="mb-0"> Absent Students ({absent.length})</h6>
                </div>
                <ul className="list-group list-group-flush">
                  {absent.length > 0 ? (
                    absent.map((p) => (
                      <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center list-item-absent">
                        <div>
                          <strong className="text-dark">{p.roll}</strong> — {p.name}
                        </div>
                        <span className="badge bg-danger-light text-danger small">{p.classSec}</span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-center text-muted py-3">
                      <i className="bi bi-info-circle me-1"></i> Everyone is accounted for (Present/Late).
                    </li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}