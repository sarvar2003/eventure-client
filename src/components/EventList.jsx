import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios'; 
import EventCard from './EventCard';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const EventList = ({ filters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();

        if (filters.title) queryParams.append('title', filters.title);
        if (filters.topic) queryParams.append('topics', filters.topic);
        if (filters.language) queryParams.append('language', filters.language);
        
        const response = await axiosInstance.get(`/events/?${queryParams.toString()}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  return (
    <Container>
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-center my-5">No events found.</p>
      ) : (
        <Row className="g-4">
          {events && events.length > 0 ? (
            events.map(event => (
            <Col key={event.id} sm={12} md={6} lg={4}>
              <EventCard event={event} />
            </Col>
          ))
          ) : (
            <p className="text-center my-5">No events found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default EventList;
