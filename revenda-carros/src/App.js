import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Principal from "./pages/sobre";
import CarShowcase from "./pages/Home";
import Header from "./components/header";
import Footer from "./footer/footer";
import FinancingSimulation from "./pages/simulacao";
import PrivacyPolicy from "./footer/politica";
import TermsOfUse from "./footer/termos";
import Dashboard from "./pages/DashBoard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import "./styles/global.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<CarShowcase />} />
              <Route path="/sobre" element={<Principal />} />
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
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
