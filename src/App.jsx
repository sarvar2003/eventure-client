import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import PasswordReset from './auth/PasswordReset';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/Privacy';
import ThankYou from './pages/ThankYou';
import TermsOfService from './pages/Terms';
import Profile from './pages/Profile';
import CreateEvent from './pages/CreateEvent';
import VerifyEmail from './auth/VerifyEmail';
import EventControlPage from './pages/EventContolPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfService />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/me" element={<Profile />} /> 
        <Route path="/me/event/:id" element={<EventControlPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
