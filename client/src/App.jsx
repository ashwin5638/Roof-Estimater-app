import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EstimatorProvider } from "./context/EstimatorContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Estimator from "./pages/Estimator";
import EstimateResult from "./pages/EstimateResult";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/estimate"
          element={
            <EstimatorProvider>
              <Estimator />
            </EstimatorProvider>
          }
        />
        <Route
          path="/estimate/result"
          element={
            <EstimatorProvider>
              <EstimateResult />
            </EstimatorProvider>
          }
        />
        <Route
          path="/admin/login"
          element={
            <AuthProvider>
              <AdminLogin />
            </AuthProvider>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthProvider>
              <AdminDashboard />
            </AuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
