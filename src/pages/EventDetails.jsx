import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seatCount, setSeatCount] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/events/event/${id}/`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error('Error fetching event details:', err));
  }, [id]);

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  const formatDateTime = (formatted_date) => {
    const { day, month, year, weekday, time } = formatted_date;
    const [hour, minute] = time.split(':');
    const dateObj = new Date();
    dateObj.setHours(hour, minute);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(dateObj);
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    return `${weekday}, ${day} ${monthName} ${year} at ${formattedTime}`;
  };

  const handleReservation = async () => {
    try {
      const email = Cookies.get('email');
      if (!email) {
        alert('Please, login to reserve a ticket.');
        return;
      }

      const response = await axiosInstance.post('/reservations/create/', {
        event: event.id,
        number_of_tickets: seatCount,
      });

      console.log('Reservation successful:', response.data);
      alert('Reservation made!');
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('There was an error with reservation.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4 text-primary fw-bold">{event.title}</h1>

        <Row>
          <div className="image-container">
            <Image src={event.thumbnail} alt={event.title} className="event-thumbnail"fluid rounded />
          </div>

          <Col md={6}>
            <div className="mt-4 bg-light p-4 rounded shadow-sm">
              <h4 className="mb-3">Event Information</h4>
              <p><strong>Hosted by:</strong> {event.host_name}</p>
              <p><strong>Date & Time:</strong> {formatDateTime(event.formatted_date)}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Seats Available:</strong> {event.number_of_seats}</p>
              <p className="text-muted"><small><Badge bg="secondary">Event ID: {event.id}</Badge></small></p>
            </div>
          </Col>
          <Col md={6}>
          
          <div className="mt-4 bg-white border p-4 rounded shadow-sm">
              <h5>Select Tickets</h5>
              <div className="d-flex align-items-center my-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                >
                  -
                </button>
                <span className="mx-3 fs-5">{seatCount}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSeatCount(seatCount + 1)}
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary w-100" onClick={handleReservation}>
                Reserve {seatCount > 1 ? `${seatCount} Seats` : '1 Seat'}
              </button>
              {message && <p className="text-danger mt-2 text-center">{message}</p>}
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="p-4 bg-white border rounded shadow-sm">
              <h4 className="mb-3">About this event</h4>
              <p style={{ whiteSpace: 'pre-wrap' }}>{event.description}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventDetails;
