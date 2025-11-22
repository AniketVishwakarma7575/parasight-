import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { updateStudent, fetchStudents } from "../../api/studentApi";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetchStudents();
        const student = res.data.find(s => s._id === id);
        if (!student) throw new Error();
        setForm(student);
      } catch {
        alert("Student not found");
        navigate("/students");
      }
    };
    fetchStudent();
  }, [id, navigate]);

  if (!form) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStudent(id, form);
      navigate("/students", { state: { updatedStudent: res.data } });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <h4>Edit Student</h4>
          <div className="card card-custom p-3 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <input required className="form-control" placeholder="Roll No" value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <input required className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <input required className="form-control" placeholder="Class/Section" value={form.classSec} onChange={e => setForm({ ...form, classSec: e.target.value })} />
                </div>
                <div className="col-md-3">
                  <input className="form-control" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="mt-3">
                <button className="btn btn-primary me-2" type="submit">Update</button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/students")}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
