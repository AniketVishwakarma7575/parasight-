import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';

const sample = [
  { id: 1, name: 'Mrs. Sharma', subject: 'Math' },
  { id: 2, name: 'Mr. Gupta', subject: 'Science' }
];

export default function TeachersList() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-area">
        <TopNavbar />

        <div className="content">

          {/* Page Header */}
          <div
            className="p-3 mb-4 rounded shadow-sm d-flex justify-content-between align-items-center flex-wrap"
            style={{
              background: "linear-gradient(135deg, #e3f2fd, #f8fbff)",
              border: "1px solid #d7e9ff"
            }}
          >
            <h4 className="fw-bold text-primary mb-2 mb-md-0">Teachers List</h4>
            <button style={{
                background: "linear-gradient(135deg, #4c6ef583, #3b8edbca)",
                backdropFilter: "blur(6px)",
              }} className="btn  btn-sm shadow-sm">+ Add Teacher</button>
          </div>

          {/* Table Card */}
          <div
            className="card shadow-sm border-0 rounded-4 p-3"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)"
            }}
          >
            <h5 className="fw-bold text-secondary mb-3">All Teachers</h5>

            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fw-semibold">Name</th>
                  <th className="fw-semibold">Subject</th>
                </tr>
              </thead>

              <tbody>
                {sample.map((teach) => (
                  <tr key={teach.id} style={{ cursor: "pointer" }}>
                    <td>{teach.name}</td>
                    <td>{teach.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
