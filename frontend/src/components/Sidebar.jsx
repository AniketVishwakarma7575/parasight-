import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <>
            {/* Desktop Sidebar */}
            <nav id="sidebar" className="sidebar p-0 d-none d-md-block">

                <div className="sidebar-header p-3 text-center fs-5 fw-bold bg-dark text-white">
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    CampusConnect
                </div>

                <ul className="nav flex-column sidebar-nav-links">

                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? 'nav-link active-sidebar' : 'nav-link text-white-50'
                        }>
                            <i className="bi bi-grid-fill me-3"></i> Dashboard
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/students" className={({ isActive }) =>
                            isActive ? 'nav-link active-sidebar' : 'nav-link text-white-50'
                        }>
                            <i className="bi bi-people-fill me-3"></i> Students
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/teachers" className={({ isActive }) =>
                            isActive ? 'nav-link active-sidebar' : 'nav-link text-white-50'
                        }>
                            <i className="bi bi-person-video3 me-3"></i> Teachers
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/attendance" className={({ isActive }) =>
                            isActive ? 'nav-link active-sidebar' : 'nav-link text-white-50'
                        }>
                            <i className="bi bi-check2-square me-3"></i> Attendance
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/reports" className={({ isActive }) =>
                            isActive ? 'nav-link active-sidebar' : 'nav-link text-white-50'
                        }>
                            <i className="bi bi-bar-chart-line-fill me-3"></i> Reports
                        </NavLink>
                    </li>

                </ul>
            </nav>

            {/* Mobile Bottom Navbar */}
            <div className="mobile-bottom-nav d-md-none">
                <NavLink to="/" className="nav-item-mobile">
                    <i className="bi bi-grid-fill"></i>
                    <span>Home</span>
                </NavLink>

                <NavLink to="/students" className="nav-item-mobile">
                    <i className="bi bi-people-fill"></i>
                    <span>Students</span>
                </NavLink>

                <NavLink to="/attendance" className="nav-item-mobile">
                    <i className="bi bi-check2-square"></i>
                    <span>Attendance</span>
                </NavLink>

                <NavLink to="/reports" className="nav-item-mobile">
                    <i className="bi bi-bar-chart-line-fill"></i>
                    <span>Reports</span>
                </NavLink>

                <NavLink to="/teachers" className="nav-item-mobile">
                    <i className="bi bi-person-video3"></i>
                    <span>Teachers</span>
                </NavLink>
            </div>
        </>
    );
}
