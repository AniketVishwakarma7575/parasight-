import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import TopNavbar from "../../components/TopNavbar";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    roll: "",
    name: "",
    classSec: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create student
      const res = await api.post("/students", form);
      const newStudent = res.data.student;

      // Navigate back to dashboard and pass new student
      navigate("/students", { state: { newStudent } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <h4>Add Student</h4>
          <div className="card p-3 mt-3">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-3">
                  <input
                    required
                    className="form-control"
                    placeholder="Roll No"
                    value={form.roll}
                    onChange={(e) => setForm({ ...form, roll: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    required
                    className="form-control"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    required
                    className="form-control"
                    placeholder="Class/Section"
                    value={form.classSec}
                    onChange={(e) => setForm({ ...form, classSec: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary me-2" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => navigate("/students")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
