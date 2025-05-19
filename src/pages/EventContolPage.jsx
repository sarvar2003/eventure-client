import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Navbar from '../components/Navbar';
import { Container, Image } from 'react-bootstrap';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';


const EventControlPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [topicsList, setTopicsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
 
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      location: '',
      date_time: '',
      number_of_seats: 0,
      language: 'en',
      topic_ids: [],
      thumbnail: null,
    });
  const [thumbnail, setThumbnail] = useState(null);


  useEffect(() => {
    axiosInstance.get(`/events/event/${id}/update/`)
      .then(res => {
        setEventData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => {
        setError('Failed to load event details.');
        setLoading(false);
      });
      
      axiosInstance.get('/events/topics/')
      .then(res => setTopicsList(res.data));

  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name === 'topic_ids') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, topic_ids: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axiosInstance.delete(`/events/event/${id}/update/`)
        .then(() => navigate('/me'))
        .catch(() => alert('Failed to delete event.'));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('date_time', formData.date_time);
    formDataToSend.append('number_of_seats', formData.number_of_seats);
    formDataToSend.append('language', formData.language);
    formDataToSend.append('thumbnail', thumbnail, thumbnail.name);
    axiosInstance.post('/events/create/', formDataToSend ,{
        topic_ids: formData.topic_ids,
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': 'CSRF_TOKEN',
        } 
    })
    .then(res => {
      console.log('Event updated successfully:', res.data);
      navigate('/me');
    })
    .catch(err => {
      console.error('Error updating event:', err.response?.data || err.message);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Container className="mt-5 mb-5 col-6">
            <h2>Manage Event</h2>
            <Form onSubmit={handleUpdate} encType='multipart/form-data'>
                <Row>
                    <Form.Group className="mb-3 fw-bold ">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title"  value={eventData.title} onChange={handleChange} required />
                    </Form.Group>
                <Col md={6}>
                    <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Date & Time: {new Date(eventData.date_time).toLocaleString().slice(0, 17)}</Form.Label>
                    <Form.Control type="datetime-local" name="date_time" onChange={handleChange} required />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3 fw-bold">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                        name="location"
                        value={eventData.location}
                        onChange={handleChange}
                        disabled={formData.location === "Online"}
                        required
                        />
                        {formData.location === "Online" && (
                        <small className="text-info">
                            Please provide details about how attendees will join (Zoom/Meet link etc.) in the event description.
                        </small>
                        )}
                    </Form.Group>
                    
                    <Form.Group className="mb-2 fw-bold">
                        <Form.Check 
                        type="checkbox"
                        label="Online Event"
                        checked={formData.location === "Online"}
                        onChange={(e) => {
                            const isOnline = e.target.checked;
                            setFormData(prev => ({
                                ...prev,
                                location: isOnline ? "Online" : ""
                            }));
                        }}
                        />
                    </Form.Group>
                </Col>
    
                </Row>
                <Row>
                <Col md={4}>
                    <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control type="number" name="number_of_seats" value={eventData.number_of_seats} onChange={handleChange} required />
                    </Form.Group>
                </Col>
                    <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Language</Form.Label>
                    <Form.Select name="language" value={eventData.language} onChange={handleChange}>
                        <option value="uz">Uzbek</option>
                        <option value="en">English</option>
                        <option value="pl">Polish</option>
                        <option value="ru">Russian</option>
                    </Form.Select>
                    </Form.Group>
    
                    <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Topics</Form.Label>
                    <div className="d-flex flex-wrap">
                        {topicsList.map((topic) => (
                        <Form.Check
                            key={topic.id}
                            type="checkbox"
                            label={topic.name}
                            value={topic.id}
                            className="text-capitalize me-3 mb-2"
                            checked={formData.topic_ids.includes(topic.id)}
                            onChange={(e) => {
                            const topicId = parseInt(e.target.value);
                            setFormData((prev) => ({
                                ...prev,
                                topic_ids: e.target.checked
                                ? [...prev.topic_ids, topicId]
                                : prev.topic_ids.filter((id) => id !== topicId),
                            }));
                            }}
                        />
                        ))}
                    </div>
                    </Form.Group>
    
    
                    <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Thumbnail</Form.Label>
                    <div className="image-container mb-4">
                        <Image src={eventData.thumbnail} alt={eventData.title} className="event-thumbnail" rounded/>
                    </div>
                    <Form.Control type="file" name="thumbnail" onChange={(e) => setThumbnail(e.target.files[0])} />
                    </Form.Group>
    
                    <Form.Group className="mb-3 fw-bold">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows={3} value={eventData.description} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Guests</Form.Label>
                    <ul className="list-group">
                        {eventData.guests && eventData.guests.length > 0 ? (
                            eventData.guests.map(guest => (
                            <li key={guest.id} className="list-group-item">{guest.email}</li>
                            ))
                        ) : (
                            <li className="list-group-item text-muted">No guests yet</li>
                        )}
                    </ul>
                    </Form.Group>
                    <Button type="submit" className='mx-2' style={{ maxWidth: '200px' }}>Update Event</Button>
                </Row>
            </Form>
        </Container>
    </div>
  );
};

export default EventControlPage;
