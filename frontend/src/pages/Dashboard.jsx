import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="app-container">
            <Sidebar />

            <div className="main-area">
                <TopNavbar />

                <div className="content">

                    <h3 className="fw-bold mb-3">Dashboard</h3>

                    <div className="row g-3 mt-2">

                        {/* Students Card */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                                <h6 className="fw-bold">Students</h6>
                                <p className="text-muted mb-2">Manage students & attendance</p>
                                <Link to="/students" className="btn btn-sm btn-primary mt-auto">
                                    Manage
                                </Link>
                            </div>
                        </div>

                        {/* Attendance Card */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                                <h6 className="fw-bold">Attendance</h6>
                                <p className="text-muted mb-2">Mark daily attendance</p>
                                <Link to="/attendance" className="btn btn-sm btn-primary mt-auto">
                                    Mark
                                </Link>
                            </div>
                        </div>

                        {/* Reports Card */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                                <h6 className="fw-bold">Reports</h6>
                                <p className="text-muted mb-2">View date-wise reports</p>
                                <Link to="/reports" className="btn btn-sm btn-primary mt-auto">
                                    View
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
