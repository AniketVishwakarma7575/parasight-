import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentManagementDashboard from "./pages/students/StudentManagementDashboard";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import TeachersList from "./pages/teachers/TeachersList";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceReport from "./pages/reports/AttendanceReport";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
