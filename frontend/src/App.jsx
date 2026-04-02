import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
    const { user } = useAuth();

    return (
        <>
            {user && <Navbar />}
           <Routes>
    {/* THIS IS THE KEY - root path for guests */}
    <Route path="/"
        element={!user ? <Navigate to="/landing" replace /> : <Home />}
    />

    <Route path="/landing"
        element={!user ? <Landing /> : <Navigate to="/" replace />}
    />
    <Route path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
    />
    <Route path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
    />
    <Route path="/favourites" element={
        <ProtectedRoute><Favourites /></ProtectedRoute>
    } />
    <Route path="*"
        element={!user ? <Navigate to="/landing" replace /> : <Navigate to="/" replace />}
    />
</Routes>
        </>
    );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-900 dark:bg-gray-900 transition-colors duration-300">
            <AppRoutes />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
