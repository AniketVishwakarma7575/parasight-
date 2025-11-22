import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";

// Format date → YYYY-MM-DD
const fmt = (d) => new Date(d).toISOString().slice(0, 10);

export default function MarkAttendance() {
  const [date, setDate] = useState(fmt(new Date()));
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  // Load all students
  const loadStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
    }
  };

  // Load attendance for date
  const loadAttendance = async (selectedDate) => {
    try {
      const res = await api.get(`/attendance/${selectedDate}`);
      setAttendance(res.data.records || {});
    } catch (err) {
      console.error("Error loading attendance:", err);
      setAttendance({});
    }
  };

  // Initial Load
  useEffect(() => {
    const fetchData = async () => {
      await loadStudents();
      await loadAttendance(date);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Reload on date change
  useEffect(() => {
    if (!loading && date) {
      loadAttendance(date);
    }
  }, [date, loading]);

  // Toggle present/absent
  const toggle = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === "present" ? "absent" : "present",
    }));
  };

  // Save Attendance
  const saveAttendance = async () => {
    try {
      await api.post("/attendance", { date, attendance });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert(err.response?.data?.message || "Error saving attendance");
    }
  };

  // Mark All Present
  const markAllPresent = () => {
    const next = {};
    students.forEach((s) => (next[s._id] = "present"));
    setAttendance(next);
  };

  // Mark All Absent
  const markAllAbsent = () => {
    const next = {};
    students.forEach((s) => (next[s._id] = "absent"));
    setAttendance(next);
  };

  if (loading) return <p className="p-3" style={{
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
height: '100vh',
fontSize: '1.5rem'
}}>Loading...</p>;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />

        <div className="content container-fluid">

          {/* Heading */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-2">Mark Attendance</h4>
            <Link to="/reports" className="btn btn-outline-secondary btn-sm">
              Go to Reports
            </Link>
          </div>

          {/* MAIN CARD */}
          <div className="card shadow-sm p-3">

            {/* Top Controls */}
            <div className="row g-3">

              {/* Date Input */}
              <div className="col-12 col-sm-6 col-md-3">
                <label className="fw-bold small">Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="col-12 col-sm-6 col-md-9">
                <div className="d-flex flex-wrap gap-2 w-100">

                  <button
                    className="btn btn-outline-success btn-sm flex-grow-1"
                    style={{marginTop:26}}
                    onClick={markAllPresent}
                  >
                    Mark All Present
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm flex-grow-1"
                    style={{marginTop:26}}
                    onClick={markAllAbsent}
                  >
                    Mark All Absent
                  </button>

                  <button
                    className="btn btn-primary btn-sm flex-grow-1"
                    style={{marginTop:26}}
                    onClick={saveAttendance}
                  >
                    Save
                  </button>

                </div>
              </div>
            </div>

            {/* TABLE + MOBILE CARDS */}
            <div className="mt-4">

              {/* DESKTOP TABLE */}
              <div className="table-responsive d-none d-md-block">
                <table className="table table-hover align-middle">
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
                        <td colSpan="4" className="text-center">No students found.</td>
                      </tr>
                    ) : (
                      students.map((s) => (
                        <tr key={s._id}>
                          <td>{s.roll}</td>
                          <td>{s.name}</td>
                          <td>{s.classSec}</td>

                          <td>
                            <div className="btn-group btn-group-sm">

                              {/* Present Btn */}
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

                              {/* Absent Btn */}
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

                              {/* Toggle Btn */}
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

              {/* MOBILE CARD VIEW */}
              <div className="d-md-none">
                {students.map((s) => (
                  <div
                    key={s._id}
                    className="border rounded p-3 mb-3 shadow-sm bg-white"
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-1">{s.name}</h6>
                        <small>Roll: {s.roll}</small><br />
                        <small>Class: {s.classSec}</small>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span
                          className={`badge p-2 ${
                            attendance[s._id] === "present"
                              ? "bg-success"
                              : attendance[s._id] === "absent"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {attendance[s._id] || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex gap-2 mt-3">

                      <button
                        className={`btn btn-sm w-100 ${
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
                        className={`btn btn-sm w-100 ${
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
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => toggle(s._id)}
                      >
                        <i className="bi bi-arrow-repeat"></i>
                      </button>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
