import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import StudentRow from "../../components/StudentRow";
import { fetchStudents, deleteStudent } from "../../api/studentApi";

export default function StudentManagementDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const loadStudents = async () => {
    try {
      const res = await fetchStudents();
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);


  useEffect(() => {
    const state = location.state;
    if (!state || (!state.newStudent && !state.updatedStudent)) return;

    if (state.newStudent) {
      setStudents((prev) =>
        prev.some((s) => s._id === state.newStudent._id)
          ? prev
          : [...prev, state.newStudent]
      );
    }

    if (state.updatedStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s._id === state.updatedStudent._id ? state.updatedStudent : s
        )
      );
    }

    setTimeout(() => {
      navigate(location.pathname, { replace: true, state: null });
    }, 0);
  }, [location.state]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const filtered = students.filter(
    (s) =>
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.roll.includes(query)) &&
      (classFilter ? s.classSec === classFilter : true)
  );

  const uniqueClasses = Array.from(new Set(students.map((s) => s.classSec)));

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">

          {/* Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Student Management</h4>
            <button
              style={{
                background: "linear-gradient(135deg, #4c6ef583, #3b8edbca)",
                backdropFilter: "blur(6px)",
              }}
              className="btn btn-sm mt-2 mt-md-0"
              onClick={() => navigate("/students/add")}
            >
              + Add New Student
            </button>
          </div>

          {/* Card Container */}
          <div className="card shadow-sm p-3">

            {/* Search Row */}
            <div className="row g-2 mb-3">
              <div className="col-12 col-sm-6 col-md-3">
                <input
                  className="form-control"
                  placeholder="Search by name or roll"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <select
                  className="form-select"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="">All Class/Section</option>
                  {uniqueClasses.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* DESKTOP TABLE */}
            <div className="table-responsive d-none d-md-block">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Class/Section</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <StudentRow key={s._id} student={s} onDelete={handleDelete} />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="d-md-none">
              {filtered.length === 0 ? (
                <p className="text-center mt-2">No students found</p>
              ) : (
                filtered.map((s) => (
                  <div
                    key={s._id}
                    className="border rounded p-3 mb-2 shadow-sm bg-light"
                  >
                    <h6 className="mb-1 fw-bold">{s.name}</h6>
                    <small>Roll: {s.roll}</small> <br />
                    <small>Class/Section: {s.classSec}</small> <br />
                    <small>Email: {s.email}</small>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-primary w-50"
                        onClick={() => navigate(`/students/edit/${s._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger w-50"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
