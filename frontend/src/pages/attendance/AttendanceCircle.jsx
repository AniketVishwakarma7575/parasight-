import React from 'react';
import './AttendanceCircle.css'; 


const AttendanceCircle = ({ present = 0, absent = 0 }) => {
    const total = present + absent;

    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    
    const offset = circumference - (percentage / 100) * circumference;

    
    let circleColor = '#10B981'; 
    if (percentage < 75) {
        circleColor = '#FBBF24'; 
    }
    if (percentage < 50) {
        circleColor = '#EF4444'; 
    }

    return (
        <div className="attendance-circle-container">
            <svg
                className="attendance-circle-svg"
                width="120"
                height="120"
                viewBox="0 0 120 120"
            >
               
                <circle
                    className="circle-background"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth="10"
                />

                
                <circle
                    className="circle-progress"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeWidth="10"
                    stroke={circleColor} 
                    strokeDasharray={circumference}
                    strokeDashoffset={offset} 
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)" 
                />
            </svg>

            <div className="percentage-text">
                <span className="value" style={{ color: circleColor }}>{percentage}%</span>
                <span className="label">Total Attendance</span>
            </div>
        </div>
    );
};

export default AttendanceCircle;