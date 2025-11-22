import React from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-area">
                <TopNavbar />
                <div className="content">
                    <div
                        className="p-4 mb-4 rounded-4 shadow-sm text-white"
                        style={{
                            background: "linear-gradient(135deg, #4c6ef583, #3b8edbca)",
                            backdropFilter: "blur(6px)",
                        }}
                    >
                        <h2 className="fw-bold mb-1">Dashboard</h2>
                        <p className="opacity-75 m-0">
                            Welcome to your control panel. Manage students, attendance,
                            and reports.
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4 col-sm-6">
                            <div
                                className="card border-0 rounded-4 shadow-sm p-4 h-100 hover-card"
                                style={{ transition: "0.3s" }}
                            >
                                <h5 className="fw-bold">Students</h5>
                                <p className="text-muted">Manage student details easily.</p>
                                <Link to="/students" className="btn btn-primary btn-sm mt-auto">
                                    Manage
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div
                                className="card border-0 rounded-4 shadow-sm p-4 h-100 hover-card"
                                style={{ transition: "0.3s" }}
                            >
                                <h5 className="fw-bold">Attendance</h5>
                                <p className="text-muted">Mark & update daily attendance.</p>
                                <Link to="/attendance" className="btn btn-primary btn-sm mt-auto">
                                    Mark
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div
                                className="card border-0 rounded-4 shadow-sm p-4 h-100 hover-card"
                                style={{ transition: "0.3s" }}
                            >
                                <h5 className="fw-bold">Reports</h5>
                                <p className="text-muted">View attendance records.</p>

                                <Link to="/reports" className="btn btn-primary btn-sm mt-auto">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOVER ANIMATION CSS */}
            <style>
                {`
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 10px 20px rgba(0,0,0,0.15);
          }
        `}
            </style>
        </div>
    );
}
