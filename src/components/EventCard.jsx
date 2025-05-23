import React, { use } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';



const EventCard = ({ event }) => {
  const [eventTopics, seteventTopics] = useState([]);

  useEffect(() => {
    for (let i = 0; i < event.topics.length; i++) {
      const topicId = event.topics[i];
      axiosInstance.get(`/events/topics/${topicId}/`)
        .then((res) => {
          seteventTopics((prevTopics) => [...prevTopics, res.data]);
        })
        .catch((err) => {
          console.error('Failed to fetch topic:', err);
        });
    }
  }, []);


  return (
    <Link to={`/events/${event.id}`} className="text-decoration-none">
      <Card style={{ width: '18rem' }} className="shadow h-100">
        <Card.Img
          variant="top"
          src={event.thumbnail}
          alt={event.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              📍 {event.location} <br />
              📅 {event.formatted_date.day}/{event.formatted_date.month}/{event.formatted_date.year}
            </Card.Text>

            {/* Topics Badges */}
            <div className="mb-2">
              {eventTopics.map((topic, index) => (
                <Badge bg="secondary" className="me-1" key={index}>
                  {topic.name}
                </Badge>
              ))}
            </div>
          </div>

          <Button variant="primary" >View Details</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EventCard;
