import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentRow({ student, onDelete }){
  return (
    <tr>
      <td>{student.roll}</td>
      <td>{student.name}</td>
      <td>{student.classSec}</td>
      <td>{student.email}</td>
      <td>
        <Link to={`/students/edit/${student.id}`} className="btn btn-outline-warning btn-sm btn-icon me-1">
          <i className="bi bi-pencil"></i>
        </Link>
        <button className="btn btn-outline-danger btn-sm btn-icon" onClick={() => onDelete(student.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  )
}
