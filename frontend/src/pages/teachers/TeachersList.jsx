import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopNavbar from '../../components/TopNavbar';

const sample = [
  { id:1, name:'Mrs. Sharma', subject:'Math' },
  { id:2, name:'Mr. Gupta', subject:'Science' }
];

export default function TeachersList(){
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <TopNavbar />
        <div className="content">
          <h4>Teachers</h4>
          <div className="card card-custom mt-3 p-3">
            <table className="table">
              <thead><tr><th>Name</th><th>Subject</th></tr></thead>
              <tbody>
                {sample.map(t => <tr key={t.id}><td>{t.name}</td><td>{t.subject}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
