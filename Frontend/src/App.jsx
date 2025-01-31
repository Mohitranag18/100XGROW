import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/useAuth.jsx';

import Login from './routes/login';
import Register from './routes/register';

import PrivateRoute from './components/private_route.jsx';

import UserProfile from './routes/userProfile.jsx';
import Home from './routes/home.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
            path="/user/:username"
          />
          <Route element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            path="/"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
