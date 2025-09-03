import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PackageDetails from "./pages/Packagedetails"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/DashboardLayout" element={<DashboardLayout />} />
        <Route path="/packages/details/:id" element={<PackageDetails />} />


        <Route         
          path="/DashboardLayout"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
