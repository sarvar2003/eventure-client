import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios'; 
import EventCard from './EventCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/events/')  // Adjust to match your backend endpoint
      .then(res => {

        setEvents(res.data);  // Assumes backend returns a list of event objects
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {events.map(event => (
            <Col key={event.id} sm={12} md={6} lg={4}>
              <EventCard
                title={event.title}
                date={event.formatted_date}
                location={event.location}
                image={event.thumbnail || '../assets/images/default.jpeg'}
                onClick={() => console.log(`Event ${event.id} clicked`)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EventList;
