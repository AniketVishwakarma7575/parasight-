import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { Link, useLocation } from "react-router-dom";
import api from "../../api/axiosConfig";

// Format date → YYYY-MM-DD
const fmt = (d) => new Date(d).toISOString().slice(0, 10);

export default function MarkAttendance() {
  const location = useLocation();
  const initialDate = new URLSearchParams(location.search).get("date");

  const [date, setDate] = useState(initialDate || fmt(new Date()));
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

const loadStudents = async () => {
    try {
        const res = await api.get(`/students?date=${date}`);
        setStudents(res.data.students || []);
        setAttendance(res.data.attendance || {});
    } catch (err) {
        console.error("Error fetching students:", err);
    }
};



  // Fetch attendance for selected date
  const loadAttendance = async (selectedDate) => {
    try {
      const res = await api.get(`/attendance/${selectedDate}`);
      setAttendance(res.data.records || {});
    } catch (err) {
      console.error("Error loading attendance:", err);
      setAttendance({});
    }
  };

  // Initial load
  useEffect(() => {
    const fetchData = async () => {
      await loadStudents();
      await loadAttendance(date);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Reload attendance when date changes
  useEffect(() => {
    if (!loading && date) {
      loadAttendance(date);
    }
  }, [date, loading]);

  // Toggle present/absent for single student
  const toggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  // Save attendance to backend
  const saveAttendance = async () => {
    try {
      await api.post("/attendance", { date, attendance });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error(
        "Error saving attendance:",
        err.response?.data?.message || err.message
      );
      alert(err.response?.data?.message || "Error saving attendance");
    }
  };

  // Mark all present
  const markAllPresent = () => {
    const next = {};
    students.forEach((s) => (next[s._id] = "present"));
    setAttendance(next);
  };

  // Mark all absent
  const markAllAbsent = () => {
    const next = {};
    students.forEach((s) => (next[s._id] = "absent"));
    setAttendance(next);
  };

  if (loading) return <p className="p-3">Loading...</p>;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Mark Attendance</h4>
            <Link to="/reports" className="btn btn-outline-secondary btn-sm">
              Go to Reports
            </Link>
          </div>

          <div className="card mt-3 p-3 shadow-sm">
            <div className="mb-3 d-flex gap-2 flex-wrap align-items-center">
              <label className="mb-0 fw-bold">Select Date</label>
              <input
                type="date"
                className="form-control w-auto"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                className="btn btn-outline-success btn-sm"
                onClick={markAllPresent}
              >
                Mark All Present
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={markAllAbsent}
              >
                Mark All Absent
              </button>
              <button className="btn btn-primary btn-sm" onClick={saveAttendance}>
                Save
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Roll</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No students found.
                      </td>
                    </tr>
                  ) : (
                    students.map((s) => (
                      <tr key={s._id}>
                        <td>{s.roll}</td>
                        <td>{s.name}</td>
                        <td>{s.classSec}</td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className={`btn ${
                                attendance[s._id] === "present"
                                  ? "btn-success"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() =>
                                setAttendance((prev) => ({
                                  ...prev,
                                  [s._id]: "present",
                                }))
                              }
                            >
                              Present
                            </button>
                            <button
                              className={`btn ${
                                attendance[s._id] === "absent"
                                  ? "btn-danger"
                                  : "btn-outline-secondary"
                              }`}
                              onClick={() =>
                                setAttendance((prev) => ({
                                  ...prev,
                                  [s._id]: "absent",
                                }))
                              }
                            >
                              Absent
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => toggle(s._id)}
                            >
                              <i className="bi bi-arrow-repeat"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
