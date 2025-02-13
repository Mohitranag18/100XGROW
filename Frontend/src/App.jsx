import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/useAuth.jsx';

import Login from './routes/login';
import Register from './routes/register';

import PrivateRoute from './components/private_route.jsx';

import UserProfile from './routes/userProfile.jsx';
import Home from './routes/home.jsx';
import Header from './components/header.jsx';
import BuildResume from './routes/buildresume.jsx';
import RateMyResume from './routes/ratemyresume.jsx';
import MagicATS from './routes/magicATS.jsx';
import FindJob from './routes/findJob.jsx';
import Footer from './components/footer.jsx';
import Template from './templatesAll/template.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={
              // <PrivateRoute>
                <UserProfile />
              // </PrivateRoute>
            }
            path="/profile"
          />
          <Route element={
              // <PrivateRoute>
                <Home />
              // </PrivateRoute>
            }
            path="/"
          />
          <Route element={
              // <PrivateRoute>
                <BuildResume />
              // </PrivateRoute>
            }
            path="/buildresume"
          />
          <Route element={
              // <PrivateRoute>
                <RateMyResume />
              // </PrivateRoute>
            }
            path="/ratemyresume"
          />
          <Route element={
              // <PrivateRoute>
                <MagicATS />
              // </PrivateRoute>
            }
            path="/magicats"
          />
          <Route element={
              // <PrivateRoute>
                <FindJob />
              // </PrivateRoute>
            }
            path="/findjob"
          />
          <Route element={
              // <PrivateRoute>
                <Template />
              // </PrivateRoute>
            }
            path="/buildresume/:templateName"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
