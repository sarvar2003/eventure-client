import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date_time: '',
    number_of_seats: 0,
    language: 'en',
    topics: [],
    thumbnail: null,
  });
  
  const [thumbnail, setThumbnail] = useState(null);

  const [topicsList, setTopicsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/events/topics/')
      .then(res => setTopicsList(res.data))
      .catch(err => console.error('Failed to fetch topics:', err));
  }, []);
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name === 'topics') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, topics: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  

const handleSubmit = (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('location', formData.location);
  formDataToSend.append('date_time', formData.date_time);
  formDataToSend.append('number_of_seats', formData.number_of_seats);
  formDataToSend.append('language', formData.language);
  formDataToSend.append('thumbnail', thumbnail, thumbnail.name);
  formData.topics.forEach(topic => {
    formDataToSend.append('topics', topic); 
  });
  axiosInstance.post('/events/create/', formDataToSend ,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': 'CSRF_TOKEN',
      } 
    })
    .then(res => {
      console.log('Event created successfully:', res.data);
      navigate('/');
    })
    .catch(err => {
      console.error('Error creating event:', err.response?.data || err.message);
    });
};




  return (
    <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <Container className="my-5 col-6">
        <h2>Create Event</h2>
        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Row>
                <Form.Group className="mb-3 fw-bold ">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
            <Col md={6}>
                <Form.Group className="mb-3 fw-bold">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="date_time" value={formData.date_time} onChange={handleChange} required />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                    name="location"
                    value={formData.location}
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
                <Form.Control type="number" name="number_of_seats" value={formData.number_of_seats} onChange={handleChange} required />
                </Form.Group>
            </Col>
                <Form.Group className="mb-3 fw-bold">
                <Form.Label>Language</Form.Label>
                <Form.Select name="language" value={formData.language} onChange={handleChange}>
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
                        checked={formData.topics.includes(topic.id)}
                        onChange={(e) => {
                        const topicId = parseInt(e.target.value);
                        setFormData((prev) => ({
                            ...prev,
                            topics: e.target.checked
                            ? [...prev.topics, topicId]
                            : prev.topics.filter((id) => id !== topicId),
                        }));
                        }}
                    />
                    ))}
                </div>
                </Form.Group>


                <Form.Group className="mb-3 fw-bold">
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control type="file" name="thumbnail" onChange={(e) => setThumbnail(e.target.files[0])} />
                </Form.Group>

                <Form.Group className="mb-3 fw-bold">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} value={formData.description} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className='mx-2' style={{ maxWidth: '200px' }}>Create Event</Button>
            </Row>
        </Form>

        </Container>
    </div>
  );
};

export default CreateEvent;
