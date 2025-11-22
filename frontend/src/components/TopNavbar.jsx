import React from "react";
import "./TopNavbar.css";

import img from '../assets/img/OIP.webp';

export default function TopNavbar() {
  return (
    <div className="navbar-top d-flex justify-content-end align-items-center px-3">

      {/* Profile Image with Clickable Link */}
      <a 
        href="https://aniket-vishwakarma-bc5534.netlify.app" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <img
          src={img}
          alt="Profile"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "15px",
            border: "2px solid #e0e0e0",
            cursor: "pointer"
          }}
        />
      </a>

    </div>
  );
}
