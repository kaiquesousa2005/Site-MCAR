import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Principal from './pages/principal';
import CarShowcase from './pages/carros';
import Header from './components/header';
import Footer from './footer/footer';
import FinancingSimulation from './pages/simulacao';
import AboutUs from './pages/sobre';
import PrivacyPolicy from './footer/politica';
import TermsOfUse from './footer/termos';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="Header">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/sobre" element={<AboutUs />} />
          <Route path="/carros" element={<CarShowcase />} />
          <Route path="/simulação" element={<FinancingSimulation />} />
          <Route path="/termos-uso" element={<TermsOfUse />} />
          <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <div className="Footer">
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;