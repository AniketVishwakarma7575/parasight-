import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
// import { LuSchool } from "react-icons/lu";


export default function Sidebar(){
  return (
    <div className="sidebar p-0">
      <div className="p-3 text-center fs-5 fw-bold bg-dark text-white">
        {/* <LuSchool /> */}

        CampusConnect
        </div>
      <ul className="nav flex-column">
        <li className="nav-item"><NavLink to="/" className={({isActive})=>isActive?'nav-link active-sidebar':'nav-link text-white-50'}>Dashboard</NavLink></li>
        <li className="nav-item"><NavLink to="/students" className={({isActive})=>isActive?'nav-link active-sidebar':'nav-link text-white-50'}>Students</NavLink></li>
        <li className="nav-item"><NavLink to="/teachers" className={({isActive})=>isActive?'nav-link active-sidebar':'nav-link text-white-50'}>Teachers</NavLink></li>
        <li className="nav-item"><NavLink to="/attendance" className={({isActive})=>isActive?'nav-link active-sidebar':'nav-link text-white-50'}>Mark Attendance</NavLink></li>
        <li className="nav-item"><NavLink to="/reports" className={({isActive})=>isActive?'nav-link active-sidebar':'nav-link text-white-50'}>Reports</NavLink></li>
      </ul>
    </div>
  )
}
