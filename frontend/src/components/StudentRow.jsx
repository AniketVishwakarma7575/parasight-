import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRow({ student, onDelete }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{student.roll}</td>
      <td>{student.name}</td>
      <td>{student.classSec}</td>
      <td>{student.email}</td>
      <td>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => navigate(`/students/edit/${student._id}`)} // _id is required
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(student._id)} // _id is required
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
