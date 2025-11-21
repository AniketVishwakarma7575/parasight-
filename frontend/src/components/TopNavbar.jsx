import React from "react";
import "./TopNavbar.css";

// Yaha apna image ka exact path daalna (example: profile.png)
import img from '../assets/img/OIP.webp'

export default function TopNavbar() {
  return (
    <div className="navbar-top d-flex justify-content-end align-items-center px-3">

      {/* Profile Image */}
      <img
        src={img}
        alt="Profile"
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: "15px",
          border: "2px solid #e0e0e0"
        }}
      />

      {/* Settings Icon */}
      <i className="bi bi-gear-fill fs-4 text-secondary"></i>
    </div>
  );
}
