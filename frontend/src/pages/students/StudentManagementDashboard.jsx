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

  useEffect(() => { loadStudents(); }, []);

  // Update dashboard if new/updated student added
  useEffect(() => {
    if (location.state) {
      const { newStudent, updatedStudent } = location.state;

      if (newStudent) {
        setStudents(prev => prev.some(s => s._id === newStudent._id) ? prev : [...prev, newStudent]);
      }

      if (updatedStudent) {
        setStudents(prev => prev.map(s => s._id === updatedStudent._id ? updatedStudent : s));
      }

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;
    try {
      await deleteStudent(id);
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const filtered = students.filter(
    s => (s.name.toLowerCase().includes(query.toLowerCase()) || s.roll.includes(query)) &&
         (classFilter ? s.classSec === classFilter : true)
  );

  const uniqueClasses = Array.from(new Set(students.map(s => s.classSec)));

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Student Management</h4>
            <button className="btn btn-primary" onClick={() => navigate("/students/add")}>
              + Add New Student
            </button>
          </div>

          <div className="card card-custom mt-3 p-3">
            <div className="row g-2 mb-3">
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Search by name or roll"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
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
                    <tr><td colSpan="5" className="text-center">No students found</td></tr>
                  ) : (
                    filtered.map(s => <StudentRow key={s._id} student={s} onDelete={handleDelete} />)
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
