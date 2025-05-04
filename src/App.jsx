import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import EventList from './pages/EventList';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import PasswordReset from './auth/PasswordReset';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/events" element={<EventList />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
