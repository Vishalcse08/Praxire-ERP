import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';

// Placeholder Pages (Will build these in next steps)
const EmployeeDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-slate-400 mb-2">My Salary</h3>
        <p className="text-2xl font-bold text-white">₹ 45,000</p>
      </div>
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-slate-400 mb-2">Tasks Pending</h3>
        <p className="text-2xl font-bold text-white">12</p>
      </div>
    </div>
  </div>
);

const FounderDashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-white">Founder Insight</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-slate-400 mb-2">Total Revenue</h3>
        <p className="text-2xl font-bold text-blue-500">₹ 12,45,000</p>
      </div>
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
        <h3 className="text-slate-400 mb-2">Monthly Spend</h3>
        <p className="text-2xl font-bold text-red-500">₹ 4,30,000</p>
      </div>
    </div>
  </div>
);

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-slate-400 animate-pulse">Establishing connection...</p>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;

  return <DashboardLayout>{children}</DashboardLayout>;
};

const HomeRedirect = () => {
  const { user } = useAuth();
  if (user.role === 'founder') return <Navigate to="/founder" />;
  return <Navigate to="/employee" />;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="bg-slate-950 min-h-screen font-sans">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <HomeRedirect />
            </ProtectedRoute>
          } />

          <Route path="/employee/*" element={
            <ProtectedRoute allowedRole="employee">
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
              </Routes>
            </ProtectedRoute>
          } />

          <Route path="/founder/*" element={
            <ProtectedRoute allowedRole="founder">
              <Routes>
                <Route path="/" element={<FounderDashboard />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
