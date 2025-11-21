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
                    <h3>Dashboard</h3>
                    <div className="row g-3 mt-3">
                        <div className="col-md-4">
                            <div className="card card-custom p-3">
                                <h6>Students</h6>
                                <p className="mb-0">Manage students & attendance</p>
                                <Link to="/students" className="btn btn-sm btn-primary mt-3">Manage</Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card card-custom p-3">
                                <h6>Attendance</h6>
                                <p className="mb-0">Mark daily attendance</p>
                                <Link to="/attendance" className="btn btn-sm btn-primary mt-3">Mark</Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card card-custom p-3">
                                <h6>Reports</h6>
                                <p className="mb-0">View date-wise reports</p>
                                <Link to="/reports" className="btn btn-sm btn-primary mt-3">View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
