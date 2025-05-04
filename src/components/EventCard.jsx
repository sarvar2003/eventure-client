import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EventCard = ({ title, date, location, image, onClick }) => {
  return (
    <Card style={{ width: '18rem' }} className="shadow">
      <Card.Img variant="top" src={image} alt={title} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          📍 {location} <br />
          📅 {date.day}/{date.month}/{date.year}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
