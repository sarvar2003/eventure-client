import React, { use, useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import DeleteAccountModal from '../components/DeleteAccountModal';
import Footer from '../components/Footer';

const Profile = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch user profile
  useEffect(() => {
    axiosInstance.get('/users/me/')
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile.");
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
        try {
            const email = Cookies.get('email');
            if (!email) {
                alert('Please, login to view your profile!.');
                return;
            }
            const response = await axiosInstance.get(`/reservations/user-reservations/${email}/`);
            setRegisteredEvents(response.data);
        } catch (error) {   
            console.error('Error fetching registered events:', error);
            alert('There was an error fetching your registered events.');
        }
    };
    fetchRegisteredEvents();
    }, []);
  
  useEffect(() => {
    const fetchOrganizedEvents = async () => {
        try {
            const email = Cookies.get('email');
            if (!email) {
                // alert('Please, login to view your organized events.');
                return;
            }
            const response = await axiosInstance.get(`/events/user-events/${email}/`);
            setOrganizedEvents(response.data);
        } catch (error) {   
            console.error('Error fetching organized events:', error);
            alert('There was an error fetching your organized events.');
        }
    };
    fetchOrganizedEvents();
    }, []);
  
  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axiosInstance.post(`/users/me/update/${userData.email}/`, userData);
      setUserData(res.data);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error("Update error:", error);
      setMessage('Failed to update profile.');
    }
  };

  const handleCancel = async (reservationId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await axiosInstance.delete(`/reservations/reservation/${reservationId}/`);
        alert("Reservation canceled.");
        window.location.reload();
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        alert("Failed to cancel reservation.");
      }
    }
  };

  const handelDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {  
      try {
        await axiosInstance.delete(`/events/event/${eventId}/update/`);
        alert("Event deleted.");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('first_name');
    Cookies.remove('last_name');
    window.location.href = '/login';
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-sm">
              <h2 className="text-center text-primary mb-4">My Profile</h2>
              {message && <p className="text-center text-info">{message}</p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    disabled
                    readOnly
                  />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                  <Button type="button" className="btn btn-secondary ms-2" onClick={handleLogout}>  
                    Logout
                  </Button>
                  <Button type="button" className="btn btn-danger ms-2" onClick={() => setShowDeleteModal(true)}>
                    Delete Account
                  </Button>
                   <DeleteAccountModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    userEmail={Cookies.get('email')}
                  />
                </div>
              </Form>
            </Card>
          </Col>
          <Col md={8}>
          <h3 className="mt-5">Registered Events</h3>
            {registeredEvents.length > 0 ? (
            registeredEvents.map(reservation => (
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/events/${reservation.event}`} className="event-card p-2 border rounded mb-2 d-flex justify-content-between align-items-center" key={reservation.id}>
                  <div>
                    <h5>{reservation.event_title}</h5>
                    <p className="mb-0">{reservation.event_location} – {new Date(reservation.event_date_time).toLocaleString().slice(0, 17)}</p>
                  </div>
                  
                  <button
                    className="btn text-danger btn-sm ms-3 border-danger"
                    onClick={() => handleCancel(reservation.id)}>
                    Cancel Reservation
                  </button>
                </Link>
            ))
            ) : <p>No registered events.</p>}
          </Col>
          <Col md={8}>
            <h3 className="mt-5">Organized Events</h3>
            {organizedEvents.length > 0 ? (
              organizedEvents.map(event => (
                <div className="event-card p-2 border rounded mb-2 d-flex justify-content-between align-items-center" key={event.id}>
                  <Link to={`/me/event/${event.id}`} className="text-decoration-none text-dark flex-grow-1">
                    <h5 className="mb-1">{event.title}</h5>
                    <p className="mb-0">
                      {event.location} – {new Date(event.date_time).toLocaleString().slice(0, 17)}
                    </p>
                  </Link>

                  <button className="btn text-danger btn-sm ms-3 border-danger" onClick={() => handelDeleteEvent(event.id)}>
                    Delete Event
                  </button>
                </div>
              ))
            ) : (
              <p>No registered events.</p>
            )}

          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
