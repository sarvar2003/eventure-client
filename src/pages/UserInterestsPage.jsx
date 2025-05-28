import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axios'
import Cookies from 'js-cookie'
import { Form, Button, Container } from 'react-bootstrap'

const UserInterestsPage = () => {
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const [userInterestedTopics, setUserInterestedTopics] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/events/topics/')
        .then(res => {
            setTopics(res.data);
            setLoading(false);
        })
        .catch(err => console.error('Failed to fetch topics:', err));
  }, []);

    const handleSubmit = (e) => {
        Cookies.set('user_interested_topics', userInterestedTopics, { expires: 365 });
        navigate('/');
    };

    const handleChange = (e) => {
        const topicId = parseInt(e.target.value);
        if (e.target.checked) {
        setUserInterestedTopics(prev => [...prev, topicId]);
        } else {
        setUserInterestedTopics(prev => prev.filter(id => id !== topicId));
        }
  };

    const handleSkip = () => {
        Cookies.set('user_interested_topics', [], { expires: 365 });    
        navigate('/');
    };

    if (loading) return <p>Loading...</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
        <Container className="my-5 col-6">
            <h2>Select your interests</h2>
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Topics</Form.Label>
                    <div className="d-flex flex-wrap">
                        {topics.map(topic => (
                        <Form.Check
                            key={topic.id}
                            type="checkbox"
                            label={topic.name}
                            value={topic.id}
                            checked={userInterestedTopics.includes(topic.id)}
                            onChange={handleChange}
                            className="mb-2 text-capitalize"
                        />
                        ))}
                    </div>
                </Form.Group>
                <Button type="submit" className='mx-2' style={{ maxWidth: '200px' }}>Save Interests</Button>
                <Button variant="secondary" onClick={handleSkip} style={{ maxWidth: '200px' }}>Skip</Button>
            </Form>
        </Container>
    </div>
  )
}

export default UserInterestsPage