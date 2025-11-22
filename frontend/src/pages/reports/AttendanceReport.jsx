import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { Link } from "react-router-dom";
import api from '../../api/axiosConfig'; 

// Format date → YYYY-MM-DD
const fmt = (d) => new Date(d).toISOString().slice(0, 10);

export default function AttendanceReport() {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(fmt(new Date()));
  const [loading, setLoading] = useState(true);

  // 📌 Load Students (from backend)
  const loadStudents = async () => {
    try {
      const res = await api.get("/students"); 
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // 📌 Load attendance for selected date
  const loadAttendanceForDate = async (currentDate) => {
    try {
      const res = await api.get(`/attendance/${currentDate}`); 
      setRecords(res.data.records || {});
    } catch (err) {
      console.error("Error loading attendance:", err);
      setRecords({}); 
    }
  };

  // Initial load
  useEffect(() => {
    const fetchAll = async () => {
      await loadStudents();
      await loadAttendanceForDate(date);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Reload attendance when date changes
  useEffect(() => {
    if (!loading && date) {
      loadAttendanceForDate(date);
    }
  }, [date, loading]);

  if (loading) return <p className="p-3">Loading...</p>;

  const dayRec = records || {};

  // Present
  const present = students.filter((s) => dayRec[s._id] === "present");

  // Absent = either marked absent OR missing entry
  const absent = students.filter(
    (s) => dayRec[s._id] === "absent" || !dayRec[s._id]
  );

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />

        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Attendance Reports</h4>

            <div>
              <Link
                className="btn btn-primary btn-sm me-2"
                to="/attendance"
              >
                Mark Today
              </Link>
              <Link
                className="btn btn-outline-secondary btn-sm"
                to="/students"
              >
                Manage Students
              </Link>
            </div>
          </div>

          <div className="card card-custom mt-3 p-3">
            <div className="d-flex gap-2 align-items-center mb-3 flex-wrap">
              <label className="mb-0 fw-semibold">Select Date</label>

              <input
                type="date"
                className="form-control w-auto"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <Link
                to={`/attendance?date=${date}`} 
                className="btn btn-sm btn-outline-primary"
              >
                Edit Attendance
              </Link>
            </div>

            <div className="row">
              {/* Present List */}
              <div className="col-md-6 mb-3">
                <h6>
                  Present ({present.length})
                </h6>

                <ul className="list-group">
                  {present.length > 0 ? (
                    present.map((p) => (
                      <li key={p._id} className="list-group-item">
                        {p.roll} — {p.name}{" "}
                        <small className="text-muted">
                          ({p.classSec})
                        </small>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No one present
                    </li>
                  )}
                </ul>
              </div>

              {/* Absent List */}
              <div className="col-md-6 mb-3">
                <h6>
                  Absent ({absent.length})
                </h6>

                <ul className="list-group">
                  {absent.length > 0 ? (
                    absent.map((p) => (
                      <li key={p._id} className="list-group-item">
                        {p.roll} — {p.name}{" "}
                        <small className="text-muted">
                          ({p.classSec})
                        </small>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No one absent
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