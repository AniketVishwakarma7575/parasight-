import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentManagementDashboard from "./pages/students/StudentManagementDashboard";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import TeachersList from "./pages/teachers/TeachersList";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceReport from "./pages/reports/AttendanceReport";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentManagementDashboard />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />

        <Route path="/teachers" element={<TeachersList />} />

        <Route path="/attendance" element={<MarkAttendance />} />
        <Route path="/reports" element={<AttendanceReport />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
